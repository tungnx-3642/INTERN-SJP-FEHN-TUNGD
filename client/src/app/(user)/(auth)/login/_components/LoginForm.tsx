"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { routes } from "@/lib/routes";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
import { useTransition } from "react";

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

type LoginSchema = z.infer<typeof loginSchema>;

function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const inputFields: Array<{
    name: keyof LoginSchema;
    label: string;
    placeholder: string;
    type?: string;
  }> = [
    { name: "email", label: "Email", placeholder: "Nhập email", type: "email" },
    {
      name: "password",
      label: "Mật khẩu",
      placeholder: "Nhập mật khẩu",
      type: "password",
    },
  ];

  const onSubmit = async (values: LoginSchema) => {
    startTransition(async () => {
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password,
      });

      if (res?.error) {
        toast.error("Đăng nhập thất bại", { description: res.error });
      } else {
        toast.success("Đăng nhập thành công");
        const redirectPath = Cookies.get("redirect");
        if (redirectPath) {
          Cookies.remove("redirect");
          router.push(redirectPath);
        } else {
          router.push(routes.home);
        }
      }
    });
  };

  return (
    <Card className="w-full mx-auto shadow-none rounded-none">
      <CardHeader>
        <CardTitle className="text-xl font-thin uppercase">Đăng nhập</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {inputFields.map(({ name, label, placeholder, type }) => (
              <FormField
                key={name}
                control={form.control}
                name={name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                      <Input type={type} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="rounded-none" disabled={isPending}>
              {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
