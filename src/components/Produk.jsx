import { useNavigate } from "react-router-dom"

export default function Produk({ totalBarang, products, handleMins, handlePlus, formatRupiah, setTotal }) {
  console.log('ini data produk setelah di terima ', products)
  console.log('total dari produk', totalBarang)
  console.log(formatRupiah)
  const navigate = useNavigate()




  const handlePembayaran = () => {
    navigate('/pembayaran', { state: { total: totalBarang } })
  }



  return <>
    <div className="produk">
      <p className="produk2">Produk</p>
      <div className="produk-list">
        {products.map((product) => (
          <div className="produk-item" key={product.id}>
            <div className="produk-details">
              <p className="pcs">{product.count}x</p>
              <p className="produk-name">{product.name}</p>
              <p className="produk-price">{formatRupiah(product.price * product.count)}</p>
            </div>
            <div className="produk-btn">
              <button className="btn1" onClick={() => handlePlus(product.id)}>+</button>
              <button className="btn2" onClick={() => handleMins(product.id)}>-</button>
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