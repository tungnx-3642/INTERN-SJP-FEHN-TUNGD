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

const formSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự" }),
  message: z.string().min(5, { message: "Nội dung phải có ít nhất 5 ký tự" }),
});

function CommentForm({ blogId }: { blogId: number }) {
  const { mutate: addComment } = useAddComment();
  const queryClient = useQueryClient();

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
      }
    });
  }

  return (
    <div>
      <h1 className="text-xl uppercase my-5">Đóng góp ý kiến</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập tên của bạn" {...field} />
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
                <FormLabel>Nội dung</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Nhập đánh giá của bạn..."
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
            Bình luận
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CommentForm;
