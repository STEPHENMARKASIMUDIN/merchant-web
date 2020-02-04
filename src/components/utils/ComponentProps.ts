export interface SnackBProps {
  snackBarProps: {
    message: string
    open: boolean
    variant: string
  }
}


export const snackBarProps: SnackBProps = {
  snackBarProps: {
    message: '',
    open: false,
    variant: 'success'
  }
};


