import { Metadata } from "next";
import { DynamicBreadcrumb } from "../_components/DynamicBreadcrumb";
import Image from "next/image";
import { routes } from "@/lib/routes";
import MapSection from "./_components/MapSection";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Twitch,
  Instagram,
} from "lucide-react";
import FeedbackForm from "./_components/FeedbackForm";

export const metadata: Metadata = {
  title: "Liên hệ",
};

function ContactPage() {
  const breadcrumbItems = [
    { label: "Trang chủ", href: routes.home },
    { label: "Liên hệ", href: routes.contact },
  ];
  return (
    <div className="max-md:p-4 max-w-7xl mx-auto my-10">
      <DynamicBreadcrumb items={breadcrumbItems} />
      <div className="flex justify-between mt-5">
        <div>
          <h1 className="text-2xl uppercase">Liên hệ</h1>
          <Image
            src="/titleleft-dark.png"
            alt="title-left"
            width={600}
            height={100}
            className="w-20 h-1.5 mt-4 mb-6"
          />
        </div>
      </div>
      <div className="flex max-md:flex-col gap-5">
        <div className="w-full lg:w-2/3">
          <MapSection />
        </div>
        <div className="flex flex-col">
          <div className="text-gray-500 text-sm mb-7">
            <Image
              src="/logo-removebg.png"
              alt="logo"
              height={300}
              width={300}
              className="w-40 h-40"
            />
            <p className="flex items-center gap-3">
              <MapPin />
              123 Đường ABC, Quận 1, TP.HCM
            </p>
            <p className="flex items-center gap-3">
              <Phone />
              (04) 6674 2332
            </p>
            <p className="flex items-center gap-3">
              <Mail />
              support@milano.com
            </p>
          </div>
          <div className="text-gray-500">
            <h3 className="text-lg uppercase">Follow US:</h3>
            <div className="flex gap-3">
              <Facebook />
              <Linkedin />
              <Twitch />
              <Instagram />
            </div>
          </div>
        </div>
      </div>
      <FeedbackForm />
    </div>
  );
}

export default ContactPage;
