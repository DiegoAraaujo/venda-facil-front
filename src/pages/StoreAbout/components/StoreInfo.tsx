import InfoItem from "./InfoItem";

interface StoreInfoProps {
  business_hours: string;
  address: string;
}
const StoreInfo = ({ address, business_hours }: StoreInfoProps) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-lg font-medium">informações</p>

      <div className="flex flex-col gap-4">
        <InfoItem label="Endereço" description={address} icon="bi bi-geo-alt" />
        <InfoItem
          label="Horário"
          description={business_hours}
          icon="bi bi-clock"
        />
      </div>
    </div>
  );
};

export default StoreInfo;
