import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Linkedin,
  Facebook,
  Twitter,
  Instagram,
  Wifi,
  MapPin,
  PhoneCall,
  Mail,
} from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

const socialIcons = [Facebook, Twitter, Instagram, Linkedin, Wifi];

function UserFooter() {
  const t = useTranslations("UserFooter");

  const infoLinks = [
    t("aboutUs"),
    t("delivery"),
    t("reviews"),
    t("storage"),
    t("privacyPolicy"),
  ];
  const buyLinks = [
    t("shippingReturns"),
    t("safeShopping"),
    t("internationalShipping"),
    t("affiliate"),
    t("discountService"),
  ];

  return (
    <div>
      <div className="max-w-6xl bg-white flex mx-auto mb-10">
        {[1, 2, 3].map((i) => (
          <div className="w-1/3" key={i}>
            <Image
              src={`/logo/logo-${i}.jpg`}
              alt={`logo-${i}`}
              width={200}
              height={100}
              className="block object-cover mx-auto w-1/2"
            />
          </div>
        ))}
      </div>
      <div className="flex max-sm:flex-col flex-wrap max-w-7xl max-lg:mx-5 mx-auto">
        <div className="w-full md:w-1/2 lg:w-1/5 uppercase mb-5">
          <h1 className="text-xl mb-4">{t("information")}</h1>
          <ul className="text-gray-500 flex flex-col gap-1">
            {infoLinks.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/5 uppercase mb-5">
          <h1 className="text-xl mb-4">{t("shopping")}</h1>
          <ul className="text-gray-500 flex flex-col gap-1">
            {buyLinks.map((l) => (
              <li key={l}>{l}</li>
            ))}
          </ul>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/4 mb-5">
          <h1 className="uppercase text-xl mb-4">{t("emailUs")}</h1>
          <p className="text-sm text-gray-500 mb-4">
            {t("emailDescription")}
          </p>
          <div className="flex">
            <Input
              className="border border-foreground px-2 w-60 text-sm rounded-r-none placeholder:italic"
              type="email"
                placeholder={t("enterEmail")}
            />
            <Button className="bg-foreground rounded-l-none text-background px-2">
              {t("send")}
            </Button>
          </div>
          <div className="flex gap-4 mt-4 mb-5">
            {socialIcons.map((Icon, i) => (
              <Icon
                key={i}
                className="text-gray-500 text-xs cursor-pointer hover:text-yellow-400"
              />
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 text-sm flex flex-col gap-2">
          <h1 className="uppercase text-xl mb-4">{t("contact")}</h1>
          <div>
            <MapPin className="inline-block mr-2 mb-1" />
            <span className="text-gray-500">123 Đường ABC, Quận 1, TP.HCM</span>
          </div>
          <div className="flex gap-1">
            <PhoneCall className="inline-block mr-2 mb-1" />
            <span className="text-gray-500">+84 123 456 789</span>
            <span className="text-gray-500">-</span>
            <PhoneCall className="inline-block mr-2 mb-1" />
            <span className="text-gray-500">+84 123 456 789</span>
          </div>
          <div className="flex gap-1">
            <PhoneCall className="inline-block mr-2 mb-1" />
            <span className="text-gray-500">+84 123 456 789</span>
            <span className="text-gray-500">-</span>
            <Mail className="inline-block mr-2 mb-1" />
            <span className="text-yellow-500">support@webiz.com</span>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-500 mt-10 py-4 text-sm text-gray-500 text-center">
        <div className="max-w-7xl mx-auto">
          © 2024 Webiz. All Rights Reserved. Designed by Sun-asterisk
        </div>
      </div>
    </div>
  );
}

export default UserFooter;
