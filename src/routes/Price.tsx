import { useQuery } from "react-query"
import { fetchCoinTickers } from "../api"

interface ITickerProps {
  market_cap: number
  price: number
  timestamp: string
  volume_24h: number
}

interface ICoinProp {
  coinId: string
}

const Price = ({coinId} : ICoinProp) => {
 
  const { isLoading: tickersLoading, data: tickersData } = useQuery<ITickerProps>(
    [`${coinId} PriceTickers`],
    () => fetchCoinTickers(coinId!)
  );

  console.log(tickersData);
  return (
    <>
      {tickersLoading ? (
        "Loading ..."
      ) : (
        "DONE"
      )}
    </>
  )
}

export default Price;