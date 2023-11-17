import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

interface SubscriptionActionProps {}

function SubscriptionAction({}: SubscriptionActionProps) {
  const { data } = useSession();

  return (
    <div className="mx-auto mt-4 flex w-1/2 flex-col items-center gap-2 rounded-md">
      {data?.user?.credits} / 5 Free Generations
      <Progress
        value={data?.user.credits ? (data.user.credits / 5) * 100 : 0}
        color={"blue"}
      />
      <Button className="mt-2 bg-gradient-to-tr from-slate-600 to-sky-600 font-bold text-zinc-200 transition hover:from-sky-600 hover:to-slate-600">
        <Zap className="mr-2" />
        Upgrade to Premium
      </Button>
    </div>
  );
}

export default SubscriptionAction;
