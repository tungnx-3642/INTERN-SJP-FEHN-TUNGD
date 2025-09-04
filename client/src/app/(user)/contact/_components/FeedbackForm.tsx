"use client";

import * as React from "react";
import { useState } from "react";
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

// Zod schema for validation
const FeedbackSchema = z.object({
  name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
  email: z.string().email("Email không hợp lệ"),
  subject: z.string().min(3, "Chủ đề phải có ít nhất 3 ký tự"),
  message: z.string().min(10, "Nội dung phải có ít nhất 10 ký tự"),
});

export type FeedbackValues = z.infer<typeof FeedbackSchema>;

export default function FeedbackForm({
  onSubmit,
}: {
  onSubmit?: (values: FeedbackValues) => Promise<void> | void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function handleSubmit(values: FeedbackValues) {
  }

  return (
    <Card className="mt-5 w-full max-w-3xl shadow-none border-none">
      <CardHeader className="px-0">
        <CardTitle className="text-2xl">Góp ý / Feedback</CardTitle>
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
                <FormItem className="flex items-start">
                  <FormLabel className="w-24">Tên</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Nhập tên của bạn..."
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
                <FormItem className="flex items-start">
                  <FormLabel className="w-24">Email</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Nhập email..."
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
                <FormItem className="flex items-start">
                  <FormLabel className="w-24">Chủ đề</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Input
                        placeholder="Về trải nghiệm mua hàng..."
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
              name="message"
              render={({ field }) => (
                <FormItem className="flex items-start">
                  <FormLabel className="w-24">Nội dung</FormLabel>
                  <div className="flex-1">
                    <FormControl>
                      <Textarea 
                        placeholder="Mô tả chi tiết góp ý của bạn..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <div className="pt-2 ml-26">
              <Button type="submit" disabled={isSubmitting}>
                <Send className="mr-2 h-4 w-4" />
                {isSubmitting ? "Đang gửi..." : "Gửi góp ý"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
