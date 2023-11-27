import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function registerUser(e) {
    e.preventDefault();
    try {
      await axios.post("/register", {
        name,
        email,
        password,
      });
      alert("Registro realizado com sucesso, agora você pode entrar!");
    } catch (e) {
      alert("Registro falhou, por favor tente novamente mais tarde!");
    }
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Registro</h1>
        <form className="max-w-xl mx-auto" onSubmit={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder={"seu@email.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="primary">Conecte-se</button>
          <div className="text-center py-2 text-gray-500">
            Já é um membro?{" "}
            <Link className="underline text-black" to={"/login"}>
              Fazer Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
