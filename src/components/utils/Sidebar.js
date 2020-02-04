import React, { Component, Fragment } from 'react';
import styles from '../../merchant-theme/styles';
import ProfileAvatar from './ProfileAvatar';
import { connect } from 'react-redux';
import { Center } from './Containers';
import { NavLink, withRouter } from 'react-router-dom';
import {
  ShoppingBasket,
  Dashboard, ListAlt,
  Person, Payment, Star, RssFeed, ShoppingCartRounded,
  Input, AssignmentOutlined
} from '@material-ui/icons';
import { Drawer, withStyles, ListItem, ListItemIcon, ListItemText, Divider, Typography, List } from '@material-ui/core';
import classNames from 'classnames';


const SidebarItem = ({ Icon, label, to }) => (
  <Fragment>
    <ListItem button
      className="hoverListDrawer"
      component={props => <NavLink
        isActive={(match, location) => {
          const pathname = location.pathname.toLowerCase();
          if (match) {
            const matchUrl = match.url.toLowerCase();

            if (matchUrl === pathname) {
              return "active-sidebar-item"
            }
            else if (pathname.includes('reports')) {
              return "active-sidebar-item"
            }
            else if (pathname.includes('product')) {
              return "active-sidebar-item"
            } else if (pathname.includes('orders')) {
              return "active-sidebar-item"
            }
          } else {
            return "";
          }

        }}
        activeClassName="active-sidebar-item"
        to={to} {...props} />}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={label} />
    </ListItem>
    <Divider />
  </Fragment>
);



class Sidebar extends Component {

  sidebarProps = [
    {
      label: 'Dashboard',
      Icon: Dashboard,
      to: '/mlshopmerchant/dashboard'
    }, {
      label: 'Products',
      Icon: ShoppingBasket,
      to: '/mlshopmerchant/products'
    },
    {
      label: 'Orders',
      Icon: ListAlt,
      to: '/mlshopmerchant/orders'
    },
    {
      label: 'My Account',
      Icon: Person,
      to: '/mlshopmerchant/myAccount'
    }, {
      label: 'Payment Details',
      Icon: Payment,
      to: '/mlshopmerchant/paymentDetails'
    },
    {
      label: 'Payment Received',
      Icon: Input,
      to: '/mlshopmerchant/paymentReceived'
    }, {
      label: 'Smart Collections',
      Icon: Star,
      to: '/mlshopmerchant/smartCollections'
    }, {
      label: 'Feedback',
      Icon: RssFeed,
      to: '/mlshopmerchant/feedback'
    }, {
      label: 'Reports',
      Icon: AssignmentOutlined,
      to: '/mlshopmerchant/reports'
    }
  ]


  render() {
    const { open, classes, profilePath, shopName } = this.props;

    return (
      <Drawer open={open} anchor="left"
        className={classNames(classes.drawer, 'side-parent')}
        classes={{
          paper: classes.drawerPaper
        }}

        variant="persistent">
        <div id="side-drawer">
          <Center className="primary-color pt-2 image-sidebar">
            <ProfileAvatar src={profilePath} size={100} />
            <Typography
              className="text-whito pt-1"
              align="center"
              children={shopName}
            />
          </Center>
          <div className={classes.drawerHeader}>
            <ShoppingCartRounded color="inherit" fontSize="large" />
            <Typography variant="h5" children="Marketplace"
              color="inherit" className={classes.drawerHeaderH5} />
          </div>
          <List id="sideBar">
            {this.sidebarProps.map(o => (
              <SidebarItem
                key={o.label}
                Icon={o.Icon}
                label={o.label}
                to={o.to}
              />
            ))}
          </List>
        </div>
      </Drawer>
    )
  }
};



const mapStateToProps = ({ image: { profilePath }, merchant_details: { merchantData } }) => ({
  profilePath,
  shopName: merchantData.shop_name
});




const EnhancedSidebar = withRouter(connect(mapStateToProps)(withStyles(styles, { withTheme: true })(Sidebar)));

export default EnhancedSidebar;
