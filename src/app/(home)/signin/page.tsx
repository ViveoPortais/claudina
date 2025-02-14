"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import useSession from "@/hooks/useSession";
import api from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { InputOTPDemo } from "@/components/custom/Input-OTP";
import { changePasswordVerify, login, loginOneStep } from "@/services/auth";
import { BsChatLeftText } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoChatbubbleEllipsesSharp } from "react-icons/io5";
import { set } from "date-fns";
import { Loading } from "@/components/custom/Loading";
import { ILoginDataOneStep } from "@/types";

const signInValidationSchema = z.object({
  email: z.string().min(1, { message: "Insira seu email" }).email({
    message: "Insira um email válido",
  }),
  password: z
    .string()
    .min(3, { message: "A senha deve conter pelo menos 3 caracteres" }),
  tokenBySms: z.boolean().optional(),
  tokenByEmail: z.boolean().optional(),
  token: z.string().optional(),
});

type SignInValidationProps = z.infer<typeof signInValidationSchema>;

export default function SignIn() {
  const router = useRouter();
  const auth = useSession();
  const [twoFa, setTwoFa] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmailCode] = useState(false);
  const [sms, setSms] = useState(false);
  const [code, setCodeToken] = useState("");
  const [selectedOption, setSelectedOption] = useState<"email" | "sms" | null>(
    null
  );
  const [timeLeft, setTimeLeft] = useState(5);
  const [data, setData] = useState({
    Email: "",
    Password: "",
    HealthProgramCode: "985",
  });

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
    const normalizedRole = role
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    if (normalizedRole.includes("doctor")) {
      return "doctor";
    }
    if (normalizedRole.includes("laboratory")) {
      return "laboratory";
    }
    if (normalizedRole.includes("professional")) {
      return "professional";
    }
    if (normalizedRole.includes("oncoclinica")) {
      return "oncoclinica";
    }

    return "treatment";
  }

  const handleTwoFactorAuth = (data: SignInValidationProps) => {
    const { email, password } = data;
    setData({ Email: email, Password: password, HealthProgramCode: "985" });
    changePasswordVerify(data).then((res) => {
      if (res.senhaFracaAlterada) {
        handleLoginOneFactore(data);
      } else {
        setTwoFa(true);
      }
    });
  };

  const handleSendCode = async (data: SignInValidationProps) => {
    try {
      const response = await login({
        ...data,
        tokenBySms: sms,
        tokenByEmail: email,
        token: code || "",
      });
      setCodeSent(true);
      toast.success(response.token);
    } catch (err: any) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  async function handleLoginOneFactore(data: SignInValidationProps) {
    setIsLoading(true);
    try {
      const { email, password } = data;
      setData({ Email: email, Password: password, HealthProgramCode: "985" });
      const response = await loginOneStep(data as any);

      const role = handleUserRole(response.role);
      auth.setName(response.name);
      auth.setUserNameLab(response.userName);
      auth.setEmail(response.userName);
      auth.setToken(response.token);
      api.defaults.headers.Authorization = `Bearer ${response.token}`;
      auth.setRole(role);
      auth.setSession(dayjs().format("YYYY-MM-DD HH:mm:ss"));
      auth.onLogin();
      router.push(`/dashboard/${role}`);
      toast.success("Login efetuado com sucesso");
    } catch (err: any) {
      toast.error(err.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLoginTwoFactore(data: SignInValidationProps) {
    setIsLoading(true);
    try {
      const response = await login({
        ...data,
        tokenBySms: sms,
        tokenByEmail: email,
        token: code || "",
      });

      const role = handleUserRole(response.role);
      auth.setName(response.name);
      auth.setUserNameLab(response.userName);
      auth.setEmail(response.userName);
      auth.setToken(response.token);
      api.defaults.headers.Authorization = `Bearer ${response.token}`;
      auth.setRole(role);
      auth.setSession(dayjs().format("YYYY-MM-DD HH:mm:ss"));
      auth.onLogin();
      router.push(`/dashboard/${role}`);
      toast.success("Login efetuado com sucesso");
    } catch (err: any) {
      toast.error(err.response.data);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (codeSent && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [codeSent, timeLeft]);

  const handleResendCode = () => {
    setCodeSent(false);
    setTimeLeft(5);
    setCodeToken("");
  };

  return (
    <div className="flex flex-col gap-4 w-full items-center px-1">
      <form
        className="flex flex-col  gap-3 w-full h-full"
        onSubmit={handleSubmit(handleTwoFactorAuth)}
      >
        {twoFa === true ? (
          <>
            {codeSent === false ? (
              <>
                <div className="flex flex-col gap-2">
                  <span className="text-xl text-main-orange">
                    Acesse sua conta
                  </span>
                  <span className="text-sm text-gray-700 ">
                    Escolha como deseja obter seu código de acesso:
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    className={`flex gap-4 items-center w-full p-5 border rounded-md cursor-pointer shadow-md ${
                      selectedOption === "email"
                        ? "border-blue-500"
                        : "border-gray-300"
                    } hover:border-blue-500`}
                  >
                    <input
                      type="radio"
                      name="codeDelivery"
                      onChange={() => {
                        setSelectedOption("email");
                        setEmailCode(true);
                        setSms(false);
                      }}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full border border-main-orange flex items-center justify-center">
                      <MdEmail size={24} className="text-main-orange" />
                    </div>
                    <span className="text-gray-700">
                      Enviar código por E-mail
                    </span>
                  </label>
                  <label
                    className={`flex gap-4 items-center w-full p-5 border rounded-md cursor-pointer shadow-md ${
                      selectedOption === "sms"
                        ? "border-blue-500"
                        : "border-gray-300"
                    } hover:border-blue-500`}
                  >
                    <input
                      type="radio"
                      name="codeDelivery"
                      onChange={() => {
                        setSelectedOption("sms");
                        setEmailCode(false);
                        setSms(true);
                      }}
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-full border border-main-orange flex items-center justify-center">
                      <IoChatbubbleEllipsesSharp
                        size={22}
                        className="text-main-orange"
                      />
                    </div>
                    <span className="text-gray-700">Enviar código por SMS</span>
                  </label>
                </div>
              </>
            ) : (
              <>
                <span className="text-base text-main-orange">
                  Insira o código de autenticação enviado:
                </span>
                <div className="w-full">
                  <InputOTPDemo
                    onChange={(value) => {
                      if (value.length <= 6) {
                        setCodeToken(value);
                      }
                    }}
                  />
                </div>

                {codeSent && timeLeft > 0 && (
                  <span className="text-sm font-semibold text-viveo-primary mt-2">
                    Se você não recebeu o código, aguarde {timeLeft} segundos
                  </span>
                )}

                {codeSent && timeLeft === 0 && (
                  <Link
                    href="#"
                    onClick={handleResendCode}
                    className="text-sm text-viveo-primary mt-2 underline"
                  >
                    Reenviar código
                  </Link>
                )}
              </>
            )}
            {!codeSent && (
              <Button
                size="lg"
                className="w-full mt-4"
                type="submit"
                onClick={() => {
                  handleSubmit(handleSendCode)();
                }}
                disabled={codeSent || !selectedOption}
              >
                {isLoading ? <Loading /> : "Enviar código"}
              </Button>
            )}

            {codeSent && (
              <Button
                size="lg"
                className="w-full mt-4"
                type="submit"
                onClick={() => {
                  handleSubmit(handleLoginTwoFactore)();
                }}
                disabled={code.length < 4 || isLoading}
              >
                {isLoading ? <Loading /> : "Acessar"}
              </Button>
            )}
          </>
        ) : (
          <>
            <div className="mb-4 lg:mb-0 xl:mb-4 flex items-center">
              <h1 className=" text-lg md:text-xl lg:text-[12px] xl:text-base mr-2 text-main-orange">
                Acesse com seu e-mail e senha abaixo:
              </h1>
            </div>
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
              className="text-sm lg:text-[10px] xl:text-xs self-end underline cursor-pointer"
              onClick={handleForgetPassword}
            >
              Esqueci minha senha
            </span>
            <Button size={`lg`} className={`w-full mt-4`} type="submit">
              Entrar
            </Button>
          </>
        )}
      </form>

      <Link href="/" className="w-full">
        <Button size={`lg`} variant={`tertiary`} className="w-full">
          Voltar
        </Button>
      </Link>
    </div>
  );
}
