import { create } from "zustand";

interface AcceptTermsProps {
  isDiagnosticModalOpen: boolean;
  isTreatmentModalOpen: boolean;
  isPatientModalOpen: boolean;
  isPatientTermsAccepted: boolean;
  isMedicDiagnosticTermsAccepted: boolean;
  isMedicTreatmentTermsAccepted: boolean;

  openDiagnosticModal: (action: boolean) => void;
  openTreatmentModal: (action: boolean) => void;
  openPatientModal: (action: boolean) => void;
  acceptPatientTerms: (value: boolean) => void;
  acceptMedicDiagnosticTerms: (value: boolean) => void;
  acceptMedicTreatmentTerms: (value: boolean) => void;
}

export const useAcceptTerms = create<AcceptTermsProps>((set) => ({
  isDiagnosticModalOpen: false,
  isTreatmentModalOpen: false,
  isPatientModalOpen: false,
  isPatientTermsAccepted: false,
  isMedicDiagnosticTermsAccepted: false,
  isMedicTreatmentTermsAccepted: false,

  openDiagnosticModal: (action) =>
    set(() => ({ isDiagnosticModalOpen: action })),
  openTreatmentModal: (action) => set(() => ({ isTreatmentModalOpen: action })),
  openPatientModal: (action) => set(() => ({ isPatientModalOpen: action })),
  acceptPatientTerms: (isAccepted) =>
    set(() => ({ isPatientTermsAccepted: isAccepted })),
  acceptMedicDiagnosticTerms: (isAccepted) =>
    set(() => ({ isMedicDiagnosticTermsAccepted: isAccepted })),
  acceptMedicTreatmentTerms: (isAccepted) =>
    set(() => ({ isMedicTreatmentTermsAccepted: isAccepted })),
}));
