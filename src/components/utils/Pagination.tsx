import React from 'react';
import { Center } from './Containers';
import { AxiosStatic } from 'axios';
import { TablePagination, withStyles } from '@material-ui/core';

interface PaginationProps {
  page: number
  dataCount: number
  rowsPerPage: number
  classes: { caption: string }
  request: AxiosStatic
  handleChangePage: Function
  handleChangeRowsPerPage?: (event: any) => void
}

const Pagination = ({ classes, page, dataCount, rowsPerPage, handleChangeRowsPerPage, handleChangePage, request }: PaginationProps) => {

  return (
    <Center classes="mt-1">
      <TablePagination
        variant="caption"
        classes={{
          caption: classes.caption
        }}
        labelDisplayedRows={({ from, to, count, page }) => {
          if (from === 0 || to === 0 || dataCount === 0) {
            return `0-0 of Page ${page + 1}`
          }
          let p = page + 1;
          return `1-${dataCount} of Page ${isNaN(p) ? 1 : p}`
        }}
        backIconButtonProps={{
          id: 'backBtn'
        }}
        nextIconButtonProps={{
          id: 'nxtBtn'
        }}
        component="div"
        count={dataCount}
        page={page}
        rowsPerPage={rowsPerPage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPageOptions={[15]}
        onChangePage={(e, page) => {
          handleChangePage(e, page, request)
        }}
      />
    </Center>
  )
};






export default withStyles({
  caption: {
    fontSize: '20px'
  }
})(Pagination);

