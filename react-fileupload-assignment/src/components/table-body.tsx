import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { Data } from './model';
import { columns } from "./table-config";

const TableBodyComp = (props: { data: Data[], page: number, rowsPerPage: number}) => {

    return (
        <TableBody>
        {
      props.data
          .slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
          .map((row) => {
            return (
              <TableRow key={row.invoiceId}>
                {columns.map((column) => {
                  const value = row[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.format && typeof value === 'number'
                        ? column.format(value)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
      </TableBody>
    );

}

export default TableBodyComp;