"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { columns } from "./columns";
import { DataTable } from "@/components/dashboard/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getHealthProfessionalsActivated } from "@/services/representative";
import useSession from "@/hooks/useSession";

export default function Diagnostic() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filter, setFilter] = useState("");
  const loading = useSession();

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
    const filtered = data.filter((item: any) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        item.name.toLowerCase().includes(lowerCaseFilter) ||
        item.licenseCoren.toLowerCase().includes(lowerCaseFilter) ||
        item.representativeStatus.toLowerCase().includes(lowerCaseFilter)
      );
    });

    setFilteredData(filtered);
  };

  const clearFilter = () => {
    otherProfissionalActive(); // Recarregar todos os dados
    setFilter(""); // Limpar o filtro
  };

  useEffect(() => {
    otherProfissionalActive();
  }, []);

  useEffect(() => {
    if (!loading.refresh) {
      otherProfissionalActive();
    }
  }, [loading.refresh]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-8 lg:mt-0">
      <div className="flex justify-start text-xl md:text-2xl text-main-blue">
        <span className="font-georgia">Inativação de Profissonal da Saúde</span>
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

        <DataTable
          isLoading={loading.refresh}
          columns={columns}
          data={filteredData}
        />
      </div>
    </div>
  );
}
