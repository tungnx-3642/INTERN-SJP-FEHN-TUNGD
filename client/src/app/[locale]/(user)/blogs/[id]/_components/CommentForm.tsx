"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddComment } from "@/hooks";
import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

function CommentForm({ blogId }: { blogId: number }) {
  const { mutate: addComment } = useAddComment();
  const queryClient = useQueryClient();
  const t = useTranslations("CommentForm");

  const formSchema = z.object({
    name: z.string().min(2, { message: t("validation.nameRequired") }),
    message: z.string().min(5, { message: t("validation.contentRequired") }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const commentData = {
      name: values.name,
      message: values.message,
      blogId: blogId,
      createdAt: new Date().toISOString(),
    };

    addComment(commentData, {
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries({ queryKey: ["blog"] });
      },
    });
  }

  return (
    <div>
      <h1 className="text-xl uppercase my-5">{t("addComment")}</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("name")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("namePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("content")}</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder={t("contentPlaceholder")}
                    className="resize-none"
                    rows={4}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="rounded-none">
            {t("submitComment")}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CommentForm;
