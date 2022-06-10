import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Coin = styled.li`
  border: 1px solid ${(props) => props.theme.textColor};
  border-radius: 0.5rem;
  transition: 0.2s all;
  &:hover {
    transform: scale(1.1);
    border-width: 2px;
  }
  &:not(:first-of-type) {
    margin-top: 1rem;
  }
  & > a {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    text-decoration: none;
    color: ${(props) => props.theme.textColor};
  }
`;
const CoinImage = styled.img`
  width: 2rem;
  height: 2rem;
`;

const CoinsWrapper = styled.ul`
  margin-top: 3rem;
`;

interface ICoinsProp {
  id: string;
  name: string;
  symbol: string;
}

const Coins = () => {
  const { isLoading, data } = useQuery<ICoinsProp[]>("Coins", fetchCoins);

  return (
    <>
      <h1>CRYPTO CURRENCY TRACKER</h1>
      <div>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <CoinsWrapper>
            {data?.slice(0, 10).map((coin) => {
              return (
                <Coin key={coin.name}>
                  <Link to={`/${coin.id}`} state={coin.name}>
                    <span>{coin.name}</span>
                    <CoinImage
                      src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                    />
                  </Link>
                </Coin>
              );
            })}
          </CoinsWrapper>
        )}
      </div>
    </>
  );
};

export default Coins;
