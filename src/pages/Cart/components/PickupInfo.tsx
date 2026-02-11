interface PickupInfoProps {
  address: string;
}
const PickupInfo = ({ address }: PickupInfoProps) => {
  return (
    <div className="flex gap-4 items-center rounded-xl border border-gray-300 p-4 bg-gray-50">
      <i className="bi bi-shop text-emerald-600 text-xl" />
      <div>
        <p className="text-sm">Retirar em:</p>
        <p className="text-sm text-gray-500">{address}</p>
      </div>
    </div>
  );
};

export default PickupInfo;
