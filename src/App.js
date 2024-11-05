import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './containers/App/Header/Header';
import Home from './containers/Home/Home';
import Footer from './containers/App/Footer/Footer';
import Catalog from './containers/App/Catalog/Catalog';
import Cart from './containers/App/Cart/Cart';
import IphoneDetails from './components/IphoneDetails/IphoneDetails';
import { cardItems } from "./components/data";


function App() {
 
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog cardItems={cardItems} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/catalog/:iphoneID" element={<IphoneDetails cardItems={cardItems} />} />
        <Route path="/home/:iphoneID" element={<IphoneDetails cardItems={cardItems} />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
