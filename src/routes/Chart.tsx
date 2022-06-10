import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";

const ChartWrapper = styled.div`
  margin-top: 2rem;
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 4px;
  background-color: rgba(0,0,0,0.5);
`

interface ICoinProp {
  coinId: string;
}

interface ITickerProp {
  market_cap: number;
  price: number;
  timestamp: string;
  volume_24h: number;
}

interface ICandleStick {
  x: Date,
  y: number[]
}

const Chart = ({ coinId }: ICoinProp) => {
  const { isLoading: tickersLoading, data: tickersData } =
    useQuery<ITickerProp[]>([`${coinId} ChartTickers`], () =>
      fetchCoinTickers(coinId!)
    );
  
  const arrangedTickers = tickersData?.map((ticker) => {
    return {
      x: new Date(Date.parse(ticker.timestamp)),
      y: [ticker.price, ticker.price, ticker.price, ticker.price]
    }
  }) as ICandleStick[];

  return (
    <ChartWrapper>
      {tickersLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="candlestick"
          series={[
            {
              data: arrangedTickers
            },
          ]}
          options={{
            chart: {
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
            },
          }}
        />
      )}
    </ChartWrapper>
  );
};

export default Chart;
