import React, { useMemo, useState } from "react";
import { Card, CardBody, Table, Badge } from "reactstrap";
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

// Import style
import "./sass/datatables.scss";

const TableScoring = React.memo(() => {
  const [data] = useState(dummyConstants.scoring);

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
        accessorKey: "arange",
        header: "Jarak",
      },
      {
        accessorKey: "session",
        header: "Sesi",
      },
      {
        accessorKey: "score",
        header: "Skor",
        cell: ({ row }) => (
          <div>
            <Badge color={row.original.score > 50 ? "success" : "danger"}>{row.original.score}</Badge>
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
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
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
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
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

export default TableScoring;
