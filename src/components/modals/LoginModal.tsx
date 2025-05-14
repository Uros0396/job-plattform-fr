import LoginUserOrCompany from "../Login/Login";

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h5 className="text-xl font-semibold">Login</h5>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <span className="sr-only">Close</span>&#x2715;
          </button>
        </div>
        <div className="mt-4">
          <LoginUserOrCompany />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
