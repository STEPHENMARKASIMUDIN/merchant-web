import React, { Fragment, Component } from 'react';
import axios, { AxiosStatic, CancelTokenSource } from 'axios';
import theme from '../../merchant-theme/theme';
import classNames from 'classnames';
import styles from '../../merchant-theme/styles';
import Sidebar from '../utils/Sidebar';
import GuardedRoutes from '../routes/GuardedRoutes';
import ArrowUpNav from '../utils/ArrowNavUp';
import CustomPopper from '../utils/CustomPopper';
import { S, A } from '../../helpers/merchantTypes';
import { connect, } from 'react-redux';
import { dispatch } from '../../store';
import { History } from 'history';
import { axiosConfig } from '../../helpers';
import { requestImages } from '../../store/actions/my-account/myAccountActions';
import { ThunkDispatch } from 'redux-thunk';
import { ButtonBaseProps } from '@material-ui/core/ButtonBase';
import { MLShopMerchantState } from '../../helpers/reducersState';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { logout_user, toggle_drawer } from '../../store/actions';
import { togglePopUp, toggleUITheme } from '../../store/actions/actionHelpers';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TOGGLE_POPOUT_LOGOUT, TOGGLE_NAVUP } from '../../store/actionTypes';
import { ShoppingBasket, AccountCircle, Menu as MenuIcon, Brightness3Rounded as Moon } from '@material-ui/icons';
import {
  AppBar, Typography, Toolbar, MuiThemeProvider, withStyles, IconButton,
  Tooltip, Badge, Button, StyleRulesCallback
} from '@material-ui/core';


interface NavbarProps {
  isAuth: boolean
  isAppMounted: boolean
  showNavUp: boolean
  history: History
  isDarkTheme: boolean
  toggleNavUp: () => any
  requestImages: (request: AxiosStatic) => void
  classes: {
    appBar: string
    appBarShift: string
  }
  log_out: (h: History, req: AxiosStatic, shopName: string) => any
  productsCount: number
  shopName: string
  toggle_drawer: () => any
  togglePopover: () => any
  toggleTheme: () => any
  isDrawerOpen: boolean
  showPopUpLogout: boolean
}

interface NavbarState {
  anchorEl: null | React.ElementType
}


class Navbar extends Component<RouteComponentProps & NavbarProps, NavbarState> {

  state = {
    anchorEl: null
  }


  request = axios;
  _isMounted: boolean
  cancelToken: CancelTokenSource
  componentDidMount = () => {
    this.request = axiosConfig(this, dispatch);
    this.cancelToken = this.request.CancelToken.source();
    if (this.props.isAuth) {
      this.props.requestImages(this.request);
    }
    document.addEventListener('scroll', this.onScroll);
  }

