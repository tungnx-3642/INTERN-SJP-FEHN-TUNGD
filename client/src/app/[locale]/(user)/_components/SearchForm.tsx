"use client";
import { Search } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
function SearchForm() {
  const t = useTranslations("Header");
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/products?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        id="search"
        name="search"
        value={query}
        placeholder={t("search-placeholder")}
        onChange={(e) => setQuery(e.target.value)}
        className="pr-8 bg-slate-100 rounded-lg pl-4 py-2 lg:pr-12 focus:outline-none focus:ring-2"
      />
      <Button
        variant="ghost"
        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-transparent"
        onClick={handleSearch}
      >
        <Search />
      </Button>
    </div>
  );
}

export default SearchForm;
