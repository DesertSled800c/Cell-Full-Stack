import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import GameList from "./Game/GameList";
import UserGames from "./Game/UserGames";
import { About } from "./About";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={isLoggedIn ? <GameList /> : <Navigate to="/login" />}
        />
        <Route
          path="userGames"
          element={isLoggedIn ? <UserGames /> : <Navigate to="/login" />}
        />
        <Route path="about" element={<About />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<p>Whoops, nothing here...</p>} />
      </Route>
    </Routes>
  );
}
