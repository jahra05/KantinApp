import { Routes, Route, } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Bayar from './components/Bayar';
import Produk from './components/Produk';
import Login from './components/Login';
// import produk from './data/produk';
import Success from './components/Success';
import { produkList } from './api';

function App() {

  // const isLogin = !!localStorage.getItem('token');


  // const getProduct = () => {
  //   const storedProducts = localStorage.getItem('products');
  //   return storedProducts ? JSON.parse(storedProducts) : produk;
  // };
  const [products, setProducts] = useState([]);
  console.log('current products', products)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await produkList();
        console.log('Data produk:', result);
        if (result && !result.error && Array.isArray(result.data)) {
          const transformedData = result.data.map(product => ({
            ...product,
            // count: 0,
            quantity : 0
          }));
          setProducts(transformedData);
        } else {
          console.error('Data tidak valid:', result);
        }
      } catch (error) {
        console.error('Gagal mengambil data produk:', error.message);
      }
    };


    fetchProducts();
  }, []);
  ;


  const handlePlus = (id) => {
    const updatedProducts = products.map((product) =>
      product.product_id === id ? { ...product, quantity: product.quantity + 1, stock: product.stock - 1 } : product
    );
    setProducts(updatedProducts);

  };
  const handleMins = (id) => {
    const updatedProducts = products.map((product) =>
      product.product_id === id && product.quantity > 0
        ? { ...product, quantity: product.quantity - 1, stock: product.stock + 1 }
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
    (acc, product) => acc + product.product_price * product.quantity,
    0
  );

  //   const totalBerang = products.reduce(
  //   (acc, product) => acc + product.product_price * product.product.quantity,
  //   0
  // );

  console.log('ini total barang', totalBerang)

  const resetProdukCheckout = () => {
    const resetProduk = products.map((product) => ({
      ...product, quantity: 0,
    }))
    setProducts(resetProduk)
  }
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/produk"
          // element={
          //   isLogin ? (
          //     <Produk
          //       products={products}
          //       handleMins={handleMins}
          //       handlePlus={handlePlus}
          //       formatRupiah={formatRupiah}
          //       totalBarang={totalBerang}
          //     />
          //   ) : (
          //     <Navigate to="/" />
          //   )

          element={
            <Produk
              products={products}
              handleMins={handleMins}
              handlePlus={handlePlus}
              formatRupiah={formatRupiah}
              totalBarang={totalBerang}
            />
          }
        />
        <Route
          path="/pembayaran"
          element={<Bayar formatRupiah={formatRupiah} totalBarang={totalBerang} resetProducts={resetProdukCheckout} />}
        />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
