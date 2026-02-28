import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      nav("/");
    } catch (err) {
      alert("Неверный логин или пароль");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 480 }}>
      <h2>Вход</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary w-100" type="submit">Войти</button>
      </form>
    </div>
  );
}