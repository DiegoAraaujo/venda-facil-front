import SectionHeader from "../../../components/SectionHeader";
import TextInputField from "../../../components/TextInputField";
import TextAreaInput from "../../../components/TextAreaInput";
import StoreAvatarUpload from "./StoreAvatarUpload";
import StoreBannerUpload from "./StoreBannerUpload";

interface StoreInfoSectionProps {
  storeName: string;
  onStoreNameChange: (value: string) => void;
  description: string;
  onDescriptionChange: (value: string) => void;
  onBannerChange: (value: File | null) => void;
  onProfilePhotoChange: (value: File | null) => void;
  resetTrigger?: boolean;
}

const StoreInfoSection = (props: StoreInfoSectionProps) => {
  return (
    <div className="flex flex-col gap-8">
      <SectionHeader step={2} title="Informações da Loja" />
      <div className="flex flex-col gap-4">
        <TextInputField
          id="store-name"
          label="Nome da Loja *"
          onChange={props.onStoreNameChange}
          value={props.storeName}
          type="text"
          placeHolder="Digite o nome da sua loja"
        />
        <TextAreaInput
          label="Descrição"
          onChangeContent={props.onDescriptionChange}
          id="description"
          value={props.description}
          placeHolder="Descreva sua loja em poucas palavras..."
        />
        <StoreAvatarUpload
          onProfilePhotoChange={props.onProfilePhotoChange}
          resetTrigger={props.resetTrigger}
        />
        <StoreBannerUpload
          onBannerChange={props.onBannerChange}
          resetTrigger={props.resetTrigger}
        />
      </div>
    </div>
  );
};

export default StoreInfoSection;
