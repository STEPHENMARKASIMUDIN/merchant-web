import ValidationForm from './ValidationForm';


class MerchantPagination extends ValidationForm {



  // handleChangePage = (event, selectedPage) => {
  //   const { rowsPerPage, page } = this.state;
  //   const { id } = event.currentTarget;

  //   if (id === 'nxtBtn') {
  //     this.handleChangePaginationData(this.handleDataSlice(page, rowsPerPage, true), selectedPage)
  //   } else {
  //     this.handleChangePaginationData(
  //       this.handleDataSlice(page, rowsPerPage),
  //       selectedPage)
  //   }

  // }

  // handleChangeRowsPerPage = ({ target: { value } }) => {
  //   //const { page } = this.state;
  //   //const { min, max } = this.handleDataSlice(page, value, true);
  //   this.setState({
  //     rowsPerPage: value
  //   })
  // }




  // handleChangePaginationData = ({ min, max }, page) => {
  //   const paginationData = this.getPaginationData(min, max);

  //   this.setState({ page, paginationData })
  // }


  // handleDataSlice = (page = 1, rowsPerPage = this.state.rowsPerPage, isNxtBtn = false) => {
  //   const slice = {
  //     min: 1,
  //     max: rowsPerPage
  //   }
  //   if (isNxtBtn) {
  //     page = page + 2;
  //     if (page === 1) {
  //       return slice;
  //     } else {
  //       slice.max = rowsPerPage * page;
  //       return {
  //         ...slice,
  //         min: slice.max - (rowsPerPage - 1)
  //       }
  //     }
  //   } else {
  //     if (page === 1) {
  //       return slice;
  //     } else {
  //       slice.max = rowsPerPage * page;
  //       return {
  //         ...slice,
  //         min: slice.max - (rowsPerPage - 1)
  //       }
  //     }
  //   }

  // }

  // getPaginationData = (min, max) => this.state.data.slice(min, max + 1);



}

export default MerchantPagination;