"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { columns } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  getDoctorVinculed,
  getHealthProfessionals,
} from "@/services/representative";
import useSession from "@/hooks/useSession";
import { useRegisterOncoCRM } from "@/hooks/useModal";
import { Dialog } from "@radix-ui/react-dialog";
import { CrmRegister } from "@/components/CrmRegister";

export default function Diagnostic() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const registerOncoCRM = useRegisterOncoCRM();
  const loading = useSession();

  const otherProfissional = () => {
    getDoctorVinculed()
      .then((res) => {
        const mapId = res.data.map((item: any) => {
          return {
            ...item,
            id: Math.random(),
          };
        });
        setData(mapId);
        setFilteredData(mapId);
      })
      .catch((err) => {
        toast.error("Erro ao carregar os dados");
      });
  };

  const Buttonfilter = () => {
    const filtered = data.filter((item: any) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        item.name.toLowerCase().includes(lowerCaseFilter) ||
        item.licenseCoren.toLowerCase().includes(lowerCaseFilter)
      );
    });

    setFilteredData(filtered);
  };

  const clearFilter = () => {
    otherProfissional();
    setFilter("");
  };

  useEffect(() => {
    otherProfissional();
  }, []);

  useEffect(() => {
    if (!loading.refresh) {
      otherProfissional();
    }
  }, [loading.refresh]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-8 lg:mt-0">
      <div className="flex justify-between items-center w-full text-xl md:text-2xl text-main-blue">
        <span className="font-georgia flex-1 text-center">
          Solicitações de Profissional da Saúde
        </span>
        <Button
          className="md:w-60 py-3"
          variant="tertiary"
          onClick={() => registerOncoCRM.openModal(true)}
        >
          Cadastrar CRM
        </Button>
      </div>

      <div className="mt-10 w-full">
        <div className="grid grid-cols-1 md:grid md:grid-cols-5 gap-5 mb-10 items-center ">
          <div className="md:ml-6">
            <Input
              name="filter"
              placeholder="Filtro"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            />
          </div>

          <div className="flex mt-7 gap-5">
            <Button
              onClick={Buttonfilter}
              className="md:w-60 w-full py-3"
              variant="tertiary"
            >
              Buscar
            </Button>

            <Button
              onClick={clearFilter}
              className="md:w-60 w-full py-3"
              variant="tertiary"
            >
              Limpar
            </Button>
          </div>
        </div>

        <DataTable columns={columns} data={filteredData} />
        <Dialog
          open={registerOncoCRM.isModalOpen}
          onOpenChange={registerOncoCRM.openModal}
        >
          <CrmRegister />
        </Dialog>
      </div>
    </div>
  );
}
