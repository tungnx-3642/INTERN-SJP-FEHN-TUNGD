"use client";

import { signIn } from "next-auth/react";
import { Facebook } from "lucide-react";
import { Button } from "./ui/button";

export default function FacebookSignInButton() {
  return (
    <Button
      onClick={() => signIn("facebook", { callbackUrl: "/" })}
      className="rounded-none h-12 hover:bg-background hover:text-foreground"
    >
      <Facebook />
    </Button>
  );
}
