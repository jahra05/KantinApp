import { useEffect, useState } from "react"
import { data, useNavigate } from "react-router-dom"
import {
  getOrder, payOrder
} from "../api"



export default function Bayar({ formatRupiah, totalBarang, resetProducts }) {

  const [isChacked, setIsChacked] = useState("")
  const [respone, setRespone] = useState()
  const navigate = useNavigate()


  useEffect(() => {
    getBayar()
  }, [])

  const handleIsChacked = (e) => {
    setIsChacked(e.target.value)
  }
  console.log("ini pay", isChacked)

  const getBayar = async () => {

    const orderId = localStorage.getItem("order_id")
    console.log("Order ID dari localStorage:", localStorage.getItem("order_id"));



    if (!orderId) {
      alert("order id tidak di temukan")
      return;
    }
    const response = await getOrder({ orderId })

    if (!response.error) {
      console.log(response)
      console.log("Get order berhasil", response.data);
      setRespone(response.data)


    } else {
      console.error("Get order gagal", response.message);
    }
  }

  const onBayar = async () => {
    const orderId = localStorage.getItem("order_id")
    console.log("Order ID dari localStorage:", localStorage.getItem("order_id"));

    const baya_product = await payOrder({ order_id: orderId, payment_method: isChacked })


    if (baya_product) {
      resetProducts()
      navigate("/success");
    } else {
      alert("gagal bayar ")
    }

  }






  return (
    <>
      <div className="kasir">
        <h5>Bayar</h5>
        <div className="bayar-barang">
          <p>Total Bayar</p>
          <p>{formatRupiah(respone?.total_price || 0)}</p>
        </div>
        <div className="payment">
          <p>Metode Pembayaran</p>
          <div className="payment-method">
            <label>
              <input type="radio" name="pay" value="cash" checked={isChacked === "cash"} onChange={handleIsChacked} />
              cash {data.payment_status}
            </label>
            <label>
              <input type="radio" name="pay" value="e-banking" checked={isChacked === "e-banking"} onChange={handleIsChacked} />
              E-banking {data.payment_status}
            </label>
          </div>
        </div>
        <div className="btn-bayar">
          <button onClick={onBayar}>Bayar</button>
        </div>
      </div>


    </>
  )
}