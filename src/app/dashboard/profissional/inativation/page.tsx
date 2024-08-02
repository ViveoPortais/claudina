"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { columns } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { maskedField } from "@/components/custom/MaskedField";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getExam } from "@/services/diagnostic";
import { useSendLaudo } from "@/hooks/useModal";
import { Dialog } from "@radix-ui/react-dialog";
import { SendLaudo } from "@/components/SendLaudo";
import {
  getHealthProfessionals,
  getHealthProfessionalsActivated,
} from "@/services/healthprofessional";

export default function Diagnostic() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState({
    cpf: "",
  });

  const otherProfissionalActive = () => {
    getHealthProfessionalsActivated()
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
    const filtered = data.filter((item: any) => item.patientCpf === filter.cpf);
    setFilteredData(filtered);
  };

  const clearFilter = () => {
    getHealthProfessionalsActivated().then((res) => {
      const mapId = res.data.map((item: any) => {
        return {
          ...item,
          id: Math.random(),
        };
      });
      setData(mapId);
      setFilteredData(mapId);
    });
    setFilter({
      cpf: "",
    });
  };

  useEffect(() => {
    otherProfissionalActive();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-8 lg:mt-0">
      <div className="flex justify-start text-xl md:text-2xl text-main-blue">
        <span className="font-georgia">Inativação de Profissonal de Saúde</span>
      </div>

      <div className="mt-10 w-full">
        <div className="grid grid-cols-1 md:grid md:grid-cols-5 gap-5 mb-10 items-center ">
          <div className="md:ml-6">
            <Input
              name="name"
              placeholder="Filtro"
              value={filter.cpf}
              onChange={(e) => setFilter({ ...filter, cpf: e.target.value })}
            />
          </div>

          <div className="flex mt-7 gap-5">
            <Button
              onClick={Buttonfilter}
              className="md:w-60 w-full py-3"
              type="submit"
              variant="tertiary"
            >
              Buscar
            </Button>

            <Button
              onClick={clearFilter}
              className="md:w-60 w-full py-3"
              type="submit"
              variant="tertiary"
            >
              Limpar
            </Button>
          </div>
        </div>

        <DataTable columns={columns} data={filteredData} />
      </div>
    </div>
  );
}
