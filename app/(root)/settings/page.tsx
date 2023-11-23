import SubscriptionButton from "@/components/SubscriptionButton";
import { checkSubscription } from "@/lib/subscription";

interface pageProps {}

async function SettingsPage({}: pageProps) {
  const subscribedUser = await checkSubscription();

  return (
    <div className="mx-auto max-w-5xl pt-40">
      <h1 className="text-3xl font-bold">Settings</h1>
      {subscribedUser ? (
        <p className="py-2 text-xl text-secondary-foreground/60">
          You are a Pro user
        </p>
      ) : (
        <p className="py-2 text-xl text-secondary-foreground/60">
          You are currently a Free user
        </p>
      )}

      <SubscriptionButton subscribedUser={subscribedUser} />
    </div>
  );
}

export default SettingsPage;
