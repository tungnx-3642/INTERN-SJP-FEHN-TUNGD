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
import { useRouter } from "@/i18n/navigation";
import { routes } from "@/lib/routes";
import { AuthResponse } from "@/api";
import { sendActivateAccMail } from "@/api/email";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";

// i18n-friendly validation schema
const registerSchema = z
  .object({
    name: z.string().min(2, { message: "nameMin" }),
    email: z.string().email({ message: "invalidEmail" }),
    password: z.string().min(6, { message: "passwordMin" }),
    confirmPassword: z.string().min(6, { message: "confirmPasswordMin" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "passwordMismatch",
  });

type RegisterSchema = z.infer<typeof registerSchema>;

function RegisterForm() {
  const t = useTranslations("RegisterForm");
  const router = useRouter();

  const { mutate: register } = useRegister({
    onSuccess: async (res: AuthResponse) => {
      toast.success(t("registerSuccess"));
      router.push(routes.home);
      sendActivateAccMail(res.user.email);
    },
    onError: (err) => {
      toast.error(t("registerFailed"), {
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
    { name: "name", label: t("nameLabel"), placeholder: t("namePlaceholder") },
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
    {
      name: "confirmPassword",
      label: t("confirmPasswordLabel"),
      placeholder: t("confirmPasswordPlaceholder"),
      type: "password",
    },
  ];

  const onSubmit = async (values: RegisterSchema) => {
    register({
      name: values.name,
      email: values.email,
      password: values.password,
    });

    await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Card className="w-full mx-auto shadow-none rounded-none">
      <CardHeader>
        <CardTitle className="text-xl font-thin uppercase">
          {t("accountInfo")}
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
                render={({ field }) => {
                  const errorMessageKey = form.formState.errors[name]?.message as string | undefined;
                  return (
                    <FormItem>
                      <FormLabel>{label}</FormLabel>
                      <FormControl>
                        <Input
                          type={type}
                          placeholder={placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                         {errorMessageKey ? t(errorMessageKey) : null}
                      </FormMessage>
                    </FormItem>
                  );
                }}
              />
            ))}
            <Button type="submit" className="rounded-none">
              {t("registerButton")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default RegisterForm;
