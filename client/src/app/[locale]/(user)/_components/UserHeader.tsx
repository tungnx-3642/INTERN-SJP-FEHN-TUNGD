"use client";
import { Link } from "@/i18n/navigation";
import SearchForm from "./SearchForm";
import Image from "next/image";
import DropDownMenu from "./DropDownMenu";
import { Menu, ChevronsDown, ChevronsUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { useAuth, useCart } from "@/context";
import ModeToggle from "@/components/ModeToggle";
import { useTranslations } from "next-intl";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { NotificationsList } from "@/components/NotificationsList";

function UserHeader() {
  const t = useTranslations("Header");
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const [bottomMenuOpen, setBottomMenuOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const loggedInAccountMenu = [
    { label: t("account.info"), href: routes.addresses },
    { label: t("account.orders"), href: routes.orders.list },
    { label: t("account.favorites"), href: routes.favorites },
  ];
  const loggedOutAccountMenu = [
    { label: t("account.login"), href: routes.auth.login },
    { label: t("account.register"), href: routes.auth.register },
  ];

  const mainMenu = [
    { label: t("menu.home"), href: routes.home },
    {
      label: t("menu.products"),
      href: routes.products.list,
      hasDropdown: true,
    },
    { label: t("menu.info"), href: routes.infor },
    { label: t("menu.blog"), href: routes.blogs.list },
    { label: t("menu.contact"), href: routes.contact },
  ];

  const accountMenu = isAuthenticated
    ? loggedInAccountMenu
    : loggedOutAccountMenu;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md">
      <div className="flex justify-between max-w-7xl mx-auto items-center px-5 py-2">
        <ul className="hidden md:flex space-x-3">
          <li className="flex items-center hover:underline relative">
            <Link href={routes.cart}>{t("cart")}</Link>
            <span
              className="
            absolute -top-1 -right-2
            bg-red-500 text-white text-xs font-bold
            rounded-full h-4 w-4 flex items-center justify-center
            shadow
          "
            >
              {cart.items.length}
            </span>
          </li>
          {accountMenu.map((item) => (
            <li key={item.label} className="flex items-center hover:underline">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          {isAuthenticated && (
            <li className="flex items-center">
              <button onClick={logout} className="hover:underline">
                {t("logout")}
              </button>
            </li>
          )}
        </ul>

        <Button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </Button>
        <div className="hidden flex-1 md:flex justify-end gap-2">
          {isAuthenticated && (
            <NotificationsList />
          )}
          <SearchForm />
          <ModeToggle />
          <LanguageSwitcher />
        </div>
      </div>

      {menuOpen && (
        <ul className="md:hidden flex flex-col space-y-2 px-5 py-2 bg-background">
          <li className="flex items-center hover:underline">
            <Link href={routes.cart}>{t("cart")}</Link>
          </li>
          {accountMenu.map((item) => (
            <li key={item.label} className="hover:underline">
              <Link href={item.href}>{item.label}</Link>
            </li>
          ))}
          {isAuthenticated && (
            <li>
              <button onClick={logout} className="hover:underline">
                {t("logout")}
              </button>
            </li>
          )}
          <li className="flex gap-2">
            <SearchForm />
            <ModeToggle />
            <LanguageSwitcher />
          </li>
        </ul>
      )}
      <div className="bg-black text-white uppercase text-lg">
        <div className="flex flex-col max-md:pb-2 md:flex-row items-center justify-center mx-auto h-auto lg:h-32 max-w-7xl">
          <Image src="/logo-removebg.png" alt="Logo" width={150} height={150} className="max-md:h-20 max-md:w-20" />
          <ul className="max-md:hidden h-full flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-8 ml-0 md:ml-8 w-full md:w-auto mt-4 md:mt-0">
            {mainMenu.map((item) => (
              <li
                key={item.label}
                className="flex items-center group relative hover:text-yellow-600"
              >
                <Link href={item.href}>{item.label}</Link>
                {item.hasDropdown && <DropDownMenu />}
              </li>
            ))}
          </ul>

          {bottomMenuOpen && (
            <ul className="flex flex-col px-2 md:flex-row space-y-2 md:space-y-0 md:space-x-8 ml-0 md:ml-8 w-full md:w-auto mt-4 md:mt-0">
              {mainMenu.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center hover:text-yellow-600"
                >
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          )}

          <button className="lg:hidden mx-auto">
            {bottomMenuOpen ? (
              <ChevronsUp
                className="md:hidden cursor-pointer"
                onClick={() => setBottomMenuOpen(false)}
              />
            ) : (
              <ChevronsDown
                className="md:hidden cursor-pointer"
                onClick={() => setBottomMenuOpen(true)}
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserHeader;
