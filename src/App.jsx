
import './App.css'

import { BrowserRouter, Route, Routes } from "react-router-dom";

import FlightSearch from './page/flightSearch/FlightSearch';
import FlightList from './page/flightList/FlightList';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<FlightSearch />} />
        <Route path="/flightList" element={<FlightList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
