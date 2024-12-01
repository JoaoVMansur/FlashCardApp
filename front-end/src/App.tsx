import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import AddCard from "./pages/AddCard";
import Login from "./pages/Login";
import PrivateRoute from "./components/ProtectedRoute";
import Collection from "./components/Collection";
import SingUp from "./pages/SingUp";
import Profile from "./components/Profile";

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
        <Route path="/singup" element={<SingUp />} />
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
        <Route path="/signup" element={<SingUp />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
