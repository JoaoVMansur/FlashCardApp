import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddCard from "./pages/AddCard";
import Login from "./pages/Login";
import PrivateRoute from "./components/ProtectedRoute";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route
            path="/Home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/addCard"
            element={
              <PrivateRoute>
                <AddCard />
              </PrivateRoute>
            }
          />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
