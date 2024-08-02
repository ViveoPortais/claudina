import { DialogContent } from "../ui/dialog";

export function AcceptRegister() {
  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw] bg-main-blue border border-none">
      <div className="flex flex-col p-5">
        <span className="text-xl font-semibold text-white">Parabéns!</span>
        <span className="text-xl mt-5 font-semibold text-white">
          Seu cadastro na Plataforma Claudinova foi realizado com sucesso. Em
          breve, você receberá um e-mail de confirmação de cadastro.
        </span>
        <span className="text-xl mt-5 font-semibold text-white">Aguarde!</span>
      </div>
    </DialogContent>
  );
}
