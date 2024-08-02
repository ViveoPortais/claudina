import { DialogContent } from "./ui/dialog";

export function SucessExam() {
  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw] border border-none">
      <div className="w-full flex justify-center text-3xl md:text-2xl gap-1">
        <span className="text-main-blue font-semibold md:text-2xl text-sm">
          Solicitação
        </span>
        <span className="text-main-orange font-semibold md:text-2xl text-sm">
          concluída
        </span>
        <span className="text-main-blue font-semibold md:text-2xl text-sm">
          com sucesso
        </span>
      </div>
      <div className="w-full mt-16 ">
        <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
          &quot;O programa fará o agendamento da retirada da amostra
        </p>
        <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
          e você receberá a confirmação e orientação sobre os
        </p>
        <p className="text-main-orange font-semibold md:text-xl text-sm text-center">
          próximos passos via e-mail e/ou SMS
        </p>
      </div>
    </DialogContent>
  );
}
