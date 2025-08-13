
import { useAccount, useBalance } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";

interface GameNavbarProps {
  logoText?: string;
}

const GameNavbar: React.FC<GameNavbarProps> = ({ logoText = "LOGO" }) => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { openConnectModal } = useConnectModal();

  const formattedBalance = balance
    ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}`
    : "0.0000";

  return (
    <div className="flex justify-between items-center p-4 bg-neutral-800 border-b border-neutral-700">
      <div className="text-yellow-400 font-bold text-xl">{logoText}</div>
      <div className="flex items-center space-x-4">
        {isConnected ? (
          <>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <span className="text-sm">{formattedBalance}</span>
            </div>
            <div className="bg-neutral-700 px-4 py-2 rounded text-sm font-medium">
              {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
            </div>
          </>
        ) : (
          <button
            onClick={openConnectModal}
            className="bg-green-600 px-4 py-2 rounded text-sm font-medium"
          >
            Connect Wallet
          </button>
        )}
        <div className="w-8 h-8 bg-neutral-600 rounded-full flex items-center justify-center">
          👤
        </div>
      </div>
    </div>
  );
};

export default GameNavbar;