  componentWillUnmount = () => {
    this.cancelToken.cancel('canceled');
    document.removeEventListener('scroll', this.onScroll);
  }


  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.isAuth !== this.props.isAuth) {
      if (this.props.isAuth) {
        this.props.requestImages(this.request);
      }
    }
    if (prevProps.isAppMounted !== this.props.isAppMounted) {
      if (this.props.isAppMounted) {
        this.props.requestImages(this.request);
      }
    }
  }



  onScroll = () => {
    const currentScrollHeight = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScrollHeight > 100 && !this.props.showNavUp) {
      this.props.toggleNavUp();
    } else if (currentScrollHeight < 100 && this.props.showNavUp) {
      this.props.toggleNavUp();
    }
  }

  handleTogglePopOver = ({ currentTarget }) => {
    this.props.togglePopover()
    this.setState((prevState, props) => ({
      anchorEl: currentTarget
    }))
  }


  getToolTipMessage = (count) => {
    return `You got ${count === 0 ? '0 products' : count === 1 ? '1 product' : count + ' products'}`;
  }

  toggleTheme = () => {
    const body = document.body;
    if (body.classList.contains('dark-theme')) {
      body.classList.remove('dark-theme');
      this.props.toggleTheme();
    } else {
      body.classList.add('dark-theme');
      this.props.toggleTheme();
    }
  }


  ThemeToggler = ({ message, color }) => {
    return (
      <Tooltip title={message}
        placement="bottom">
        <IconButton onClick={this.toggleTheme}>
          <Moon
            className="theme-icon"
            style={{
              color
            }}
          />
        </IconButton>
      </Tooltip>
    )
  }

  render() {
    const { classes, isAuth, log_out, productsCount,
      shopName, toggle_drawer, isDrawerOpen, showPopUpLogout, showNavUp, isDarkTheme } = this.props;
    const { anchorEl } = this.state;
    const toolTipMessage = this.getToolTipMessage(productsCount);
    const message = isDarkTheme ? 'Light Theme' : 'Dark Theme';
    const color = isDarkTheme ? '#fff176' : '#424242'

    return (
      <MuiThemeProvider theme={theme}>
        <div >
          <AppBar position={!isAuth ? "static" : "fixed"}
            color="secondary"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: isDrawerOpen
            })}>
            <Toolbar>
              {isAuth ?
                <IconButton
                  onClick={toggle_drawer}
                  color="inherit">
                  <MenuIcon
                  />
                </IconButton>
                : null
              }
              <Typography
                color="inherit"
                variant="h5"
                children="ML Shop"
                style={{ fontSize: 30, fontWeight: 300, flexGrow: 1 }}
              />
              {
                isAuth ?
                  (<Fragment>
                    <this.ThemeToggler
                      message={message}
                      color={color}
                    />
                    <Tooltip title={toolTipMessage}
                      style={{ backgroundColor: '#de4747' }}>
                      <IconButton className="badge-color" color="inherit"
                        component={(props: ButtonBaseProps & NavLinkProps) => <NavLink to="/mlshopmerchant/products" {...props} />}
                      >
                        <Badge badgeContent={productsCount}
                          color="default">
                          <ShoppingBasket />
                        </Badge>
                      </IconButton>
                    </Tooltip>

                    <Tooltip title={shopName} placement="bottom">
                      <IconButton color="inherit"
                        component={(props: ButtonBaseProps & NavLinkProps) => <NavLink to="/mlshopmerchant/myAccount" {...props} />}
                      >
                        <AccountCircle />
                      </IconButton>

                    </Tooltip>

                    <Button color="inherit"
                      onClick={this.handleTogglePopOver}
                      aria-describedby="logout"
                      variant="outlined">
                      Logout
                    </Button>
                    <CustomPopper
                      label="Are you sure?"
                      confirmCallback={() => { log_out(this.props.history, this.request, shopName) }}
                      anchorEl={anchorEl}
                      id="logout"
                      handleTogglePopOver={this.handleTogglePopOver}
                      showPopUp={showPopUpLogout}
                    />
                  </Fragment>) : <this.ThemeToggler message={message}
                    color={color} />
              }
            </Toolbar>
          </AppBar>
          {isAuth ? <Sidebar
            open={isDrawerOpen}
          /> : null}
        </div>
        <GuardedRoutes
          isAuth={isAuth}
          classes={classes}
          isDrawerOpen={isDrawerOpen}
        />
        <ArrowUpNav isIn={showNavUp} />

      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = ({ auth, merchant_details, toggle, popUps }: MLShopMerchantState) => ({
  isAuth: auth.isAuth,
  productsCount: merchant_details.merchantData.products,
  shopName: merchant_details.merchantData.shop_name,
  isDrawerOpen: toggle.showDrawer,
  showPopUpLogout: popUps.showPopUpLogout,
  showNavUp: popUps.showNavUp,
  isAppMounted: toggle.isAppMounted,
  isDarkTheme: toggle.isDarkTheme
});

const mapDispatchToProps = (dispatch: ThunkDispatch<MLShopMerchantState, S, A>) => ({
  log_out: (history: History, req: AxiosStatic, shopName: string) => dispatch(logout_user(history, req, shopName)),
  toggle_drawer: () => dispatch(toggle_drawer()),
  togglePopover: () => dispatch(togglePopUp(TOGGLE_POPOUT_LOGOUT)),
  toggleNavUp: () => dispatch(togglePopUp(TOGGLE_NAVUP)),
  requestImages: (request: AxiosStatic) => dispatch(requestImages(request)),
  toggleTheme: () => dispatch(toggleUITheme())
});








export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as StyleRulesCallback, { withTheme: true })(Navbar)));