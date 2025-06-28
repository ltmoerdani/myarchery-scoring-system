import React, { useMemo, useState } from "react";
import { Card, CardBody, Table, Badge, Button } from "reactstrap";
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

function TableEditResult({ data }) {
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "shoot",
        header: "Shoot",
        cell: ({ row }) => (
          <div>
            <div className="d-flex">
              {row.original.shoot.map((item, index) => (
                <Badge key={index} color="primary" className="me-1">{item}</Badge>
              ))}
            </div>
          </div>
        ),
      },
      {
        accessorKey: "action",
        header: "Action",
        cell: () => <Button color="danger" size="sm">Delete</Button>,
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
                    <th key={header.id}>
                      {flexRender(header.column.columnDef.header, header.getContext())}
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
}

export default TableEditResult;
