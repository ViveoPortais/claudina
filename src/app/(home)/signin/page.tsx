"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { toast } from "react-toastify";
import dayjs from "dayjs";
import { CgSpinner } from "react-icons/cg";

import useSession from "@/hooks/useSession";
import { login } from "@/services/auth";
import api from "@/services/api";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const signInValidationSchema = z.object({
  email: z.string().min(1, { message: "Insira seu email" }).email({
    message: "Insira um email válido",
  }),
  password: z
    .string()
    .min(3, { message: "A senha deve conter pelo menos 3 caracteres" }),
});

type SignInValidationProps = z.infer<typeof signInValidationSchema>;

export default function SignIn() {
  const router = useRouter();
  const auth = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValidationProps>({
    resolver: zodResolver(signInValidationSchema),
  });

  const handleForgetPassword = () => {
    router.push("/forget/password");
  };

  function handleUserRole(role: string) {
    if (role.toLowerCase().includes("doctor")) {
      return "doctor";
    }
    if (role.toLowerCase().includes("laboratory")) {
      return "laboratory";
    }
    if (role.toLowerCase().includes("professional")) {
      return "profissional";
    }

    return "treatment";
  }

  async function handleLogin(data: SignInValidationProps) {
    setIsLoading(true);

    try {
      const response = await login(data);
      const role = handleUserRole(response.role);
      auth.setName(response.userName);
      auth.setEmail(response.email);
      auth.setToken(response.token);
      api.defaults.headers.Authorization = `Bearer ${response.token}`;
      auth.setRole(role);
      console.log(auth.role);
      auth.setSession(dayjs().format("YYYY-MM-DD HH:mm:ss"));
      auth.onLogin();
      router.push(`/dashboard/${role}`);
    } catch (err) {
      toast.error("Email ou senha incorretos");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <div className="mb-4 flex items-center">
        <h1 className=" text-lg md:text-xl mr-2 text-main-orange">
          Acesse com seu e-mail e senha abaixo:
        </h1>
      </div>

      <form
        className="flex flex-col items-center gap-3 w-full h-full"
        onSubmit={handleSubmit(handleLogin)}
      >
        <div className="w-full">
          <Input
            type="text"
            icon="email"
            placeholder="E-mail"
            className="w-full"
            {...register("email", { required: true })}
            maxLength={100}
          />
          {errors.email && (
            <span className="w-full text-xs text-red-400 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <div className="w-full">
          <Input
            type="password"
            icon="password"
            placeholder="Senha"
            className="w-full"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="w-full text-xs text-red-400 mt-1">
              {errors.password.message}
            </span>
          )}
        </div>

        <span
          className="text-xs self-end underline cursor-pointer"
          onClick={handleForgetPassword}
        >
          Esqueci minha senha
        </span>

        <Button
          size={`lg`}
          className={`w-full mt-4 ${isLoading && "bg-zinc-500"}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <CgSpinner size={20} className="text-white animate-spin" />
          ) : (
            "Acessar"
          )}
        </Button>
      </form>

      <Link href="/login" className="w-full">
        <Button size={`lg`} variant={`tertiary`} className="w-full">
          Voltar
        </Button>
      </Link>
    </div>
  );
}
