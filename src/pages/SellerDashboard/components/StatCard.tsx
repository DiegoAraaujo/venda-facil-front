import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  description: string;
  bgColor?: string;
  textColor?: string;
}

const StatCard = ({ icon, value, description, bgColor = "bg-gray-100", textColor = "text-gray-600" }: StatCardProps) => {
  return (
    <div className="rounded-xl bg-white border border-gray-300 shadow-md flex gap-1 items-center flex-col p-4">
      <div className={`rounded-xl w-8 h-8 flex justify-center items-center text-xl ${bgColor} ${textColor}`}>
        {icon}
      </div>
      <p className="font-bold  ">{value}</p>
      <p className="text-gray-500 text-xs text-center">{description}</p>
    </div>
  );
};

export default StatCard;
