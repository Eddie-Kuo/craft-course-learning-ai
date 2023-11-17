import { Progress } from "@/components/ui/progress";
import { Zap } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "./ui/button";

interface SubscriptionActionProps {}

function SubscriptionAction({}: SubscriptionActionProps) {
  const { data } = useSession();

  return (
    <div>
      {data?.user?.credits} / 5 Free Generations
      <Progress
        value={data?.user.credits ? (data.user.credits / 5) * 100 : 0}
      />
      <Button>
        <Zap className="mr-2 " />
        Upgrade to Premium
      </Button>
    </div>
  );
}

export default SubscriptionAction;
