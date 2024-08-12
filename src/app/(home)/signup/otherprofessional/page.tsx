"use client";

import { OtherProfessionalModal } from "@/components/signup/OtherProfessionalModal";
import { Button } from "@/components/ui/button";
import { useAcceptTerms } from "@/hooks/useTerms";
import Link from "next/link";

export default function ProfessionalRegister() {
  const termsModal = useAcceptTerms();
  const clearTerms = () => {
    termsModal.acceptMedicDiagnosticTerms(false);
    termsModal.acceptMedicTreatmentTerms(false);
    termsModal.acceptPatientTerms(false);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <OtherProfessionalModal />
      <Link href="/signup" className="w-full">
        <Button
          onClick={clearTerms}
          size={`lg`}
          variant={`tertiary`}
          className="w-full"
        >
          Voltar
        </Button>
      </Link>
    </div>
  );
}
