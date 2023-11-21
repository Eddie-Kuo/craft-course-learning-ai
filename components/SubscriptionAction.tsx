import { Progress } from "@/components/ui/progress";
import axios from "axios";
import { Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Button } from "./ui/button";

interface SubscriptionActionProps {}

function SubscriptionAction({}: SubscriptionActionProps) {
  const { data } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("Error: Subscription submission failed", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto mt-4 flex w-1/2 flex-col items-center gap-2 rounded-md">
      {data?.user?.credits} / 5 Free Generations
      <Progress
        value={data?.user.credits ? (data.user.credits / 5) * 100 : 0}
        color={"blue"}
      />
      <Button
        onClick={handleSubscribe}
        className="mt-2 bg-gradient-to-tr from-slate-600 to-sky-600 font-bold text-zinc-200 transition hover:from-sky-600 hover:to-slate-600"
      >
        <Zap className="mr-2" />
        Upgrade to Premium
      </Button>
    </div>
  );
}

export default SubscriptionAction;
