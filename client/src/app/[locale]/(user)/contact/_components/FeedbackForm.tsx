"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export default function FeedbackForm() {
  const t = useTranslations("ContactPage");

  // Zod schema for validation with translations
  const FeedbackSchema = z.object({
    name: z.string().min(2, t("validation.nameMin")),
    email: z.string().email(t("validation.emailInvalid")),
    subject: z.string().min(3, t("validation.subjectMin")),
    message: z.string().min(10, t("validation.messageMin")),
  });

  type FeedbackValues = z.infer<typeof FeedbackSchema>;
  const form = useForm<FeedbackValues>({
    resolver: zodResolver(FeedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    mode: "onBlur",
  });

  async function handleSubmit() {
    form.reset();
    toast.success(t("submitSuccess"));
  }

  return (
    <Card className="mt-5 w-full max-w-3xl shadow-none border-none bg-transparent">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl">{t("feedbackTitle")}</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <Form {...form}>
          <form
            className="space-y-4"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex items-start max-md:flex-col">
                  <FormLabel className="w-24">{t("name")}</FormLabel>
                  <div className="flex-1 w-full">
                    <FormControl>
                      <Input
                        placeholder={t("namePlaceholder")}
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex items-start max-md:flex-col">
                  <FormLabel className="w-24">{t("email")}</FormLabel>
                  <div className="flex-1 w-full">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("emailPlaceholder")}
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="flex items-start max-md:flex-col">
                  <FormLabel className="w-24">{t("subject")}</FormLabel>
                  <div className="flex-1 w-full">
                    <FormControl>
                      <Input placeholder={t("subjectPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="flex items-start max-md:flex-col">
                  <FormLabel className="w-24">{t("message")}</FormLabel>
                  <div className="flex-1 w-full">
                    <FormControl>
                      <Textarea
                        placeholder={t("messagePlaceholder")}
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="pt-2 lg:ml-26">
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                {t("submitButton")}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
