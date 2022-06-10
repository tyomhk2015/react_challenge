import ApexCharts from "react-apexcharts";
import { useQuery } from "react-query";
import { fetchCoinTickers } from "../api";

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

  console.log(arrangedTickers);

  // console.log(tickersData);
  return (
    <>
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
    </>
  );
};

export default Chart;
