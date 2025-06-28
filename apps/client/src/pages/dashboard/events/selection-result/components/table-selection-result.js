import * as React from "react";
import styled from "styled-components";
import { useSelectionResult } from "../hooks/selection-result";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";

import { SpinnerDotBlock, AlertSubmitError } from "components/ma";

import IconMedal from "components/ma/icons/fill/medal-gold";

function TableSelectionResult({ categoryDetailId, standing }) {
  const {
    data: resultRows,
    isInitialLoading,
    isError,
    errors,
    sessionNumbersList,
    sessionEliminationNumbersList,
  } = useSelectionResult({ categoryDetailId, standing });

  const columns = React.useMemo(
    () => [
      {
        id: "rank",
        header: () => (
          <th title="Peringkat">
            <IconMedal />
          </th>
        ),
        cell: ({ row }) => {
          const rankNumber = row.index + 1;
          return rankNumber || (
            <GrayedOutText style={{ fontSize: "0.75em" }}>
              belum
              <br />
              ada data
            </GrayedOutText>
          );
        },
      },
      {
        accessorKey: "member.name",
        header: "Nama",
      },
      {
        accessorKey: "clubName",
        header: "Klub",
        cell: ({ getValue }) => <ClubName>{getValue()}</ClubName>,
      },
      ...(standing === 3 || standing === 0
        ? sessionNumbersList?.map((sessionNumber) => ({
            id: `session-${sessionNumber}`,
            header: `Sesi ${sessionNumber}`,
            cell: ({ row }) => {
              const sessions = row.original.qualification?.sessions || row.original.sessions;
              return (
                <span>
                  {sessions[sessionNumber]?.total || <GrayedOutText>&ndash;</GrayedOutText>}
                </span>
              );
            },
          }))
        : []),
      ...(standing === 0
        ? [
            {
              id: "total-qual",
              header: "Total-Kual",
              cell: ({ row }) => {
                const totalQual = row.original.qualification?.total || row.original.total;
                return <span className="total">{totalQual}</span>;
              },
            },
          ]
        : []),
      ...(standing === 4 || standing === 0
        ? sessionEliminationNumbersList?.map((eliminationNumber) => ({
            id: `elimination-${eliminationNumber}`,
            header: `Eli-${eliminationNumber}`,
            cell: ({ row }) => {
              const sessionsElimination =
                row.original.elimination?.sessions || row.original.sessions;
              return (
                <span>
                  {sessionsElimination[eliminationNumber]?.total || (
                    <GrayedOutText>&ndash;</GrayedOutText>
                  )}
                </span>
              );
            },
          }))
        : []),
      {
        id: "total-eli",
        header: standing === 0 ? "Total-Eli" : "Total",
        cell: ({ row }) => {
          const totalEli = row.original.elimination?.total || row.original.total;
          return <span className="total">{totalEli}</span>;
        },
      },
      {
        id: "total-irat",
        header: "IRAT",
        cell: ({ row }) => {
          const totalIrat = row.original.allTotalIrat || row.original.totalIrat;
          return <span className="irat">{totalIrat}</span>;
        },
      },
    ],
    [sessionNumbersList, sessionEliminationNumbersList, standing]
  );

  const table = useReactTable({
    data: resultRows || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <AsyncViewWrapper isLoading={isInitialLoading} isError={isError} errors={errors}>
      {!resultRows?.length ? (
        <EmptyMembers>Tidak ada peserta di kategori ini</EmptyMembers>
      ) : (
        <TableContainer>
          <MembersTable className="table table-responsive">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className={header.id === "name" ? "name" : "stats"}>
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
                    <td key={cell.id} className={cell.column.id === "name" ? "name" : "stats"}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </MembersTable>
        </TableContainer>
      )}
    </AsyncViewWrapper>
  );
}

function AsyncViewWrapper({ children, isLoading, isError, errors }) {
  if (isLoading) {
    return <SpinnerDotBlock />;
  }

  if (isError) {
    return (
      <React.Fragment>
        <ErrorMembers>
          <div>
            <p>Gagal mengambil data</p>
          </div>
        </ErrorMembers>
        <AlertSubmitError isError={isError} errors={errors} />
      </React.Fragment>
    );
  }

  return children;
}

function ClubName({ children, clubName }) {
  if (!children && !clubName) {
    return <GrayedOutText>&ndash;</GrayedOutText>;
  }
  return children || clubName;
}

/* =============================== */
// styles

const GrayedOutText = styled.span`
  color: var(--ma-gray-400);
`;

const EmptyMembers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 12rem;
  border: solid 1px var(--ma-gray-50);
  border-radius: 0.5rem;
  color: var(--ma-gray-400);
  font-weight: 600;
`;

const ErrorMembers = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 12rem;
  border: solid 1px var(--ma-gray-50);
  border-radius: 0.5rem;
  color: var(--ma-gray-400);
  font-weight: 600;
`;

const TableContainer = styled.div`
  border: solid 1px var(--ma-gray-50);
  border-radius: 0.5rem;
  overflow: hidden;
`;

const MembersTable = styled.table`
  margin: 0;

  th {
    background-color: var(--ma-primary-blue-50);
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    padding: 0.5rem;
  }

  th.name {
    text-align: left;
  }

  td {
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    padding: 0.5rem;
  }

  td.name {
    text-align: left;
  }

  td.stats {
    font-family: monospace;
  }

  td.total {
    font-weight: 600;
  }

  td.irat {
    font-weight: 600;
    color: var(--ma-blue);
  }
`;

export { TableSelectionResult };
