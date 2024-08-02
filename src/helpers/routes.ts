import { HiOutlineDocumentReport } from "react-icons/hi";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { LuClipboardList } from "react-icons/lu";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { TbBuildingHospital } from "react-icons/tb";
import { IconType } from "react-icons/lib";
import { IoHomeOutline } from "react-icons/io5";

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
      text: "Solicitação de Profissional de Saúde",
      icon: LuClipboardList,
    },
    {
      route: "/dashboard/doctor/inativation",
      text: "Inativação de Profissional de Saúde",
      icon: LuClipboardList,
    },
  ],

  laboratory: [
    {
      route: "/dashboard/laboratory/starts",
      text: "Inicio",
      icon: IoHomeOutline,
    },
    {
      route: "/dashboard/laboratory/inativation",
      text: "Inativação",
      icon: LuClipboardList,
    },
  ],
};
