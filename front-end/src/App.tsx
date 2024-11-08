import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddCard from "./pages/AddCard";
import Login from "./pages/Login";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login></Login>}></Route>
          <Route path="/Home" element={<Home></Home>}></Route>
          <Route path="/addCard" element={<AddCard></AddCard>}></Route>
          <Route path="/Login" element={<Login></Login>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
