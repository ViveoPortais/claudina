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
      <div className="w-full">
        <p className="text-main-orange font-semibold md:text-xl text-sm text-start">
          &quot;O programa fará o agendamento da retirada da amostra
        </p>
        <p className="text-main-orange font-semibold md:text-xl text-sm text-start">
          e você receberá a confirmação e orientação sobre os
        </p>
        <p className="text-main-orange font-semibold md:text-xl text-sm text-start">
          próximos passos via e-mail e/ou SMS"
        </p>
      </div>
    </DialogContent>
  );
}
