interface SectionHeaderProps {
  step: number;
  title: string;
}

const SectionHeader = ({ step, title }: SectionHeaderProps) => {
  return (
    <div className="flex gap-3 items-center">
      <span className="bg-gray-200 rounded-xl py-1 px-3 font-semibold">{step}</span>
      <p className="text-lg">{title}</p>
    </div>
  );
};

export default SectionHeader;
