import React from "react";
import { Images } from "../../assets";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
              
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-700 hover:text-gray-700 cursor-pointer"
        >
          <img
          src={Images.close_icon}
          width={50}
          height={50}
          alt="close button"
          />
        </button>

       
        {title && (
          <h2 className="text-xl font-semibold mb-4 text-gray-800">{title}</h2>
        )}

       
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
