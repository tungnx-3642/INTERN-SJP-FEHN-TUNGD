"use client";

import {
  ColumnDef,
  flexRender,
  SortingState,
  getSortedRowModel,
  getPaginationRowModel,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Product } from "@/api/productApi";
import { useProducts } from "@/hooks";
import { useMemo, useState } from "react";
import { CustomPagination } from "@/components/CustomPagination";
import { ProductTableHeader } from "../ProductTableHeader";
import { useTranslations } from "next-intl";
import { productColumns } from "./ProductsColumns";

export function ProductTable() {
  const columns = productColumns();
  const t = useTranslations("AdminProducts")
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState<string>("");
  const [price, setPrice] = useState<[number, number]>([0, 4000]);
  const [year, setYear] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const { data } = useProducts();

  const handleSubmitFilter = (
    newPrice: [number, number],
    newYear: string,
    newCategory: string
  ) => {
    setPrice(newPrice);
    setYear(newYear);
    setCategory(newCategory);
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((p) => {
      if (
        globalFilter &&
        !p.name.toLowerCase().includes(globalFilter.toLowerCase()) &&
        !p.description?.toLowerCase().includes(globalFilter.toLowerCase())
      ) {
        return false;
      }

      if (p.price < price[0] * 1000 || p.price > price[1] * 1000) {
        return false;
      }

      if (year) {
        if (year === "before2000" && p.madeYear >= 2000) return false;
        if (year === "before2010" && p.madeYear >= 2010) return false;
        if (year === "before2020" && p.madeYear >= 2020) return false;
        if (year === "recent" && p.madeYear < 2020) return false;
      }

      if (category && p.subcategory?.categoryId != Number(category)) {
        return false;
      }

      return true;
    }).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());;
  }, [data, globalFilter, price, year, category]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 7,
      },
    },
  });

  return (
    <div className="flex flex-col gap-5">
      <ProductTableHeader
        total={filteredData?.length ?? 0}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        onSubmitFilter={handleSubmitFilter}
      />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {t("noProducts")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="p-4 flex justify-center">
        <CustomPagination
          total={table.getFilteredRowModel().rows.length}
          currentPage={table.getState().pagination.pageIndex + 1}
          setPage={(page) => table.setPageIndex(page - 1)}
          itemsPerPage={table.getState().pagination.pageSize}
        />
      </div>
    </div>
  );
}
