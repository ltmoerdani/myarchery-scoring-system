import React, { useMemo, useState } from "react";
import { Card, CardBody } from "reactstrap";

// Datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';
import { Link } from 'react-router-dom';

// Data for dummy
import { dummyConstants } from '../../../../constants';

// Import Breadcrumb
import './sass/datatables.scss';

const TableResult = React.memo(() => {
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [productData] = useState(dummyConstants.result);

  // Memoize columns definition to avoid unnecessary re-renders
  const columns = useMemo(() => [
    {
      dataField: 'id',
      text: 'Id',
      sort: true,
    },
    {
      dataField: 'name',
      text: 'Name',
      sort: true,
    },
    {
      dataField: 'code',
      text: 'Kode',
      sort: true,
    },
    {
      dataField: 'description',
      text: 'Description',
      sort: true,
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: (cell, row) => (
        <Link to={`/edit/${row.id}`} className="btn btn-primary btn-sm">
          Edit
        </Link>
      ),
    }
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

export default TableResult;