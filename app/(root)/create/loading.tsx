import { Loader2 } from "lucide-react";

interface loadingProps {}

function LoadingPage({}: loadingProps) {
  return (
    <div className="absolute left-1/2 top-1/2">
      <Loader2 className="w-16 animate-spin" />
    </div>
  );
}

export default LoadingPage;
