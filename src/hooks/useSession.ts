import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SessionStore = {
  isLogged: boolean;
  hasPending: boolean;
  date: string;
  email: string;
  role: string;
  name: string;
  userNameLab?: string;
  token: string;
  changePassword: boolean;
  currentPassword: string;
  session?: string;
  ticket?: string;
  nameInactive?: string;
  crmInactive?: string;
  inactiveType?: string;
  refresh: boolean;
  motivo?: string;
  nameLaudo?: string;
  cpfLaudo?: string;
  namePatient?: string;
  cpfPatient?: string;
  examDefinition?: string;
  setExamDefinition: (examDefinition: string) => void;
  setDateTime: (date: string) => void;
  setHasPending: (hasPending: boolean) => void;
  setUserNameLab: (userNameLab: string) => void;
  setNamePatient: (namePatient: string) => void;
  setCpfPatient: (cpfPatient: string) => void;
  setNameLaudo: (nameLaudo: string) => void;
  setCpfLaudo: (cpfLaudo: string) => void;
  setMotivo: (motivo: string) => void;
  setNameInactive: (nameInactive: string) => void;
  setCrmInactive: (crmInactive: string) => void;
  setRefresh: (refresh: boolean) => void;
  setInactiveType: (inactiveType: string) => void;
  setTicket: (ticket: string) => void;
  setSession: (session: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setRole: (role: string) => void;
  setToken: (token: string) => void;
  setChangePassword: (changePassword: boolean) => void;
  setCurrentPassword: (currentPassword: string) => void;
  onLogin: () => void;
  onLogout: () => void;
};

const useSession = create(
  persist<SessionStore>(
    (set) => ({
      isLogged: false,
      hasPending: false,
      date: "",
      email: "",
      role: "",
      name: "",
      token: "",
      changePassword: false,
      currentPassword: "",
      session: "",
      ticket: "",
      inactiveType: "",
      refresh: false,
      motivo: "",
      nameLaudo: "",
      cpfLaudo: "",
      namePatient: "",
      cpfPatient: "",
      userNameLab: "",
      examDefinition: "",
      setExamDefinition: (examDefinition) =>
        set({ examDefinition: examDefinition }),
      setDateTime: (date) => set({ date: date }),
      setHasPending: (hasPending) => set({ hasPending: hasPending }),
      setUserNameLab: (userNameLab) => set({ userNameLab: userNameLab }),
      setNamePatient: (namePatient) => set({ namePatient: namePatient }),
      setCpfPatient: (cpfPatient) => set({ cpfPatient: cpfPatient }),
      setNameLaudo: (nameLaudo) => set({ nameLaudo: nameLaudo }),
      setCpfLaudo: (cpfLaudo) => set({ cpfLaudo: cpfLaudo }),
      setMotivo: (motivo) => set({ motivo: motivo }),
      setNameInactive: (nameInactive) => set({ nameInactive: nameInactive }),
      setCrmInactive: (crmInactive) => set({ crmInactive: crmInactive }),
      setRefresh: (refresh) => set({ refresh: refresh }),
      setInactiveType: (inactiveType) => set({ inactiveType: inactiveType }),
      setTicket: (ticket) => set({ ticket: ticket }),
      setSession: (session) => set({ session: session }),
      setCurrentPassword: (currentPassword) =>
        set({ currentPassword: currentPassword }),
      setName: (name) => set({ name: name }),
      setRole: (role) => set({ role: role }),
      setEmail: (email: string) => set({ email: email }),
      setToken: (token) => set({ token: token }),
      onLogin: () => set({ isLogged: true }),
      onLogout: () =>
        set({
          isLogged: false,
          token: "",
          email: "",
          role: "",
          name: "",
          changePassword: false,
          currentPassword: "",
          inactiveType: "",
          session: "",
          ticket: "",
          motivo: "",
          nameLaudo: "",
          cpfLaudo: "",
          namePatient: "",
          cpfPatient: "",
          date: "",
          hasPending: false,
          userNameLab: "",
        }),
      setChangePassword: (changePassword) =>
        set({ changePassword: changePassword }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSession;
