import { useState } from "react";
import { Clipboard, Check } from "lucide-react";

interface CopyButtonProps {
  value: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({ value }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button onClick={handleCopy} className="p-2">
      {copied ? (
        <Check className="w-5 h-5 text-green-500 transition-all cursor-pointer" />
      ) : (
        <Clipboard className="w-5 h-5 text-gray-500 hover:text-black transition-all cursor-pointer" />
      )}
    </button>
  );
};

export default CopyButton;
