import { useNavigate } from "react-router-dom"
import { checkout } from "../api"

export default function Produk({ totalBarang, products, handleMins, handlePlus, formatRupiah, setTotal }) {
  console.log('ini data produk setelah di terima ', products)
  console.log('total dari produk', totalBarang)
  console.log(formatRupiah)
  const navigate = useNavigate()




  const handlePembayaran = async () => {
    const data = await checkout({
      products: [
        { product_id: "YMTTXcd2qVse6kquUyp9", quantity: 10 }
      ]
    });

    if (data) {
      if (data.message === "checkout success") {
        console.log("checkout berhasil", data.data.products)
        alert(`checkout berhasil! order id: ${data.data.order_id}`)

        localStorage.setItem("order_id", data.data.order_id)
        console.log("Order ID yang disimpan:", data.data.order_id);

        navigate('/pembayaran')

      } else {
        console.error('checkout gagal', data.message)
        alert("checkout gagal")
      }
    } else {
      alert('terjadi masalah saat memproses checkout , silhakan coba lagi')
    }

  }






  return <>
    <div className="produk">
      <p className="produk2">Produk</p>
      <div className="produk-list">
        {products.map((product) => (
          <div className="produk-item" key={product.product_id}>
            <div className="produk-details">
              <p className="pcs">{product.quantity}x</p>
              <p className="produk-name">{product.product_name}</p>
              <p className="produk-price">{formatRupiah(product.product_price * product.quantity)}</p>
              <p className="stok-produk">stok : {product.stock}</p>
            </div>
            <div className="produk-btn">
              <button className="btn1" onClick={() => handlePlus(product.product_id)} disabled={product.stock <= 0} >+</button>
              <button className="btn2" onClick={() => handleMins(product.product_id)} disabled={product.stock <= 0}>-</button>
            </div>
          </div>
        ))}
      </div>


      <div className="checkout">
        <div className="total">
          <p>Total</p>

          <h4>{formatRupiah(totalBarang)}</h4>
        </div>
        <div className="btn-checkout">
          <button onClick={handlePembayaran}>Checkout</button>
        </div>
      </div>
    </div>
  </>
}