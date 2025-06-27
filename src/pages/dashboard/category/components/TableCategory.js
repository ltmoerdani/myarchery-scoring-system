import React, { useMemo, useState } from "react";
import { Card, CardBody, Table } from "reactstrap";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  flexRender,
} from "@tanstack/react-table";

// Data for dummy
import { dummyConstants } from "../../../../constants";

// Import Breadcrumb
import "./sass/datatables.scss";

const TableCategory = React.memo(() => {
  const [data] = useState(dummyConstants.category);

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "class",
        header: "Kelas",
      },
      {
        accessorKey: "death_bird",
        header: "Batas Lahir",
      },
      {
        accessorKey: "arange",
        header: "Jarak",
      },
      {
        accessorKey: "kuota",
        header: "Kuota Terisi",
      },
      {
        accessorKey: "registrasi",
        header: "Biaya Registrasi",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <div>
            <span className={`${row.original.status ? "bg-danger" : "bg-success"} text-white rounded-3 px-2`}>
              {row.original.status ? "Full Booked" : "On Sale"}
            </span>
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card>
      <CardBody>
        <div className="table-responsive">
          <Table className="table-hover">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} {...{ onClick: header.column.getToggleSortingHandler() }}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{
                        asc: " 🔼",
                        desc: " 🔽",
                      }[header.column.getIsSorted()] ?? null}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id}>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </CardBody>
    </Card>
  );
});

export default TableCategory;
