
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/nav';
import Footer from './components/footer';
import Signup from './components/Signup';
import PrivateCom from './components/PrivateCom';
import Login from './components/Login';
import AddProduct from './components/AddProduct';
import Products from './components/Products';
import UpdateProduct from './components/UpdateProduct';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateCom />} >
            <Route path="/" element={<Products/>} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/update" element={<UpdateProduct/>} />
            <Route path="/logout" element={<h1>Logout</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
