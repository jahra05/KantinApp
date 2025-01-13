import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Bayar from './components/Bayar';
import Produk from './components/Produk';
import Login from './components/Login';
import produk from './data/produk';
import Success from './components/Success';

function App() {

  const isLogin = !!localStorage.getItem('token');


  const getProduct = () => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : produk;
  };
  const [products, setProducts] = useState(getProduct);
  console.log('current products', products)

  const handlePlus = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id ? { ...product, count: product.count + 1 } : product
    );
    setProducts(updatedProducts);

  };
  const handleMins = (id) => {
    const updatedProducts = products.map((product) =>
      product.id === id && product.count > 0
        ? { ...product, count: product.count - 1 }
        : product
    );
    setProducts(updatedProducts);
  };


  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(number);
  };


  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);




  const totalBerang = products.reduce(
    (acc, product) => acc + product.price * product.count,
    0
  );

  console.log('ini total barang', totalBerang)

  const resetProdukCheckout = () => {
    const resetProduk = products.map((product) => ({
      ...product, count: 0
    }))
    setProducts(resetProduk)
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/produk"
          element={
            isLogin ? (
              <Produk
                products={products}
                handleMins={handleMins}
                handlePlus={handlePlus}
                formatRupiah={formatRupiah}
                totalBarang={totalBerang}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/pembayaran"
          element={<Bayar formatRupiah={formatRupiah} totalBarang={totalBerang}  resetProducts={resetProdukCheckout} />}
        />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
