import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box 
      sx={{ 
        backgroundColor: '#333', 
        color: '#fff', 
        padding: '1rem 0', 
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000  // Ensure the footer is above other content
      }}
    >
      <Typography variant="body1" component="div">
        © {new Date().getFullYear()} Created by Roberto Espinoza
      </Typography>
    </Box>
  );
};

export default Footer;