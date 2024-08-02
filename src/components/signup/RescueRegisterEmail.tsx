import { DialogContent } from "../ui/dialog";

export function RescueRegisterEmail() {
  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw] bg-main-blue border border-none">
      <div className="flex flex-col p-5">
        <span className="text-xl font-semibold  text-white">
          Não foi possível realizar seu cadastro na área logada da plataforma
          pois seu nome/CRM ou email já está cadastrado em nosso programa.
        </span>
      </div>
    </DialogContent>
  );
}
