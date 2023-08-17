import { useParams } from 'react-router-dom';
import { Card, CardContent, Typography, Grid, CircularProgress } from '@mui/material';
import { Stock } from '../../models/stock';
import { useFetch } from '../../hooks/useFetch/useFetch';

function StockDetails() {
  const { id } = useParams();
  const API_ENDPOINT = `https://cloud.iexapis.com/stable/stock/${id}/quote?token=${import.meta.env.VITE_API_KEY}`;
  const { data: stock, loading } = useFetch<Stock>(API_ENDPOINT, [id]);

  if (loading) {
    return <CircularProgress />;
  }

  if (!stock) {
    return <Typography variant="h6">No stock details found for {id}</Typography>;
  }

  return (
    <Card sx={{ boxShadow: 3, mt: 5, p: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom sx={{ mb: 3, borderBottom: '1px solid', pb: 2 }}>
          Stock Details for {stock.symbol}
        </Typography>
        <Grid container spacing={3}>
          {[
            { label: "Open Price", value: stock.open },
            { label: "Close Price", value: stock.close },
            { label: "Volume", value: stock.volume },
            { label: "Date", value: stock.latestTime },
          ].map((item, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Typography variant="h6">{item.label}: {item.value}</Typography>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default StockDetails;