// Library imports
import React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

// Local imports
import { CustomCheckbox } from '../../shared';

const Cell = styled(TableCell)(({ theme }) => ({
  color: 'black',
  backgroundColor: 'transparent',
  fontSize: '12px',
  height: '40px',
  padding: '0px 10px',
}));

const SelectionCell = styled(TableCell)(({ theme }) => ({
  padding: '0px 10px',
}));

const TableHeader = ({
  rows,
  columns,
  selectedIds,
  setSelectedIds,
  tableColumnExtensions,
  noCheckbox,
  centerHeaderColumnName,
}) => {
  return (
    <React.Fragment>
      <TableHead
        sx={{
          position: 'sticky',
          top: 0,
          backgroundColor: 'white',
          zIndex: 1,
        }}
      >
        <TableRow>
          {selectedIds?.length > 0 ? (
            <SelectionCell width={'30px'}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  height: '40px',
                  pt: 0,
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'white',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    onClick={(event) => {
                      event.stopPropagation();
                      setSelectedIds([]);
                    }}
                    sx={{
                      width: 15,
                      height: 15,
                      borderRadius: '3px',  
                      backgroundColor: 'primary.main',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Box
                      sx={{
                        color: 'white',
                        fontSize: '24px',
                        pb: '2px',
                      }}
                    >
                      -
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      fontSize: 12,
                      ml: '5px',
                      color: 'black',
                      backgroundColor: 'white',
                      // p: 1,
                      pr: 2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {selectedIds?.length} Selected
                  </Box>
                </Box>
              </Box>
            </SelectionCell>
          ) : noCheckbox ? (
            ''
          ) : (
            <SelectionCell padding='10px 0px' width={'30px'}>
              <CustomCheckbox
                sx={{
                  '& .MuiSvgIcon-root': {
                    color: 'primary.lightGray',
                  },
                }}
                checked={Boolean(selectedIds?.length > 0 ? true : false)}
                onChange={() => {
                  if (selectedIds?.length === 0) {
                    setSelectedIds(() => rows?.map((row) => row?.id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />
            </SelectionCell>
          )}

          {columns?.map((col, colIndex) => {
            // GET COLUMN EXTENSION
            const columnExtension = tableColumnExtensions?.find(
              (item) => item?.columnName === col?.name
            );
            const width = columnExtension?.width || 100;
            return (
              <Cell
                key={colIndex}
                color={'primary.gray'}
                width={width || 100}
                style={{
                  paddingLeft: noCheckbox ? (colIndex === 0 ? '30px' : '') : '',
                  minWidth: width,
                  userSelect: 'none',
                  fontWeight: 'bold',
                  textAlign:
                    col?.name === 'status' ||
                    col?.name === 'action' ||
                    col?.name === centerHeaderColumnName
                      ? 'center'
                      : 'left',
                }}
              >
                {selectedIds?.length === 0 ? col?.title : ''}
              </Cell>
            );
          })}
        </TableRow>
      </TableHead>
    </React.Fragment>
  );
};

export default TableHeader;
