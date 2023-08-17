import { DataGrid } from '@mui/x-data-grid';
import type { GridRenderCellParams } from '@mui/x-data-grid';
import { Button, useTheme, CircularProgress } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../../../redux/slices/favorites';
import { AppStore } from '../../../../redux/store';
import { FavoriteCheckbox } from '../FavoriteCheckbox';
import { Stock } from '../../../../models/stock';
import { Link as RouterLink } from "react-router-dom";
import { useFetch } from '../../../../hooks/useFetch/useFetch';


export interface StockTableInterface {}

const StockTable: React.FC<StockTableInterface> = () => {
  const theme = useTheme();

  const endpoint = `https://cloud.iexapis.com/stable/stock/market/list/mostactive?token=${import.meta.env.VITE_API_KEY}&listLimit=100`;
  const { data: stocks, loading } = useFetch<Stock[]>(endpoint);

  const pageSize = 12;
  const dispatch = useDispatch();
  const favorites: Stock[] = useSelector((state: AppStore) => state.favorites);

  const handleAddFavorite = (stock: Stock) => {
    dispatch(addFavorite(stock));
  };
  
  const handleRemoveFavorite = (symbol: string) => {
    dispatch(removeFavorite(symbol));
  };

  const columns = [
    {
      field: 'actions',
      sortable: false,
      headerName: '',
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <FavoriteCheckbox
          checked={Array.isArray(favorites) && favorites.some(fav => fav.symbol === params.row.symbol)}
          onChange={() => {
              if (Array.isArray(favorites) && favorites.some(fav => fav.symbol === params.row.symbol)) {
                  handleRemoveFavorite(params.row.symbol);
              } else {
                  handleAddFavorite(params.row);
              }
          }}
        />
      )
    },
    {
      field: 'symbol',
      headerName: 'Ticker',
      flex: 1,
    },
    {
      field: 'open',
      headerName: 'Open Price',
      flex: 1,
    },
    {
      field: 'close',
      headerName: 'Close Price',
      flex: 1,
    },
    {
      field: 'volume',
      headerName: 'Volume',
      flex: 1,
    },
    {
      field: 'latestTime',
      headerName: 'Date',
      flex: 1,
    },
    {
      field: 'seeMore',
      headerName: 'Details',
      sortable: false,
      width: 120,
      renderCell: (params: GridRenderCellParams) => (
        <Button
          component={RouterLink}
          to={`/stock/${params.row.symbol}`}
          variant="contained"
          color="primary"
          sx={{
              backgroundColor: 'rgba(0,0,0,0.8)', // dark background
              borderRadius: '15px',
              '&:hover': {
                backgroundColor: 'purple',
            },
          }}
        >
          See More
      </Button>
      ),
    },
  ];

  return (
    <>
     {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
          <CircularProgress sx={{ color: '#333' }} />
        </div>
      ) : (
    <DataGrid
      rows={stocks || []}
      columns={columns}
      disableColumnSelector
      disableSelectionOnClick
      autoHeight
      pageSize={pageSize}
      rowsPerPageOptions={[pageSize]}
      getRowId={(row: Stock) => row.symbol}
      sx={{
        '.MuiDataGrid-root': {
          border: `1px solid ${theme.palette.divider}`,
        },
        '.MuiDataGrid-cell': {
          fontSize: theme.typography.body2.fontSize,
          color: theme.palette.text.primary,
        },
        '.MuiDataGrid-columnHeader': {
          backgroundColor: theme.palette.grey[900],
          color: theme.palette.getContrastText(theme.palette.grey[900]),
        },
        '.MuiDataGrid-columnHeaderTitle': {
          fontWeight: theme.typography.fontWeightBold,
        },
        '.MuiIconButton-root': {
          '&:hover': {
            backgroundColor: 'transparent',
          },
        },
        '.MuiDataGrid-sortIcon': {  
          color: 'white',
        },
      }}
    />
    )}
    </>
  );
};

export default StockTable;