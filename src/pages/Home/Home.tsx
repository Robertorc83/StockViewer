// import { People } from '@/data';
// import { addPeople } from '@/redux/slices';
import React from 'react';
import { StocksTable } from './components';
import Box from '@mui/material/Box';

export interface HomeInterface {}

const Home: React.FC<HomeInterface> = () => {
  return (
    <Box 
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80vw',
        height: '100vh',
        margin: '0 auto'
      }}
    >
      <StocksTable />
    </Box>
  );
};

export default Home;