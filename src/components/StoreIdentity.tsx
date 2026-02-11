interface StoreIdentityProps {
  name: string;
  logoUrl: string;
}

const StoreIdentity = ({ logoUrl, name }: StoreIdentityProps) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="h-14 w-14 rounded-full">
        <img
          src={logoUrl}
          className="h-full w-full object-cover rounded-full"
        />
      </div>
      <h1 className="font-semibold text-lg">{name}</h1>
    </div>
  );
};

export default StoreIdentity;
