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
import { useRouter } from "@/i18n/navigation";
import { toast } from "sonner";
import { routes } from "@/lib/routes";
import Cookies from "js-cookie";
import { signIn } from "next-auth/react";
import { useTransition } from "react";
import { useTranslations } from "next-intl";

const loginSchema = z.object({
  email: z
    .string()
    .email({ message: "invalidEmail" })
    .refine(() => true, { message: "invalidEmail" }),
  password: z
    .string()
    .min(6, { message: "minPassword" })
    .refine(() => true, { message: "minPassword" }),
});
type LoginSchema = z.infer<typeof loginSchema>;

function LoginForm() {
  const t = useTranslations("LoginForm");
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
    {
      name: "email",
      label: t("emailLabel"),
      placeholder: t("emailPlaceholder"),
      type: "email",
    },
    {
      name: "password",
      label: t("passwordLabel"),
      placeholder: t("passwordPlaceholder"),
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
        toast.error(t("loginFailed"), { description: res.error });
      } else {
        toast.success(t("loginSuccess"));
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
        <CardTitle className="text-xl font-thin uppercase">
          {t("loginTitle")}
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
                    <FormMessage>
                      {form.formState.errors[name]?.message &&
                        t(form.formState.errors[name]?.message as string)}
                    </FormMessage>
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="rounded-none" disabled={isPending}>
              {isPending ? t("loggingIn") : t("loginButton")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default LoginForm;
