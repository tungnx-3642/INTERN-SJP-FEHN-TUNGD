"use client";

import { useMemo, useState } from "react";
import { useCustomers } from "@/hooks/adminHooks";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { userColumns } from "./UserColumns";
import { UserTableHeader } from "./UserTableHeader";

export function UserTable() {
  const { data, isLoading } = useCustomers();
  const [globalFilter, setGlobalFilter] = useState("");

   const filteredData = useMemo(() => {
    if (!data) return [];
    const filter = globalFilter.toLowerCase();
    return data.filter(
      (user) =>
        (user.name ?? "").toLowerCase().includes(filter) ||
        (user.email ?? "").toLowerCase().includes(filter)
    );
  }, [data, globalFilter]);

  const table = useReactTable({
    data: filteredData,
    columns: userColumns as ColumnDef<any, any>[],
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) return <Spinner />;

  return (
    <div>
      <UserTableHeader
        total={data?.length ?? 0}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
