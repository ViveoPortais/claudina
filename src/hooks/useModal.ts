import { create } from "zustand";

interface ModalProps {
  isModalOpen: boolean;
  openModal: (action: boolean) => void;
}

export const useModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useAccept = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalEmail = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const passwordErr = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const passwordCorrect = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const acceptPreRegisterModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const modalRegisterUser = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalRescue = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalInativePartial = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalTotalPartial = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useSendLaudo = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useSucessExam = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useSolicitation = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useInsufficientSample = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useUnidentifiedSample = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useChangePassword = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useRegisterOncoCRM = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalLogisticaReversa = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalLogisticaReversaConfirmation = create<ModalProps>(
  (set) => ({
    isModalOpen: false,
    openModal: (action) => set(() => ({ isModalOpen: action })),
  })
);
