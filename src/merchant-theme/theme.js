import { blue } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({

  palette: {
    primary: {
      main: blue[700]
    },
    secondary: {
      main: '#de4747'
    },
    default: {
      main: '#f50057'
    },
  },
  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        backgroundColor: '#de4747'
      }
    },
    MuiPickersYear: {
      // "&$selected": {
      //   color: "#de4747",
      // },
      selected: {
        color: "#de4747"
      }
    },
    MuiPickersDay: {
      current: {
        color: '#de4747',
      },
      selected: {
        backgroundColor: "#de4747 !important",
        color: "#fff",
      },
      // "&$selected": {
      //   backgroundColor: "#de4747 !important",
      //   color: "#fff",
      // }
    }
  }
});


export default theme;


