import { Link } from "react-router-dom";
import { useState } from "react";
import type { Category } from "./interface";
import StoreContactSection from "./components/StoreContactSection";
import StoreInfoSection from "./components/StoreInfoSection";
import StoreCategoriesSection from "./components/StoreCategoriesSection";
import { toast } from "sonner";
import AccountCredentialsSection from "./components/AccountCredentialsSection";
import { isValidEmail } from "../../utils/validateEmail";
import { createStore } from "../../services/store";
import Button from "../../components/Button";

const CreateStore = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [storeName, setStoreName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [whatsApp, setWhatsApp] = useState<string>("");
  const [instagram, setInstagram] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [openingHours, setOpeningHours] = useState<string>("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [banner, setBanner] = useState<File | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [resetTrigger, setResetTrigger] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    if (!isValidEmail(email)) return toast.warning("Digite um email válido!");
    if (password.trim().length < 8)
      return toast.warning("Sua senha deve conter no mínimo 8 dígitos");
    if (confirmPassword.trim() !== password.trim())
      return toast.warning("Suas senhas devem ser iguais");
    if (!storeName.trim()) return toast.warning("Informe o nome da loja");
    if (!description.trim())
      return toast.warning("Informe a descrição da loja");
    if (!/^\d{11}$/.test(whatsApp))
      return toast.warning("WhatsApp inválido. Use DDD + número");
    if (!instagram.trim()) return toast.warning("Informe o Instagram da loja");
    if (!address.trim()) return toast.warning("Informe o endereço");
    if (!openingHours.trim())
      return toast.warning("Informe o horário de funcionamento");
    if (!profilePhoto)
      return toast.warning("Adicione uma foto de perfil da loja");
    if (!banner) return toast.warning("Adicione um banner da loja");
    if (categories.length === 0)
      return toast.warning("Adicione ao menos uma categoria");

    setLoading(true);

    const formData = new FormData();
    formData.append("password", password);
    formData.append("email", email);
    formData.append("name", storeName);
    formData.append("description", description);
    formData.append("profile_photo", profilePhoto);
    formData.append("banner", banner);
    formData.append("whatsApp", whatsApp);
    formData.append("instagram", instagram);
    formData.append("address", address);
    formData.append("business_hours", openingHours);
    formData.append("categories", JSON.stringify(categories));

    try {
      await createStore(formData);
      toast.success("Loja criada com sucesso!");

      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setStoreName("");
      setDescription("");
      setWhatsApp("");
      setInstagram("");
      setAddress("");
      setOpeningHours("");
      setCategories([]);
      setBanner(null);
      setProfilePhoto(null);

      setResetTrigger((prev) => !prev);
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-7xl w-full m-auto flex flex-col gap-12 p-4">
      <div className="flex gap-8 items-center sticky top-0 left-0 h-20 bg-white z-30">
        <Link
          to="/"
          className="cursor-pointer hover:-translate-x-1 transition-transform duration-300"
        >
          <i className="bi bi-arrow-left text-2xl" />
        </Link>
        <div>
          <p className="font-medium">Crie sua Loja</p>
          <p className="text-xs text-gray-500">Configure sua vitrine digital</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-8 max-w-2xl w-full m-auto"
      >
        <AccountCredentialsSection
          email={email}
          password={password}
          confirmPassword={confirmPassword}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
        />
        <StoreInfoSection
          description={description}
          storeName={storeName}
          onDescriptionChange={setDescription}
          onStoreNameChange={setStoreName}
          onBannerChange={setBanner}
          onProfilePhotoChange={setProfilePhoto}
          resetTrigger={resetTrigger}
        />
        <StoreContactSection
          address={address}
          instagram={instagram}
          whatsApp={whatsApp}
          openingHours={openingHours}
          onAddressChange={setAddress}
          onInstagramChange={setInstagram}
          onOpeningHoursChange={setOpeningHours}
          onWhatsAppChange={setWhatsApp}
        />
        <StoreCategoriesSection
          categories={categories}
          setCategories={setCategories}
        />
        <Button isLoading={loading} loadingText="Criando" type="submit">
          <i className="bi bi-shop" />
          <span>Criar Loja</span>
        </Button>
      </form>
    </section>
  );
};

export default CreateStore;
