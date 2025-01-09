import { DialogContent } from "../ui/dialog";

export interface RescueRegisterProps {
  text: string;
}

export function RescueRegister({ text }: RescueRegisterProps) {
  return (
    <DialogContent className="w-[30%] rounded-lg lg:max-w-[80vw] bg-main-blue border border-none">
      <div className="flex flex-col p-5">
        <span className="text-xl font-semibold text-white">{text}</span>
      </div>
    </DialogContent>
  );
}
