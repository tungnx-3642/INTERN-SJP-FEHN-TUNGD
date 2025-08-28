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
import { useRegister } from "@/hooks/auth/useRegister";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";
import { useAuth } from "@/context";
import { AuthResponse } from "@/api";

const registerSchema = z
  .object({
    name: z.string().min(2, "Tên phải có ít nhất 2 ký tự"),
    email: z.string().email("Email không hợp lệ"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu nhập lại không khớp",
  });

type RegisterSchema = z.infer<typeof registerSchema>;

function RegisterForm() {
  const router = useRouter();
  const { setAuth } = useAuth();
  const { mutate: register, error } = useRegister({
    onSuccess: (res: AuthResponse) => {
      setAuth(res.user, res.accessToken);
      toast("Đăng ký thành công");
      router.push(routes.home);
    },
    onError: (err) => {
      toast("Đăng ký thất bại", {
        description: err.message,
      });
    },
  });

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const inputFields: Array<{
    name: keyof RegisterSchema;
    label: string;
    placeholder: string;
    type?: string;
  }> = [
    {
      name: "name",
      label: "Họ và tên",
      placeholder: "Nhập họ và tên",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "Nhập email",
      type: "email",
    },
    {
      name: "password",
      label: "Mật khẩu",
      placeholder: "Nhập mật khẩu",
      type: "password",
    },
    {
      name: "confirmPassword",
      label: "Nhập lại mật khẩu",
      placeholder: "Nhập lại mật khẩu",
      type: "password",
    },
  ];

  const onSubmit = (values: RegisterSchema) => {
    register({
      name: values.name,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Card className="w-full mx-auto shadow-none rounded-none">
      <CardHeader>
        <CardTitle className="text-xl font-thin uppercase">
          Thông tin tài khoản
        </CardTitle>
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

            <Button type="submit" className="rounded-none">
              Đăng ký
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
