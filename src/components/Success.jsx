import { useNavigate } from "react-router-dom"

export default function Success() {
  const navigate = useNavigate()

  const backToProduk = () => {

    navigate('/produk')
  }


  return (
    <div className="success">
      <p>Pembayaran Success</p>
      <button onClick={backToProduk}>Kembali</button>
    </div>
  )
}