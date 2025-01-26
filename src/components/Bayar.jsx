import { useState } from "react"
import { data, useNavigate } from "react-router-dom"
import { getOrder } from "../api"


export default function Bayar({ formatRupiah, totalBarang, resetProducts }) {

  const [isChacked, setIsChacked] = useState(false)
  const navigate = useNavigate()

  const handleIsChacked = () => {
    setIsChacked(!isChacked)
  }

  const handleBayar = async () => {

    const orderId = localStorage.getItem("order_id")
    console.log("Order ID dari localStorage:", localStorage.getItem("order_id"));



    if (!orderId) {
      alert("order id tidak di temukan")
      return;
    }
    const response = await getOrder({ orderId })

    if (!response.error) {
      console.log("Get order berhasil", response.data);
      alert(`Order berhasil diambil! Order ID: ${response.data.order_id}`);
      resetProducts()
      navigate("/success");

    } else {
      console.error("Get order gagal", response.message);
      alert("Gagal mengambil detail pesanan. Silakan coba lagi.");
    }
  }

  // if (isChacked && totalBarang > 0) {
  //   resetProducts()
  //   console.log(resetProducts)
  //   navigate('/success')
  // } else if (!isChacked) {
  //   alert("pilih metode oembayaran terlebih dahulu")
  // } else if (totalBarang === 0) {
  //   alert("tidak ada produk untuk di bayar")
  // }

  return (
    <>
      <div className="kasir">
        <h5>Bayar</h5>
        <div className="bayar-barang">
          <p>Total Bayar</p>
          <p>{formatRupiah(totalBarang)}</p>
          <p>Metode Pembayaran</p>
          <div className="checkbox">
            <label className="custom-checkbox">
              <input type="checkbox" checked={isChacked} onChange={handleIsChacked} />
            </label>
            <label>Tunai {data.payment_status}</label>

            <p>berhasi : {isChacked ? 'dicentang' : 'belum di centang'}</p>
          </div>
        </div>
        <div className="btn-bayar">
          <button onClick={handleBayar}>Bayar</button>
        </div>
      </div>


    </>
  )
}