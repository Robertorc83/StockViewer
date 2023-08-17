import { AppBar, IconButton, Toolbar, Typography, Badge } from '@mui/material';
import React from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { dialogOpenSubject$ } from '../CustomDialog/CustomDialog';
import { useSelector } from 'react-redux';
import { AppStore } from '../../redux/store';


const Navbar: React.FC = () => {
  const stateFavorites = useSelector((store: AppStore) => store.favorites);

  const handleClick = () => {
    dialogOpenSubject$.setSubject = true;
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: '#333', boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.2)' }}>
        <Toolbar sx={{ padding: '0 2rem' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 500 }}>
            S&P500 Companies
          </Typography>
          <Badge badgeContent={stateFavorites.length} color="error">
            <IconButton color="secondary" aria-label="favorites" component="label" onClick={handleClick}>
              <FavoriteIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          </Badge>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;