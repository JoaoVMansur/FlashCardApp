import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddCard from "./pages/AddCard";
import Login from "./pages/Login";
import PrivateRoute from "./components/ProtectedRoute";
import Collection from "./components/Collection";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
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
        <Route
          path="/collection/:id"
          element={
            <PrivateRoute>
              <Collection />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
