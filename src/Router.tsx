import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Task from './routes/Task';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/task' element={<Task/>} />
        <Route path='/:coinId/*' element={<Coin/>} />
        <Route path='/' element={<Coins/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;