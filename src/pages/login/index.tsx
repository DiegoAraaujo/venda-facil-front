import { useState } from "react";
import TextInputField from "../../components/TextInputField";
import { toast } from "sonner";
import { signInStore } from "../../services/store";
import { isValidEmail } from "../../utils/validateEmail";
import { Link, useNavigate } from "react-router-dom";
import { setAccessToken } from "../../utils/authStorage";
import { useAuth } from "../../hooks/UseAuth";
import Button from "../../components/Button";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isLoading) return;

    if (!isValidEmail(email.trim()))
      return toast.warning("Digite um e-mail válido");

    if (password.trim().length < 8)
      return toast.warning("A senha deve ter pelo menos 8 caracteres");

    try {
      setIsLoading(true);
      const data = await signInStore(email, password);
      setAccessToken(data.accessToken);
      login();
      navigate("/seller/dashboard");
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center min-h-dvh relative">
      <Link
        to={"/"}
        className="absolute top-4 left-4 cursor-pointer hover:bg-gray-200 rounded-xl py-2 px-4 transition-colors duration-200"
      >
        <i className="bi bi-arrow-left"></i>
      </Link>
      <form
        className="rounded-xl p-6 shadow-md max-w-100 w-full border border-gray-300 flex flex-col gap-8"
        onSubmit={handleLogin}
      >
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-xl bg-emerald-600 p-2">
            <i className="bi bi-shop text-4xl text-white" />
          </div>
          <p className="text-2xl font-bold">Entrar na loja</p>
          <p className="text-gray-500">Acesse sua conta de vendedor</p>
        </div>

        <div className="flex flex-col gap-4">
          <TextInputField
            id="email"
            label="E-mail"
            onChange={setEmail}
            placeHolder="seu@email.com"
            type="text"
            value={email}
          />

          <div className="flex relative">
            <TextInputField
              id="password"
              label="Senha"
              onChange={setPassword}
              value={password}
              type={showPassword ? "text" : "password"}
              placeHolder="********"
            />
            <button
              type="button"
              className="px-2 absolute right-1 top-8 cursor-pointer bg-white"
              onClick={() => setShowPassword(!showPassword)}
            >
              <i
                className={`text-gray-500 text-lg bi bi-${
                  showPassword ? "eye" : "eye-slash"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Button isLoading={isLoading} loadingText="Entrando" type="submit">
            Entrar
          </Button>

          <p className="text-xs text-gray-500 text-center">
            ainda não tem uma loja?{" "}
            <span className="text-emerald-600 cursor-pointer">crie agora</span>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Login;
