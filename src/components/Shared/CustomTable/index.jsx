// Library Imports
import React, { useState, useRef, useEffect } from 'react';
import Table from '@mui/material/Table';
import { Box } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import { useSearchParams } from 'react-router-dom';

// Local Imports
import TableMainBody from './TableBody';
import TableHeader from './TableHeader';

export const CustomTable = ({
  rows,
  columns,
  tableColumnExtensions,
  dataProviders,
  onRowClick,
  metaData,
  noCheckbox,
  centerHeaderColumnName,
  noHeader,
}) => {
  // STATES
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(
    searchParams.get('page') ? parseInt(searchParams.get('page') - 1) : 0
  );

  const [rowsPerPage, setRowsPerPage] = useState(
    parseInt(searchParams.get('pageSize')) || 20
  );
  const handleChangePage = (event, newPage) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.set('page', newPage + 1);
      return params;
    });
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    const pageOfTotalRecords = Math.ceil(
      metaData?.total_record / event.target.value
    );
    const currentPage = parseInt(searchParams.get('page')) || 1;
    if (currentPage <= pageOfTotalRecords) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('pageSize', event.target.value);
        return params;
      });
      setRowsPerPage(event.target.value);
    }
  };

  const rowsToShow =
    rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) || [];

  return (
    <React.Fragment>
      <Box
        component={'div'}
        display={'flex'}
        flexDirection={'column'}
        height={'100%'}
        width={'100%'}
        overflow={'auto'}
      >
        <TableContainer
          component={Paper}
          elevation={0}
          sx={{
            height: 'calc(100% - 42px)',
            overflow: 'auto',
            borderRadius: 0,
          }}
        >
          <Table
            sx={{ minWidth: 650, tableLayout: 'fixed' }}
            size='small'
            aria-label='a dense table'
          >
            {noHeader ? null : (
              <TableHeader
                rows={rows}
                columns={columns}
                tableColumnExtensions={tableColumnExtensions}
                selectedIds={selectedIds}
                setSelectedIds={setSelectedIds}
                noCheckbox={noCheckbox}
                centerHeaderColumnName={centerHeaderColumnName}
              />
            )}

            {/* TABLE MAIN BODY ROWS */}
            <TableMainBody
              rows={metaData !== '' ? rows : rowsToShow}
              columns={columns}
              tableColumnExtensions={tableColumnExtensions}
              dataProviders={dataProviders}
              selectedIds={selectedIds}
              setSelectedIds={setSelectedIds}
              onRowClick={onRowClick}
              noCheckbox={noCheckbox}
            />
          </Table>
        </TableContainer>

        {metaData && (
          <TablePagination
            component='div'
            sx={{
              color: '',
              // borderTop: 'black',
              // height: '30px',
              overflow: 'hidden',
              '& .MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular': {
                display: 'flex',
                justifyContent: 'flex-start',
                margin: 0,
                paddingLeft: '13px',
                borderTop: '0px !important',
                backgroundColor: 'primary.cloudWhite',
                color: 'primary.darkGray',
              },
              '& .MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular > div:first-of-type':
                {
                  display: 'none',
                },
              '& .MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular > div:nth-of-type(3)':
                {
                  fontSize: '15px',
                  marginLeft: '15px',
                },
              '& .MuiToolbar-root.MuiToolbar-gutters.MuiToolbar-regular > p:nth-of-type(2)':
                {
                  fontSize: '12px',
                  marginLeft: 'auto',
                },
              '& .MuiTablePagination-actions button > svg': {
                fontSize: '20px',
              },
              '& .MuiSvgIcon-root': {
                // backgroundColor: gray,
                fill: 'primary.darkGray',
              },
            }}
            count={metaData?.total_record || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[20, 50, 100]}
          />
        )}
      </Box>
    </React.Fragment>
  );
};
