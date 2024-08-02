import { OtherProfessionalModal } from "@/components/signup/OtherProfessionalModal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ProfessionalRegister() {
  return (
    <div className="w-full flex flex-col gap-4">
      <OtherProfessionalModal />
      <Link href="/signup" className="w-full">
        <Button size={`lg`} variant={`tertiary`} className="w-full">
          Voltar
        </Button>
      </Link>
    </div>
  );
}
