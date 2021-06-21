import React, {Fragment, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
} from 'react-table';
import { Table, Row, Col, Button, Input, CustomInput } from 'reactstrap';
import {
    Container,
    Modal
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {history} from "../store/configureStore"
import {DeleteEmployee} from "../actions/index"

export const Home = () => {
    const employees = useSelector(state => state.employees)
    const [selectedEmployee, setSelectedEmployee] = useState(undefined);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const dispatch = useDispatch();
    const columns =
        [
            {
            Header: () => null,
            id: `ids`,
            accessor: 'id',
            Cell: ({data, cell}) => {
                const {value} = cell;
                return(
                    <Input type="radio" name="table-selection" onChange={() => setSelectedEmployee(value)}/>
                )
            },
            Filter: () => null
            },
          {
            Header: 'Employee Id',
            accessor: 'id',
          },
          {
            Header: 'First Name',
            accessor: 'firstName',
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },
          {
            Header: 'Email',
            accessor: 'email',
          },
          {
            Header: 'Contact Number',
            accessor: 'contactNumber',
          },
        ];

    return (
        <Container style={{ marginTop: 100 }}>
<Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center', marginBottom: 10 }}>
    
<Col md={9}>
    <h2>Employees</h2>
    </Col>
    <Col md={1}>
      <Button
        color='primary'
        onClick={() => history.push(`view/${selectedEmployee}`)}
        disabled={!selectedEmployee}
      >
        {'Read'}
      </Button>
    </Col>
    <Col md={1}>
      <Button
        color='primary'
        onClick={() =>  setDeleteModalOpen(true)}
        
        disabled={!selectedEmployee}
      >
        {'Delete'}
      </Button>
    </Col>
    <Col md={1}>
      <Button
        color='primary'
        onClick={() => history.push(`edit/${selectedEmployee}`)}
        disabled={!selectedEmployee}
      >
        {'Edit'}
      </Button>
    </Col>

  </Row>
            <TableContainer
                columns={columns}
                data={employees}
            />
            <Modal
              isOpen={deleteModalOpen}
              >
                <Container style={{ margin: '2rem 0'}}>
                  <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}> 
    
                    <Col md={12}>
                    <h3>Confirm delete Employee with ID {selectedEmployee}</h3>
                    </Col>
                    </Row>
                    <Row style={{ maxWidth: 1000, margin: '1rem 0', textAlign: 'left' }}> 
    
                    <Col md={6}>
                      </Col>

                      <Col md={3}>
                    <Button
                      color='secondary'
                      onClick={() =>  setDeleteModalOpen(false)}
                      disabled={false}
                    >
        {'Cancel'}
      </Button>
                    </Col>
                    <Col md={3}>
                    <Button
                      color='primary'
                      onClick={() =>  {
                        dispatch(DeleteEmployee(selectedEmployee));
                        setDeleteModalOpen(false)
                        setSelectedEmployee(undefined);
                      }}
                      disabled={false}
                    >
        {'Delete'}
      </Button>
                    </Col>

                   
                    </Row>
</Container>                
              </Modal>
        </Container>
    );
}



const Filter = ({ column }) => {
    return (
      <div style={{ marginTop: 5 }}>
        {column.canFilter && column.render('Filter')}
      </div>
    );
  };
  
  const DefaultColumnFilter = ({
    column: {
      filterValue,
      setFilter,
      preFilteredRows: { length },
    },
  }) => {
    return (
      <Input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={`search (${length}) ...`}
      />
    );
  };
  


const TableContainer = ({ columns, data, renderRowSubComponent }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : '';
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <Fragment>
      <Table bordered hover {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <div {...column.getSortByToggleProps()}>
                    {column.render('Header')}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column} />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    );
                  })}
                </tr>
                {row.isExpanded && (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </td>
                  </tr>
                )}
              </Fragment>
            );
          })}
        </tbody>
      </Table>

      <Row style={{ maxWidth: 1000, margin: '0 auto', textAlign: 'center' }}>
        <Col md={3}>
          <Button
            color='primary'
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {'<<'}
          </Button>
          <Button
            color='primary'
            onClick={previousPage}
            disabled={!canPreviousPage}
          >
            {'<'}
          </Button>
        </Col>
        <Col md={2} style={{ marginTop: 7 }}>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>
        </Col>
        <Col md={2}>
          <Input
            type='number'
            min={1}
            style={{ width: 70 }}
            max={pageOptions.length}
            defaultValue={pageIndex + 1}
            onChange={onChangeInInput}
          />
        </Col>
        <Col md={2}>
          <CustomInput
            type='select'
            value={pageSize}
            onChange={onChangeInSelect}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </CustomInput>
        </Col>
        <Col md={3}>
          <Button color='primary' onClick={nextPage} disabled={!canNextPage}>
            {'>'}
          </Button>
          <Button
            color='primary'
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {'>>'}
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};



