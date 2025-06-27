import React, { useMemo, useState } from "react";
import { Card, CardBody } from "reactstrap";

// Datatable related plugins
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit';

// Data for dummy
import { dummyConstants } from '../../../../constants';

const TableEditResult = React.memo(() => {
  const [page, setPage] = useState(1);
  const [sizePerPage, setSizePerPage] = useState(10);
  const [productData] = useState(dummyConstants.editResult);

  // Memoize columns definition to avoid unnecessary re-renders
  const columns = useMemo(() => [
    {
      dataField: 'id',
      text: 'Id',
    },
    {
      dataField: 'shoot',
      text: 'Shoot',
      formatter: (cell, row) => (
        <div>
          <div className="d-flex">
            {row.shoot.map((item, index) => (
              <span key={index} className="badge bg-primary me-1">{item}</span>
            ))}
          </div>
        </div>
      ),
    },
    {
      dataField: 'action',
      text: 'Action',
      formatter: () => (
        <button className="btn btn-danger btn-sm">Delete</button>
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

export default TableEditResult;
