"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { talkwithus } from "@/services/users";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();

  const [navbarOpen, setNavbarOpen] = useState(false);
  const [program, setProgram] = useState("");
  const [hasNameError, setHasNameError] = useState(false);
  const [data, setData] = useState({
    Name: "",
    EmailAddress: "",
    Body: "",
    programCode: "985",
  });

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  const handleProgram = (link: any) => {
    setProgram(link);
  };

  const sendEmail = () => {
    talkwithus(data)
      .then((res) => {
        console.log(data);
        toast.success("E-mail enviado com sucesso!");
        setData({
          Name: "",
          EmailAddress: "",
          Body: "",
          programCode: "985",
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Erro ao enviar e-mail");
      });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    if (name === "Name") {
      if (value.length > 0 && !validateName(value)) {
        if (!hasNameError) {
          toast.error("Nome inválido. Use apenas letras e espaços.");
          setHasNameError(true);
        }
        return;
      } else {
        setHasNameError(false);
      }
    }

    setData({ ...data, [name]: value });
  };

  const validateName = (name: string): boolean => {
    const nameRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return nameRegex.test(name.trim());
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email.trim())) {
      toast.error("E-mail inválido");
      return false;
    }

    return true;
  };

  return (
    <div className="h-full w-full">
      <nav className="bg-white border-gray-200 w-full shadow-xl">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="cursor-pointer" onClick={() => handleProgram("")}>
            <Image
              src="/logo-removebg-preview.png"
              width={200}
              height={150}
              priority
              alt="logo"
            />
          </div>

          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-claudinovaBlue"
            aria-controls="navbar-default"
            aria-expanded={navbarOpen ? "true" : "false"}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`w-full md:block md:w-auto ${
              navbarOpen ? "" : "hidden"
            }`}
            id="navbar-default"
          >
            <ul className="flex flex-col p-4 md:p-0 mt-4 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 bg-gray-300 md:bg-white lg:bg-white xl:bg-white 2xl:bg-white">
              <li>
                <a
                  onClick={() => handleProgram("Programa")}
                  href="#"
                  className="flex gap-2  py-2 px-3 rounded md:p-0 text-main-orange md:text-main-orange lg:text-main-orange xl:text-main-orange 2xl:text-main-orange hover:text-main-blue md:hover:text-main-blue lg:hover:text-main-blue xl:hover:text-main-blue 2xl:hover:text-main-blue transition duration-500 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      // stroke-linejoin="round"
                      strokeWidth="2"
                      d="M20 4H4a2 2 0 00-2 2v16a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      // stroke-linejoin="round"
                      strokeWidth="2"
                      d="M8 2v4m0 0V2a2 2 0 012-2h4a2 2 0 012 2v4m0-4v4m0 0H8m4 0h4m-4 0v4m4 0v4m-4 0H8m0 0h4m4 0a2 2 0 002-2V8a2 2 0 00-2-2m0 0a2 2 0 00-2 2v4"
                    ></path>
                  </svg>
                  Programa
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleProgram("Doença")}
                  href="#"
                  className="flex gap-2  py-2 px-3 rounded md:p-0 text-main-orange md:text-main-orange lg:text-main-orange xl:text-main-orange 2xl:text-main-orange hover:text-main-blue md:hover:text-main-blue lg:hover:text-main-blue xl:hover:text-main-blue 2xl:hover:text-main-blue transition duration-500 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      // stroke-linejoin="round"
                      // stroke-width="2"
                      d="M12 9c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zM20 22h-3v-2a4.992 4.992 0 00-3.5-4.749V13a6.002 6.002 0 00-6-6 6.002 6.002 0 00-6 6v2a4.992 4.992 0 00-3.5 4.749V22H4v-2a6 6 0 0111.46-2.25C13.862 17.176 12.956 17 12 17s-1.862.176-2.46.75A6.002 6.002 0 0118 20v2h-1.5z"
                    ></path>
                  </svg>
                  Doença
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleProgram("Exame")}
                  href="#"
                  className="flex gap-2  py-2 px-3 rounded md:p-0 text-main-orange md:text-main-orange lg:text-main-orange xl:text-main-orange 2xl:text-main-orange hover:text-main-blue md:hover:text-main-blue lg:hover:text-main-blue xl:hover:text-main-blue 2xl:hover:text-main-blue transition duration-500 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      // stroke-linejoin="round"
                      // stroke-width="2"
                      d="M15 15.5l5.5 5.5M9 17C5.686 17 3 14.314 3 11s2.686-6 6-6 6 2.686 6 6-2.686 6-6 6zm0 0V9"
                    ></path>
                    <circle cx="9" cy="9" r="3"></circle>
                  </svg>
                  Exame
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleProgram("Fale Conosco")}
                  href="#"
                  className="flex gap-2  py-2 px-3 rounded md:p-0 text-main-orange md:text-main-orange lg:text-main-orange xl:text-main-orange 2xl:text-main-orange hover:text-main-blue md:hover:text-main-blue lg:hover:text-main-blue xl:hover:text-main-blue 2xl:hover:text-main-blue transition duration-500 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      // stroke-linejoin="round"
                      // stroke-width="2"
                      d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.89 2 1.99 2H20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5M4 8l8 5 8-5"
                    ></path>
                  </svg>
                  Fale Conosco
                </a>
              </li>
              <li>
                <a
                  onClick={() => handleProgram("FAQ")}
                  href="#"
                  className="flex gap-2  py-2 px-3 rounded md:p-0 text-main-orange md:text-main-orange lg:text-main-orange xl:text-main-orange 2xl:text-main-orange hover:text-main-blue md:hover:text-main-blue lg:hover:text-main-blue xl:hover:text-main-blue 2xl:hover:text-main-blue transition duration-500 ease-in-out"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      // stroke-linejoin="round"
                      // stroke-width="2"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      // stroke-linejoin="round"
                      // stroke-width="2"
                      d="M9 17l-4 2m0 0l4-2m-4 2V3"
                    ></path>
                  </svg>
                  FAQ
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {program === "Programa" ? (
        <section className="w-full h-[75vh] px-20 overflow-y-auto">
          <div className="flex flex-col gap-5 mt-5">
            <span className="text-main-orange font-bold">
              O QUE É O PROGRAMA CLAUDINOVA?
            </span>
            <span>
              O programa é uma iniciativa da Astellas e tem como objetivo apoiar
              médicos e pacientes na realização dos testes de Claudina 18.2 para
              pacientes com resultado HER2 negativo. Além disso, o médico pode
              solicitar o teste de HER2 para seus pacientes que não tenham
              realizado esse teste anteriormente.
            </span>
            <span className="text-main-orange font-bold">
              O QUE É O PROGRAMA CLAUDINOVA?
            </span>
            <span>• Pacientes com 18 anos ou mais;</span>
            <span>
              • Pacientes com diagnóstico câncer Gástrico ou de junção
              gastroesofágica localmente avançado inoperável ou metastático;
            </span>
            <span>• Pacientes com resultado negativo para o teste HER2*.</span>
            <span>
              *Pacientes que não tenham realizado o teste de HER2 anteriormente
              também podem realizar esse teste através do Programa Claudinova
            </span>
            <span className="text-main-orange font-bold">
              COMO O PROGRAMA CLAUDINOVA DISPONIBILIZA O TESTE CLAUDINA 18.2
            </span>
            <span>
              Para maior comodidade, o Programa Claudinova realizará a operação
              logística da amostra, previamente coletada, através de operador
              logístico especializado (com agendamento da retirada da amostra do
              paciente no endereço informado pelo médico) ou através de
              logística reversa (com a devida informação código de postagem, e a
              identificação com dados do remetente/destinatário para entrega
              gerado pela plataforma). A confirmação do agendamento da retirada
              da amostra será enviada ao médico via SMS.
            </span>
            <span>
              • Laboratórios especializados: análise das amostras realizadas por
              parceiros altamente qualificados.
            </span>
            <span>
              • Agilidade na resposta: aviso da disponibilidade do resultado por
              e-mail e/ou telefone.{" "}
            </span>
            <span>
              • Acesso fácil ao resultado: disponível por 30 dias a partir da
              liberação aqui na área logada do site do Programa Claudinova
            </span>
            <span>
              • A coleta do material do paciente é de inteira responsabilidade
              do médico.
            </span>
            <span>
              • A amostra deve estar disponível no momento da retirada pelo
              operador logístico, bem como a documentação necessária.
            </span>
            <span>
              • A análise da amostra está condicionada ao devido aceite do Termo
              de Consentimento do paciente (que poderá ser realizado via SMS ou
              via física devidamente assinada).
            </span>
            <span className="text-main-orange font-bold">
              4 PASSOS PARA A REALIZAÇÃO DO TESTE CLAUDINA 18.2
            </span>
            <span>
              <span className="font-bold">1. SOLICITAÇÃO DO TESTE:</span> Depois
              de cadastrar-se no site do programa, o médico acessa a área
              restrita para solicitar o teste.
            </span>
            <span>
              <span className="font-bold">2. RETIRADA DA AMOSTRA:</span> O
              médico realiza o agendamento da retirada da amostra no site do
              Programa.
            </span>
            <span>
              <span className="font-bold">3. TRANSPORTE DA AMOSTRA:</span> Após
              gerar a solicitação do teste o transporte da amostra será
              realizado pelo parceiro logístico ou logística reversa.
            </span>
            <span>
              <span className="font-bold">
                4. ANÁLISE E RESULTADO DO TESTE:
              </span>{" "}
              O médico seleciona o laboratório de sua escolha para a realização
              do teste e o resultado será disponibilizado pelos laboratórios
              parceiros – de acordo com o prazo de análise de cada serviço – na
              área restrita do médico no site do Programa Claudinova. O
              resultado ficará disponível por 30 (trinta) dias.
            </span>
            <span className="font-bold">COMO PARTICIPAR</span>
            <span>
              Basta o médico realizar o seu cadastro no site para prosseguir com
              a solicitação do teste para os MAT-BR-ZOL-2024-00070 | Agosto/2024
              pacientes elegíveis.
            </span>
            <span>Canais de Atendimento Programa Claudinova:</span>
            <span>Site: www.programaclaudinova.com.br </span>
            <span>E-mail: contato@programaclaudinova.com.br</span>
            <span>
              Central de Atendimento: 0800 999 5124 - disponível de segunda a
              sexta-feira, das 8h às 20h.
            </span>
          </div>
          <div className="w-full bg-main-blue p-5 text-white text-center mt-5">
            <span>MAT-BR-ZOL-2024-00070 | Agosto/2024</span>
          </div>
        </section>
      ) : program === "Doença" ? (
        <section className="w-full h-[75vh] px-20 overflow-y-auto">
          <div className="flex flex-col gap-5 mt-5">
            <span className="text-main-orange font-bold">
              O CÂNCER GÁSTRICO
            </span>
            <span>
              O câncer gástrico, também conhecido como câncer de estômago, é uma
              doença na qual as células anormais começam a crescer
              descontroladamente. O câncer gástrico pode começar em qualquer
              parte do estômago, mas o tipo de câncer de estômago mais comum, o
              Adenocarcinoma, se desenvolve a partir de células da camada mais
              interna do estômago (a mucosa) e representa 95% dos tumores
              malignos do estômago.
            </span>
            <span>
              O câncer gástrico atinge, em sua maioria, homens por volta dos
              60-70 anos. Cerca de 65% dos pacientes têm mais de 50 anos. No
              Brasil, o câncer de estômago é o quarto tipo mais frequente entre
              homens e o sexto entre as mulheres. No triênio 2023-2025, o Brasil
              deve registrar 704 mil novos casos de câncer considerando o tipo
              de pele não melanoma e 483 mil excluídos os casos de câncer de
              pele não melanoma.
            </span>
            <span className="text-main-orange font-bold">FATORES DE RISCO</span>
            <span>
              Os principais fatores de risco para o câncer gástrico incluem:
            </span>
            <span>
              • Infecções pela bactéria Helicobacter pylori (H. pylori)
            </span>
            <span>• Obesidade</span>
            <span>• Tabagismo</span>
            <span>• Consumo de álcool</span>
            <span>• Consumo excessivo de sal</span>
            <span>• Parentes de primeiro grau com câncer de estômago</span>

            <span className="text-main-orange font-bold">SINTOMAS</span>
            <span>
              Não há sintomas específicos do câncer de estômago e muitas vezes
              só se tornam evidentes em estágios mais avançados. Por isso, é
              importante procurar um médico quando surgirem alguns sinais
              incomuns ou persistentes, como: dificuldade para engolir, perda de
              peso inexplicável, dor de barriga constante, indigestão frequente,
              sentir-se satisfeito depois de comer pequenas quantidades e perda
              de apetite.
            </span>

            <span className="text-main-orange font-bold">TRATAMENTO</span>
            <span>
              As opções de tratamento para o câncer gástrico incluem cirurgia,
              quimioterapia e radioterapia. Nos últimos anos, tivemos avanços
              significativos no desenvolvimento de novas terapias, como
              imunoterapia e terapia-alvo, melhorando resultados e a qualidade
              de vida dos pacientes.
            </span>
            <span className="text-sm">
              Fonte:
              https://www.gov.br/inca/pt-br/assuntos/cancer/tipos/estomago.
              Atualizado em 18/07/2022.
            </span>
            <span className="text-main-orange font-bold">O QUE É O HER2?</span>
            <span>
              O HER2 (receptor do fator de crescimento epidérmico humano 2) é um
              receptor tirosina quinase que é superexpresso e/ou amplificado no
              câncer gástrico e de junção gastroesofágica (G/JGE). O HER2 é um
              proto-oncogene que está envolvido nas vias de sinalização, o que
              leva a crescimento e diferenciação celular.
            </span>
            <span className="text-main-orange font-bold">
              O QUE É O NOVO BIOMARCADOR CLAUDINA 18.2?
            </span>
            <span>
              As Claudinas são uma família de proteínas transmembrana. Estão
              presentes em todo o corpo, mas duas isoformas específicas da
              CLDN18 estão localizadas em determinados tipos de tecido
            </span>
            <span>
              • A CLDN18.2 é a isoforma dominante nas células epiteliais
              gástricas saudáveis e normais.
            </span>
            <span>
              • A CLDN18.1 é a isoforma dominante no tecido pulmonar saudável e
              normal.
            </span>
            <span>
              Estudos pré-clínicos demonstraram que a CLDN18.2 pode se tornar
              mais exposta conforme os tumores gástricos se desenvolvem,
              tornando-se um potencial alvo terapêutico.
            </span>
            <span className="text-main-orange font-bold">
              QUAL A IMPORTÂNCIA DA TESTAGEM DE BIOMARCADORES?
            </span>
            <span>
              Detectar a presença de CLDN 18.2 e HER2 ajuda a identificar um
              perfil mais completo do paciente e permite aos médicos avaliar
              opções personalizadas de tratamento.
            </span>
          </div>
          <div className="w-full bg-main-blue p-5 text-white text-center mt-5">
            <span>MAT-BR-ZOL-2024-00070 | Agosto/2024</span>
          </div>
        </section>
      ) : program === "Exame" ? (
        <section className="w-full h-[85vh] md:px-10  overflow-y-auto">
          <Image
            src="/exame/Captura_01.png"
            width={1920}
            height={1080}
            priority
            alt="exame"
          />
          <Image
            src="/exame/Captura_02.png"
            width={1920}
            height={400}
            priority
            alt="exame"
          />
          <Image
            src="/exame/Captura_03.png"
            width={1920}
            height={1080}
            priority
            alt="exame"
          />
          <Image
            src="/exame/Captura_04.png"
            width={1920}
            height={1080}
            priority
            alt="exame"
          />
          <Image
            src="/exame/Captura_05.png"
            width={1920}
            height={1080}
            priority
            alt="exame"
          />
          <Image
            src="/exame/Captura_06.png"
            width={1920}
            height={1080}
            priority
            alt="exame"
          />
          <Image
            src="/exame/Captura_07.png"
            width={1920}
            height={1080}
            priority
            alt="exame"
          />
          <Image
            src="/exame/Captura_08.png"
            width={1920}
            height={1080}
            priority
            alt="exame"
          />
          <Image
            src="/exame/Captura_09.png"
            width={1920}
            height={1080}
            priority
            alt="exame"
          />
          <div className="w-full bg-main-blue p-5 text-white text-center mt-5">
            <span>MAT-BR-ZOL-2024-00070 | Agosto/2024</span>
          </div>
        </section>
      ) : program === "FAQ" ? (
        <section className="w-full h-[75vh] px-20 overflow-y-auto">
          <div className="flex flex-col gap-5 mt-5">
            <span className="text-lg text-center text-main-blue">
              FAQ – PERGUNTAS FREQUENTES
            </span>
            <span className="text-main-orange font-bold">
              O QUE É O PROGRAMA CLAUDINOVA?
            </span>
            <span>
              O programa é uma iniciativa da Astellas e tem como objetivo apoiar
              médicos e pacientes na realização dos testes HER2 + Claudina 18.2
              para pacientes que não tenham realizado o teste de HER2
              anteriormente e o teste de Claudina 18.2 para pacientes que já
              tenham realizado o teste de HER2 com resultado negativo.
            </span>

            <span className="text-main-orange font-bold">
              QUEM PODE PARTICIPAR DO PROGRAMA?
            </span>
            <span className="text-main-orange font-bold">Pacientes</span>
            <span>• Pacientes com 18 anos ou mais;</span>
            <span>
              • Pacientes com diagnóstico confirmado de câncer gástrico ou
              gastroesofágico localmente avançado e inoperável ou metastático
              realizado ou atestado e validado pelo Profissional Médico;
            </span>
            <span>• Pacientes com resultado negativo para e teste HER2.</span>

            <span className="text-main-orange font-bold">Médicos</span>
            <span>
              Somente médicos oncologistas, gastroenterologistas, cirurgiões e
              endoscopistas são elegíveis ao programa
            </span>

            <span className="text-main-orange font-bold">
              QUAIS TESTES SÃO REALIZADOS PELO PROGRAMA?
            </span>
            <span>O Programa Claudinova oferece os testes:</span>
            <span>
              • HER2 + Claudina 18.2 para pacientes que não tenham realizado o
              teste de HER2 anteriormente.
            </span>
            <span>
              • Claudina 18.2 para pacientes que já tenham realizado o teste de
              HER2 com resultado negativo.
            </span>
            <span>
              <span className="font-bold">Importante:</span> pacientes que
              tenham realizado o teste HER2 (seja pelo programa ou por fonte
              própria) com resultado positivo, não são elegíveis para realização
              do teste de Claudina 18.2 disponibilizado pelo programa.{" "}
            </span>
            <span className="text-main-orange font-bold">
              COMO SOLICITAR O TESTE?
            </span>
            <span>
              Para solicitar o teste é necessário que o médico esteja cadastrado
              no site do programa e, se desejar, mediante aceite, o cadastro do
              médico poderá ser vinculado a outro profissional de saúde para
              apoio na solicitação do teste pela plataforma.
            </span>
            <span className="text-main-orange font-bold">
              COMO FUNCIONA A RETIRADA DA AMOSTRA?
            </span>
            <span>
              Após gerar a solicitação do teste o transporte da amostra será
              realizado pelo parceiro logístico ou logística reversa, a depender
              do prazo de disponibilidade da amostra a ser analisada.
            </span>

            <span className="text-main-orange font-bold">
              QUEM REALIZA A ANÁLISE DOS TESTES?
            </span>
            <span>
              O Programa Claudinova conta com laboratórios especializados nesse
              tipo de análise. São parceiros altamente qualificados, garantindo
              agilidade na resposta e fácil acesso ao resultado.
            </span>
            <span className="text-main-orange font-bold">
              É PRECISO PAGAR ALGUMA MENSALIDADE PARA PARTICIPAR DO PROGRAMA?
            </span>
            <span>Não. O Programa Claudinova é totalmente gratuito.</span>
            <span className="text-main-orange font-bold">
              QUAL O PRAZO DE DURAÇÃO DO PROGRAMA?
            </span>
            <span>
              O Programa Claudinova terá prazo indeterminado, podendo ser
              alterado ou cancelado pela Astellas a qualquer momento.
            </span>
          </div>
          <div className="w-full bg-main-blue p-5 text-white text-center mt-5">
            <span>MAT-BR-ZOL-2024-00070 | Agosto/2024</span>
          </div>
        </section>
      ) : program === "Fale Conosco" ? (
        <section className="w-full h-[80vh] overflow-auto px-10">
          <div className="bg-main-orange w-full p-5 rounded-md mt-3">
            <span className="text-white text-xl">Fale Conosco</span>
          </div>
          <div className="w-full grid grid-cols-2 mt-10">
            <div className="border border-gray-200 py-10 px-10 rounded-md">
              <Input
                name="Name"
                placeholder="Nome"
                className="w-full mt-5"
                required
                value={data.Name}
                onChange={handleChange}
              />
              <Input
                name="EmailAddress"
                placeholder="E-mail"
                className="w-full mt-5"
                required
                value={data.EmailAddress}
                onChange={handleChange}
                onBlur={(e) => validateEmail(e.target.value)}
              />
              <Textarea
                name="Body"
                placeholder="Mensagem"
                className="w-full mt-5"
                required
                value={data.Body}
                onChange={handleChange}
              />
              <Button
                onClick={sendEmail}
                size={"lg"}
                variant={`tertiary`}
                className="w-full mt-5"
                disabled={
                  !data.Name || !data.EmailAddress || !data.Body ? true : false
                }
              >
                Enviar
              </Button>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="flex flex-col gap-2">
                <span className="text-lg">Central de Atendimento</span>
                <span className="text-lg text-center">
                  a Profissionais de Saúde
                </span>
              </div>
              <span className="text-lg font-bold text-main-orange">
                0800 999 5124
              </span>
              <span className="text-lg">ou</span>
              <span className="text-lg font-bold text-main-orange">
                contato@programaclaudinova.com.br
              </span>
              <div className="flex flex-col gap-2">
                <span className="text-lg">Segunda a sexta-feira,</span>
                <span className="text-lg text-center">das 8h às 20h.</span>
              </div>
              <Image
                src="/logo-removebg-preview.png"
                width={400}
                height={400}
                priority
                alt="faleconosco"
              />
            </div>
          </div>
          <div className="w-full bg-main-blue p-5 text-white text-center mt-5">
            <span>MAT-BR-ZOL-2024-00070 | Agosto/2024</span>
          </div>
        </section>
      ) : (
        <>
          <section className="w-full h-[75vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-10">
              <div className="flex flex-col items-center text-3xl md:text-4xl gap-2">
                <span className="flex gap-2">
                  <span className="text-main-orange">A</span>
                  <span className="flex gap-2 text-main-blue">
                    plataforma de gestão
                    <span className="text-main-orange">de</span>
                  </span>
                </span>

                <span className="text-main-orange">exames da Astellas</span>
              </div>
              <div className="w-full">
                <Link href="/login" className="w-full">
                  <Button size={`lg`} variant={`tertiary`} className="w-full">
                    Quero acessar
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
