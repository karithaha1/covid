import React, { ReactNode } from "react";

interface BoxContentProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const BoxContent: React.FC<BoxContentProps> = ({ title, children, className = "" }) => {
  return (
    <div
      className={`bg-white border-t-[10px] border-solid border-[#000080] rounded-[5px] p-4 ${className}`}
      style={{
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
      }}
    >
      {title && <div className="text-[#000080] text-lg font-bold mb-3 ">{title}</div>}
      {children}
    </div>
  );
};

export default BoxContent;
