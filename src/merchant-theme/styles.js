//import { makeStyles, install } from '@material-ui/styles';
import { green, red, amber, blue } from '@material-ui/core/colors';
import { CheckCircle as CheckCircleIcon, Error as ErrorIcon, Warning, Info } from '@material-ui/icons';


const drawerWidth = 260;
//const paperWidth = 750;
const w = {
  width: drawerWidth
}


const styles = theme => ({
  appBar: {
    padding: '5px 0px',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter,
    }),
  },
  drawer: {
    flexShrink: 0,
    ...w
  },
  drawerPaper: {
    ...w,
    borderRight: '0'
  },
  paper: {
    ...theme.mixins.gutters(),
    padding: theme.spacing.unit * 2,
  },
  drawerOpen: {
    ...w,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shortest
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    ...theme.mixins.toolbar,
    padding: '5px 18px;',
    backgroundColor: '#de4747',
    color: 'white',
    boxShadow: `0px 4px 5px 0px rgba(0, 0, 0, 0.14)`
  },

  drawerHeaderH5: {
    paddingLeft: '21px'
  },
  avatarIcon: {
    fontSize: '27px',
    backgroundColor: 'none !important'
  },
  root: {
    border: '1px solid #cec8c8',
    paddingTop: 15,
    paddingRight: 28,
    paddingLeft: 28,
    paddingBottom: 50,
    marginTop: '8%',
    minHeight: '54em'
  },
  titleDashboard: {
    paddingBottom: 10
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -3,
  },
  contentShift: {
    transition: theme.transitions.create('margin-left', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 270,
  },
  mlMarginTop: {
    marginTop: 25
  },
  borderBottomRed: {
    borderBottom: '2px solid #de4747',
  },
  columnFont: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#161616'
  },
  accountInfo: {
    padding: '5px 10px !important',
    border: '1px solid #cec8c8 !important',
    height: 'auto !important'
  },
  expansionHeading: {
    fontSize: '18px',
    flexBasis: '50%',
    fontWeight: 'bold',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: '14px',
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  hide: {
    display: 'none',
  },
  popover: {
    pointerEvents: 'none'
  },

  //For Reports
  reportTypesRoot: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  reportMedia: {
    height: 200,
    width: 250
  },
  reportCard: {
    maxWidth: 300,
    width: '30rem'
  },
  reportsRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    midWidth: 300,
    width: '100%'
  },
  image: {
    position: 'relative',
    height: 200,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important',
      height: 100
    },
    '&:hover &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid currentColor',
      },
      '& $imageButton': {
        color: 'red'
      }
    },
  },
  focusVisible: {},
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
  },
  imageBackdrop: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    opacity: 0.7,
    transition: theme.transitions.create('opacity'),
  },
  imageTitle: {
    position: 'relative',
    color: 'black',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`,
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },


  //ChipsArray
  tagRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: 4,
  },
  chip: {
    margin: 4,
  },
});


const SnackBIcon = {
  success: CheckCircleIcon,
  error: ErrorIcon,
  warning: Warning,
  info: Info,
  default: Info
};

const snackBarVariant = {
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: red[900]
  },
  warning: {
    backgroundColor: amber[800]
  },
  info: {
    backgroundColor: blue[700]
  },
  default: {

  }
};




export {
  SnackBIcon,
  snackBarVariant
}

export default styles;