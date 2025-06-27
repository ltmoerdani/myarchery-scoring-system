import React, { useMemo, useState } from "react";
import { Card, CardBody } from "reactstrap";

// Datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

// Data for dummy
import { dummyConstants } from '../../../../constants';

// Import Breadcrumb
import './sass/datatables.scss';

const TableScoring = React.memo(() => {
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [productData] = useState(dummyConstants.scoring);

  // Memoize columns definition to avoid unnecessary re-renders
  const columns = useMemo(() => [
    {
      dataField: 'id',
      text: 'Id',
      sort: true,
    },
    {
      dataField: 'class',
      text: 'Kelas',
      sort: true,
    },
    {
      dataField: 'arange',
      text: 'Jarak',
      sort: true,
    },
    {
      dataField: 'session',
      text: 'Sesi',
      sort: true,
    },
    {
      dataField: 'score',
      text: 'Skor',
      formatter: (cell, row) => (
        <div>
          <span className={`badge ${row.score > 50 ? 'bg-success' : 'bg-danger'}`}>{row.score}</span>
        </div>
      ),
    },
  ], []);

  return (
    <Card>
      <CardBody>
        <ToolkitProvider
          keyField="id"
          data={productData}
          columns={columns}
          search
        >
          {toolkitProps => (
            <div>
              <BootstrapTable
                {...toolkitProps.baseProps}
                pagination={paginationFactory({
                  page,
                  sizePerPage,
                  onPageChange: setPage,
                  onSizePerPageChange: setSizePerPage
                })}
                wrapperClasses="table-responsive"
              />
            </div>
          )}
        </ToolkitProvider>
      </CardBody>
    </Card>
  );
});

export default TableScoring;
