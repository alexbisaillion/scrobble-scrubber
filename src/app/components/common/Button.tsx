type ButtonProps = {
  label: string;
  fill: string;
  onClick?: () => void;
  type?: "submit";
};
export const Button = ({ label, fill, onClick, type }: ButtonProps) => {
  const className = `px-4 py-2 ${fill} text-white rounded-md cursor-pointer`;
  return (
    <button onClick={onClick} className={className} type={type}>
      {label}
    </button>
  );
};
