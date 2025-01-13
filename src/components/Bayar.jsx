import { useState } from "react"
import { useNavigate } from "react-router-dom"


export default function Bayar({ formatRupiah, totalBarang, resetProducts}) {

  const [isChacked, setIsChacked] = useState(false)
  const navigate = useNavigate()

  const handleIsChacked = () => {
    setIsChacked(!isChacked)
  }

  const handleBayar = () => {
    if (isChacked && totalBarang > 0) {
      resetProducts()
      console.log(resetProducts)
      navigate('/success')
    } else if (!isChacked) {
      alert("pilih metode oembayaran terlebih dahulu")
    } else if (totalBarang === 0) {
      alert("tidak ada produk untuk di bayar")
    }
  }

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
            <label>Tunai</label>

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