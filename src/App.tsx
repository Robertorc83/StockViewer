import { Provider } from 'react-redux';
import './App.css';
import { Navbar, Footer, CustomDialog } from './components';
import { Home } from './pages';
import store from './redux/store';
import { LayoutContainer } from './styled-components';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import { FavoriteTable } from './components/FavoriteTable';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StockDetails } from './pages/StockDetails';


function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <CustomDialog>
            <FavoriteTable />
          </CustomDialog>
          <LayoutContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/stock/:id" element={<StockDetails />} />
            </Routes>
          </LayoutContainer>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
}

export default App;