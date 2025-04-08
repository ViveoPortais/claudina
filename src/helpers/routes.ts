import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlineCancel, MdOutlinePhotoLibrary } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { TbBuildingHospital } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import { IoHomeOutline } from "react-icons/io5";
import { IoMegaphoneOutline } from "react-icons/io5";

interface IProfileProps {
  route: string;
  text: string;
  icon: IconType;
}

interface IRouteProps {
  [key: string]: IProfileProps[];
}

export const routes: IRouteProps = {
  doctor: [
    {
      route: "/dashboard/doctor/starts",
      text: "Início",
      icon: IoHomeOutline,
    },
    {
      route: "/dashboard/doctor/pre-register",
      text: "Solicitar Exames",
      icon: HiOutlineDocumentAdd,
    },
    {
      route: "/dashboard/doctor/exam",
      text: "Acompanhamento de Solicitação de Exames",
      icon: LuClipboardList,
    },
    {
      route: "/dashboard/doctor/solicitation",
      text: "Solicitação de Profissional da Saúde",
      icon: IoMegaphoneOutline,
    },
    {
      route: "/dashboard/doctor/inativation",
      text: "Inativação de Profissional da Saúde",
      icon: MdOutlineCancel,
    },
  ],

  laboratory: [
    {
      route: "/dashboard/operation/starts",
      text: "Inicio",
      icon: IoHomeOutline,
    },
    {
      route: "/dashboard/operation/inativation",
      text: "Acompanhamento de Solicitação",
      icon: LuClipboardList,
    },
  ],
  professional: [
    {
      route: "/dashboard/profissional/starts",
      text: "Início",
      icon: IoHomeOutline,
    },
    {
      route: "/dashboard/profissional/pre-register",
      text: "Solicitar Exames",
      icon: HiOutlineDocumentAdd,
    },
    {
      route: "/dashboard/profissional/exam",
      text: "Acompanhamento de Solicitação de Exames",
      icon: LuClipboardList,
    },
  ],
  oncoclinica: [
    {
      route: "/dashboard/oncoclinica/starts",
      text: "Início",
      icon: IoHomeOutline,
    },
    {
      route: "/dashboard/oncoclinica/pre-register",
      text: "Solicitar Exames",
      icon: HiOutlineDocumentAdd,
    },
    {
      route: "/dashboard/oncoclinica/exam",
      text: "Acompanhamento de Solicitação de Exames",
      icon: LuClipboardList,
    },
    {
      route: "/dashboard/oncoclinica/solicitation",
      text: "Solicitação de Profissional da Saúde",
      icon: IoMegaphoneOutline,
    },
  ],
  admin: [
    {
      route: "/dashboard/admin/starts",
      text: "Início",
      icon: IoHomeOutline,
    },
    {
      route: "/dashboard/admin/exam",
      text: "Acompanhamento de Solicitação de Exames",
      icon: LuClipboardList,
    },
  ],
};
