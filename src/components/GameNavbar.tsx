
interface GameNavbarProps {
  logoText?: string;
  balance?: string;
  onWalletClick?: () => void;
}

const GameNavbar: React.FC<GameNavbarProps> = ({
  logoText = "LOGO",
  balance = "6,83241",
  onWalletClick,
}) => {
  return (
    <div className="flex justify-between items-center p-4 bg-neutral-800 border-b border-neutral-700">
      <div className="text-yellow-400 font-bold text-xl">{logoText}</div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span className="text-sm">{balance}</span>
        </div>
        <button
          onClick={onWalletClick}
          className="bg-green-600 px-4 py-2 rounded text-sm font-medium"
        >
          Wallet
        </button>
        <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
          👤
        </div>
      </div>
    </div>
  );
};

export default GameNavbar;
