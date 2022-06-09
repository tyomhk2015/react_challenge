import { useNavigate, useParams } from "react-router-dom";

const Coin = () => {
  const navigate = useNavigate();
  const { coinId } = useParams();

  const goBack = () => {
    navigate('/', {replace: false});
  }
  return (
    <>
      <button onClick={goBack}>Go Back</button>
      <h1>{coinId}</h1>
      <p>THIS COIN IS THE FUTURE.</p>
    </>
  )
}

export default Coin;