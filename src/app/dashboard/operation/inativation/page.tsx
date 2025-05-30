"use client";

import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { columns } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getDiagnosticsLaboratory } from "@/services/diagnostic";
import { Solicitation } from "@/components/Solicitation";
import useSession from "@/hooks/useSession";
import { set } from "date-fns";
import { ModalLogistocaReversa } from "@/components/ModalLogistocaReversa";

export default function Diagnostic() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const reloading = useSession();

  const otherProfissional = () => {
    reloading.setRefresh(true);
    setIsLoading(true);
    getDiagnosticsLaboratory()
      .then((res) => {
        if (res.data === null || res.totalSize === 0) {
          setData([]);
          setFilteredData([]);
          toast.info("Nenhuma solicitação encontrada.");
          return;
        }

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
      })
      .finally(() => {
        reloading.setRefresh(false);
        setIsLoading(false);
      });
  };

  const Buttonfilter = () => {
    const filtered = data.filter((item: any) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        item.nameDoctor.toLowerCase().includes(lowerCaseFilter) ||
        item.licenseNumber.toLowerCase().includes(lowerCaseFilter) ||
        item.licenseState.toLowerCase().includes(lowerCaseFilter) ||
        item.namePatient.toLowerCase().includes(lowerCaseFilter) ||
        item.cpf.toLowerCase().includes(lowerCaseFilter) ||
        item.diseaseName.toLowerCase().includes(lowerCaseFilter) ||
        item.logisticsStatus.toLowerCase().includes(lowerCaseFilter)
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
    if (reloading.refresh) {
      otherProfissional();
    }
  }, [reloading.refresh]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-8 lg:mt-0">
      <div className="flex justify-start text-xl md:text-2xl text-main-blue">
        <span className="font-georgia">Acompanhamento de Solicitação</span>
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
      </div>

      <DataTable columns={columns} isLoading={isLoading} data={filteredData} />
      <Solicitation />
      <ModalLogistocaReversa />
    </div>
  );
}
