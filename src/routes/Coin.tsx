import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { Link, Route, Routes, useNavigate, useParams} from "react-router-dom";
import styled from "styled-components";
import { fetchCoin } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
`

const ReturnWrapper = styled.div`
  position: fixed;
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

const Tabs = styled.ul`
  display: grid;
  place-content: center;
  margin-top: 2rem;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  gap: 2rem;
  & a {
    display: block;
    font-size: 2rem;
    text-decoration: none;
    padding: 1rem;
    color: ${(props) => props.theme.textColor}; 
    border: 1px solid ${(props) => props.theme.textColor};
  }
`

const Tab = styled.li`
  transition: 0.2s all;
  &:hover {
    transform: scale(1.1);
    border-style: dotted;
    border-width: 2px;
}
`;

const Icon = styled.svg`
  stroke: ${(props) => props.theme.textColor}
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
          <Icon
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </Icon>
        </Link>
      </ReturnWrapper>
      {loading ? (<h1>Loading</h1>) : (
        <>
          <Title>{infoData?.name} ({infoData?.symbol})</Title>
          <p>{infoData?.description}</p>
          <Tabs>
            <Tab>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
            <Tab>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
          </Tabs>
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
