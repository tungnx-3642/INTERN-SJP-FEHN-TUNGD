import type { Metadata } from "next";
import "../globals.css";
import { AuthProvider } from "@/context";
import { ThemeProvider } from "@/components/theme-provider";
import CustomSessionProvider from "../provider/CustomSessionProvider";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";

export const metadata: Metadata = {
  title: {
    default: "Wine horse",
    template: "%s | Wine horse",
  },
  description: "Discover and explore the world of fine wines with Wine horse.",
};

export function generateStaticParams() {
  return [{locale: 'en'}, {locale: 'vi'}];
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <CustomSessionProvider>
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <body>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </body>
          </NextIntlClientProvider>
        </AuthProvider>
      </CustomSessionProvider>
    </html>
  );
}
