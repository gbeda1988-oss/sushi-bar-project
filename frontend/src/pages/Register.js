import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register } = useContext(AuthContext);
  const nav = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      alert("Регистрация успешна! Теперь войдите.");
      nav("/login");
    } catch (err) {
      alert("Ошибка регистрации (возможно username занят)");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4" style={{ maxWidth: 480 }}>
      <h2>Регистрация</h2>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input className="form-control" value={username} onChange={(e)=>setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input className="form-control" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button className="btn btn-success w-100" type="submit">Создать аккаунт</button>
      </form>
    </div>
  );
}