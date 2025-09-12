
import { ConnectButton } from "@rainbow-me/rainbowkit";

interface GameNavbarProps {
  logoText?: string;
}

const GameNavbar: React.FC<GameNavbarProps> = ({ logoText = "Hermes Games" }) => {
  return (
    <div className="flex justify-between items-center p-4 bg-neutral-800 border-b border-neutral-700">
      <div className="text-yellow-400 font-bold text-xl">{logoText}</div>
      <div className="flex items-center space-x-4">
        <ConnectButton />
      </div>
    </div>
  );
};

export default GameNavbar;
