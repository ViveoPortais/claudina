"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import { CgSpinner } from "react-icons/cg";
import { forgetPassword, login } from "@/services/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const signInValidationSchema = z.object({
  email: z.string().min(1, { message: "Insira seu email" }).email({
    message: "Insira um email válido",
  }),
});

type SignInValidationProps = z.infer<typeof signInValidationSchema>;

export default function ForgetPassword() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignInValidationProps>({
    resolver: zodResolver(signInValidationSchema),
  });

  async function handleForgetPassword(data: SignInValidationProps) {
    setIsLoading(true);

    try {
      const response = await forgetPassword(data as any);
      if (response.isValidData) {
        setIsLoading(false);
        toast.success("Senha enviada com sucesso");
        router.push("/signin");
      }
      if (!response.isValidData) {
        setIsLoading(false);
        toast.error("Erro ao recuperar senha");
      }
    } catch (err) {
      toast.error("Erro ao recuperar senha");
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4 w-full items-center">
      <div className="mb-4 flex flex-col">
        <span className="text-lg md:text-xl lg:text-sm xl:text-xl mr-2 text-main-orange">
          Por favor, insira o endereço de e-mail:
        </span>
      </div>

      <form
        className="flex flex-col items-center gap-3 w-full h-full"
        onSubmit={handleSubmit(handleForgetPassword)}
      >
        <div className="w-full">
          <Input
            type="text"
            placeholder="E-mail"
            className="w-full"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="w-full text-xs text-red-400 mt-1">
              {errors.email.message}
            </span>
          )}
        </div>

        <Button
          size={`lg`}
          className={`w-full mt-4 ${isLoading && "bg-zinc-500"}`}
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <CgSpinner size={20} className="text-white animate-spin" />
          ) : (
            "Enviar"
          )}
        </Button>
      </form>

      <Link href="/signin" className="w-full">
        <Button size={`lg`} variant={`tertiary`} className="w-full">
          Voltar
        </Button>
      </Link>
    </div>
  );
}
