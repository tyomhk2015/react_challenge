import { useQuery } from "react-query"
import { fetchCoinTickers } from "../api"
import styled from "styled-components";

const PriceTable = styled.dl`
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  border: 1px solid #333;
  border-radius: 4px;

  & dt {
    background-color: #666;
    padding: 0.5rem;
    color: ${(props) => props.theme.tableTextColor};
    letter-spacing: 1px;
  }

  & dd {
    padding: 0.8rem;
    background-color: ${(props) => props.theme.tableBgColor};
  }

  & > div:not(:first-of-type) {
    border-left: 1px solid #333;
  }
`
interface ITickerProp {
  market_cap: number
  price: number
  timestamp: string
  volume_24h: number
}
interface ICoinProp {
  coinId: string
}

const Price = ({coinId} : ICoinProp) => {
 
  const { isLoading: tickersLoading, data: tickersData } = useQuery(
    [`${coinId} PriceTickers`],
    () => fetchCoinTickers(coinId!)
  );


  return (
    <>
      {tickersLoading ? (
        "Loading ..."
      ) : (
        <PriceTable>
          <div>
            <dt>Time</dt>
            {tickersData?.map((ticker: ITickerProp ) => {
              const tickerDate = new Date(ticker.timestamp).toDateString();
              return (
                <dd key={tickerDate}>{tickerDate}</dd>
              )
            })}
          </div>
          <div>
            <dt>Price($)</dt>
            {tickersData?.map((ticker: ITickerProp ) => <dd key={ticker.price}>{ticker.price}</dd>)}
          </div>
          <div>
            <dt>Volume</dt>
            {tickersData?.map((ticker: ITickerProp ) => <dd key={ticker.volume_24h}>{ticker.volume_24h}</dd>)}
          </div>
          <div>
            <dt>Market Capital</dt>
            {tickersData?.map((ticker: ITickerProp ) => <dd key={ticker.market_cap}>{ticker.market_cap}</dd>)}
          </div>
        </PriceTable>
      )}
    </>
  )
}

export default Price;