"use client";

import axios from "axios";
import { useState } from "react";
import { Button } from "./ui/button";

interface SubscriptionButtonProps {
  subscribedUser: boolean;
}

function SubscriptionButton({ subscribedUser }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubscribe = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      console.log("billing error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button className="mt-4" disabled={isLoading} onClick={handleSubscribe}>
      {subscribedUser ? "Manage Subscription" : "Upgrade"}
    </Button>
  );
}

export default SubscriptionButton;
