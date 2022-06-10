import { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, Route, Routes, useNavigate, useParams, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoin, fetchCoinTickers } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const ReturnWrapper = styled.div`
  position: absolute;
  background-color: transparent;
  top: 3rem;
  left: 3rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  appearene: none;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
  border: 2px solid ${(props) => props.theme.textColor};
`;

interface CoinProp {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

const Coin = () => {
  const navigate = useNavigate();
  const { coinId } = useParams();
  const { isLoading: infoLoading, data: infoData } = useQuery<CoinProp>(
    [`${coinId} Info`],
    () => fetchCoin(coinId!)
  );

  const loading = infoLoading;

  // Redirect to 'coins' page if the parameter is same as the name of the project.
  useEffect(() => {
    if (coinId === "react_challenge") {
      navigate("/", { replace: true });
    }
  }, [coinId, navigate]);

  return (
    <>
      <ReturnWrapper>
        <Link to="/">
          <svg
            stroke="#333"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </Link>
      </ReturnWrapper>
      {loading ? (<h1>Loading</h1>) : (
        <>
          <h1>{infoData?.name} ({infoData?.symbol})</h1>
          <p>{infoData?.description}</p>
          <Link to={`/${coinId}/price`}>Price</Link>
          <Link to={`/${coinId}/chart`}>Chart</Link>
          <Routes>
            <Route path='price' element={<Price coinId={coinId!}/>} />
            <Route path='chart' element={<Chart coinId={coinId!}/>} />
          </Routes>
        </>
      )}
    </>
  );
};

export default Coin;
