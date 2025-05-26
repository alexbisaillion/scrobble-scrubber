import { ReactNode } from "react";
import { Button } from "./Button";

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
  header: string;
}

export const Modal = ({ children, onClose, header }: ModalProps) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 overflow-y-auto">
      <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4">{header}</h2>
          <Button fill="bg-blue-600" onClick={onClose} label="Exit" />
        </div>
        {children}
      </div>
    </div>
  );
};
