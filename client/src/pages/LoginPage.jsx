import { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext)

  async function handleLoginSubmit(e) {
    e.preventDefault();
    try {
      const {data} = await axios.post("/login", { email, password });
      setUser(data)
      alert("Login efetuado com sucesso!");
      setRedirect(true);
    } catch (e) {
      console.log(e);
      alert("Login falhou!");
    }
  }

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-xl mx-auto" onSubmit={handleLoginSubmit}>
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
            Não tem uma conta?{" "}
            <Link className="underline text-black" to={"/register"}>
              Registrar agora
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
