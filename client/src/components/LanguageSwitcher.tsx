"use client";

import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useParams } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useTransition } from "react";

const locales = [
  { code: "vi", label: "Tiếng Việt" },
  { code: "en", label: "English" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams();
  const [isPending, startTransition] = useTransition();
  const currentLocale = params.locale as string;

  const handleSwitch = (locale: string) => {
    if (locale === currentLocale) return;

    startTransition(() => {
      const queryString = searchParams.toString();
      router.replace(
        queryString ? `${pathname}?${queryString}` : pathname,
        { locale }
      );
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" disabled={isPending}>
          <Globe />
          {currentLocale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((locale) => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleSwitch(locale.code)}
            className={locale.code === currentLocale ? "font-bold" : ""}
            disabled={isPending}
          >
            {locale.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
