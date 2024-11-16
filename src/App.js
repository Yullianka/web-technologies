// App.js або інший компонент, де завантажуєте кошик
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCartFromLocalStorage } from './action/cartAction';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './containers/App/Header/Header';
import Home from './containers/Home/Home';
import Footer from './containers/App/Footer/Footer';
import Catalog from './containers/App/Catalog/Catalog';
import Cart from './containers/App/Cart/Cart';
import IphoneDetails from './components/IphoneDetails/IphoneDetails';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Завантажити кошик з локального сховища при завантаженні додатку
    dispatch(loadCartFromLocalStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalog/:iphoneID" element={<IphoneDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
