import SectionHeader from "../../../components/SectionHeader";
import { useState } from "react";
import TextInputField from "../../../components/TextInputField";

interface AccountCredentialsSectionProps {
  password: string;
  email: string;
  confirmPassword: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
}
const AccountCredentialsSection = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  confirmPassword,
  onConfirmPasswordChange,
}: AccountCredentialsSectionProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  return (
    <div className="flex flex-col gap-8">
      <SectionHeader step={1} title="Informações da Loja" />
      <div className="flex flex-col gap-4">
        <TextInputField
          id="email"
          label="email"
          onChange={onEmailChange}
          value={email}
          type="text"
          placeHolder="seu@email.com"
        />
        <div className="flex relative">
          <TextInputField
            id="password"
            label="Senha"
            onChange={onPasswordChange}
            value={password}
            type={!showPassword ? "password" : "text"}
            placeHolder="********"
          />
          <button
            className="px-2 absolute right-1 top-8 cursor-pointer bg-white"
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i
              className={`text-gray-500 text-lg bi bi-${!showPassword ? "eye-slash" : "eye"}`}
            />
          </button>
        </div>
        <div className="flex relative">
          <TextInputField
            id="confirm-password"
            label="Confirmar Senha"
            onChange={onConfirmPasswordChange}
            value={confirmPassword}
            type={!showConfirmPassword ? "password" : "text"}
            placeHolder="********"
          />
          <button
            className="px-2 absolute right-1 top-8 cursor-pointer bg-white"
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <i
              className={`text-gray-500 text-lg bi bi-${!showConfirmPassword ? "eye-slash" : "eye"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCredentialsSection;
