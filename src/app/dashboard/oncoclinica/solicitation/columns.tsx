"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import {
  activateHeathProfessional,
  rescueHeathProfessional,
} from "@/services/representative";
import { useState } from "react";
import { set } from "date-fns";
import useSession from "@/hooks/useSession";

export type Report2 = {
  name: string;
  license: string;
};

export const columns: ColumnDef<Report2>[] = [
  {
    accessorKey: "name",
    header: "Nome do Profissional de Saúde",
  },
  {
    accessorKey: "license",
    header: "Conselho",
  },
];
