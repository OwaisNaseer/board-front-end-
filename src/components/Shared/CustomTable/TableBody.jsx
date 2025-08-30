// Library Imports
import React from "react";
import TableBody from "@mui/material/TableBody";
import { styled } from "@mui/material/styles";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

// Local Imports
import { CustomCheckbox, NoDataFound } from "../../Shared";

const BodyCell = styled(TableCell)(({ theme }) => ({
  color: "black",
  fontSize: "12px",
  height: 20,
  width: "30px",
}));

const BodyRow = styled(TableRow)(({ theme }) => ({
  backgroundColor: "transparent",
}));

const TableMainBody = ({
  rows,
  columns,
  selectedIds,
  setSelectedIds,
  tableColumnExtensions,
  dataProviders,
  onRowClick,
  noCheckbox,
}) => {
  return (
    <React.Fragment>
      <TableBody>
        {rows?.length > 0 ? (
          rows?.map((row, rowIndex) => {
            const id = row?.id;
            const isRowSelected = selectedIds?.includes(id);
            const onChange = () => {
              const ids = isRowSelected
                ? selectedIds?.filter((ele) => ele !== id)
                : [...selectedIds, id];
              setSelectedIds(ids);
            };

            return (
              <BodyRow
                key={rowIndex}
              // sx={{
              //   borderBottom: "1px solid #D8D6DE",
              // }}
              >
                {noCheckbox ? (
                  ""
                ) : (
                  <BodyCell sx={{ padding: "10px 10px" }}>
                    <CustomCheckbox
                      checked={Boolean(isRowSelected)}
                      onChange={onChange}
                      sx={{
                        "& .MuiSvgIcon-root": {
                          color: isRowSelected
                            ? "primary.main"
                            : "primary.lightGray",
                        },
                        "&.Mui-checked": {
                          color: "primary.main",
                        },
                        "&.MuiCheckbox-root": {
                          color: "primary.lightGray",
                        },
                      }}
                    />
                  </BodyCell>
                )}
                {columns?.map((col, colIndex) => {
                  const columnExtension = tableColumnExtensions?.find(
                    (item) => item?.columnName === col?.name
                  );
                  const width = columnExtension?.width || 100;
                  const dataProvider = dataProviders?.find(
                    (provider) => provider?.columnName[0] === col?.name
                  );
                  return (
                    <BodyCell
                      key={colIndex}
                      color={"primary.gray"}
                      width={width}
                      style={{
                        minWidth: "100%",
                        maxWidth: width,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        userSelect: "none",
                        padding: "10px 10px",
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                        if (col?.name !== "action") {
                          onRowClick(row);
                        }
                      }}
                      sx={{
                        cursor:
                          col?.name !== "action"
                            ? "pointer"
                            : "unset",
                      }}
                    >
                      {dataProvider !== undefined
                        ? dataProvider?.func({ row: row })
                        : row[col?.name]}
                    </BodyCell>
                  );
                })}
              </BodyRow>
            );
          })
        ) : (
          <BodyRow>
            <BodyCell
              colSpan={columns?.length + 1}
              sx={{ textAlign: "center", py: 3 }}
            >
              <NoDataFound />
            </BodyCell>
          </BodyRow>
        )}
      </TableBody>
    </React.Fragment>
  );
};

export default TableMainBody;
