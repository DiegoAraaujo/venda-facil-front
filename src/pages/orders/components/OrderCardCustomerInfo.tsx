interface OrderCardCustomerInfoProps {
  name: string;
  whatsapp: string;
  address: string | null;
}
const OrderCardCustomerInfo = ({
  address,
  name,
  whatsapp,
}: OrderCardCustomerInfoProps) => {
  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm">{name}</p>

      <div className="flex gap-2 text-xs text-gray-500">
        <p className="flex gap-1 items-center">
          <i className="bi bi-whatsapp text-xs" />
          {whatsapp}
        </p>

        {address && (
          <p className="flex gap-1 items-center">
            | <i className="bi bi-geo-alt text-xs" />
            {address}
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderCardCustomerInfo;
