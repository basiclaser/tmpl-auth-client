import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage.jsx";
import Register from "./components/Register.jsx";
import Login from "./components/Login.jsx";
import LoggedInArea from "./components/LoggedInArea.jsx";
import Header from "./Header.jsx";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const jwt = localStorage["user-jwt"];
    if (jwt) {
      fetch(`${import.meta.env.VITE_AUTH_API}/me`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(jwt)}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setUser(data.data);
            console.log(data.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user-jwt");
    setTimeout(()=>window.location.reload(), 1)
  };
  return (
    <div className="App">
      <Header user={user} handleLogout={handleLogout}/>
      <hr />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/my-feed" element={<LoggedInArea user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
