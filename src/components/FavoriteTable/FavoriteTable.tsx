import { Stock } from '../../models/stock';
import { removeFavorite } from '../../redux/slices';
import { AppStore } from '../../redux/store';
import { Delete } from '@mui/icons-material';
import { IconButton, useTheme } from '@mui/material';
import { DataGrid  } from '@mui/x-data-grid';
import type  { GridRenderCellParams  } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';


const FavoriteTable: React.FC = () => {
  const pageSize = 5;
  const theme = useTheme();
  const dispatch = useDispatch();
  const stateFavorites = useSelector((store: AppStore) => store.favorites);

  const handleClick = (symbol: string) => {
    dispatch(removeFavorite(symbol));
  };

  const columns = [
    {
      field: 'actions',
      sortable: false,
      headerName: '',
      width: 50,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton color="secondary" aria-label="favorites" component="label" onClick={() => handleClick(params.row.symbol)}>
          <Delete />
        </IconButton>
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
  ];

  return (
    <DataGrid
      rows={stateFavorites}
      columns={columns}
      disableColumnSelector
      disableSelectionOnClick
      autoHeight
      pageSize={pageSize}
      rowsPerPageOptions={[pageSize]}
      getRowId={(row: Stock | null) => row?.symbol || Math.random().toString()}
      sx={{
        '.MuiDataGrid-columnHeader': {
          marginTop: theme.spacing(1), // Margin at the top
          marginBottom: theme.spacing(1), // Margin at the bottom
        },
      }}
    />
  );
};

export default FavoriteTable;