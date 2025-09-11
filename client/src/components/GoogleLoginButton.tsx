"use client";

import { signIn } from "next-auth/react";
import { Chrome } from "lucide-react";
import { Button } from "./ui/button";

export default function GoogleSignInButton() {
  return (
    <Button
      className="rounded-none h-12 hover:bg-background hover:text-foreground"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      <Chrome />
    </Button>
  );
}
