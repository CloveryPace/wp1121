"use client";

// TODO: 4. Call the signOut() function when the button is clicked
// hint: You may want to change the first line of this file
import { useEffect } from "react";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import { Button } from "@/components/ui/button";
import { publicEnv } from "@/lib/env/public";

export default function SignOutButton() {
  const { data: session } = useSession();
  // const router = useRouter();

  const handleSignOut = async () => {
    if (session) {
      signOut({ callbackUrl: publicEnv.NEXT_PUBLIC_BASE_URL });
    }
    // router.push("/");
  };
  return (
    <Button
      data-testid="sign-out-button"
      variant={"outline"}
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
}
// TODO: 4. end
