
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import service from './service';
import TableBodyComp from './table-body';
import { Data } from './model';
import { columns } from './table-config';
   
const TableData = (props: { data: Data[]; totalPages: number }) => { 
      const [page, setPage] = React.useState(0);
      const rowsPerPage = 10;
      const [data, setData] = React.useState<Data []>([]);
      const handleChangePage = (event: unknown, newPage: number) => {
        console.log(newPage)
        setPage(newPage);
        service.getFileData(newPage, rowsPerPage).then((response)=>{
            if(response.status ===200) {
               let res = data.concat(response.data.content);
               setData(res);
            }
         }); 
      };
    
      return (
        <Paper sx={{ width: '100%' }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ top: 57, minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBodyComp data={data.length>0?data : props.data}  page={page} rowsPerPage={rowsPerPage}/>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={props.totalPages}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
          />
        </Paper>
      );
    }

export default TableData;