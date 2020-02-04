import React, { Suspense, lazy } from 'react';
import classNames from 'classnames';
import BtnLink from '../utils/BtnLink';
import LoadingModal from '../utils/LoadingModal';


import { Grid } from '@material-ui/core';
import { Switch } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { ProtectedRoute } from '../utils';



const Orders = lazy(() => import('../orders'));
const Reports = lazy(() => import('../reports'));
const Products = lazy(() => import('../products'));
const Feedback = lazy(() => import('../feedback'));
const MyAccount = lazy(() => import('../my-account'));
const Dashboard = lazy(() => import('../dashboard'));
const AddProduct = lazy(() => import('../add-product'));
const EditProduct = lazy(() => import('../edit-product'));
const OrderDetails = lazy(() => import('../order-details'));
const MonthlyReport = lazy(() => import('../reports/reportTypes/Monthly'));
const ProductDetails = lazy(() => import('../product-details'));
const PaymentDetails = lazy(() => import('../payment-details'));
const PaymentReceived = lazy(() => import('../payment-received'));
const InventoryReport = lazy(() => import('../reports/reportTypes/Inventory'));
const SmartCollections = lazy(() => import('../smart-collections'));
const DailySalesReport = lazy(() => import('../reports/reportTypes/DailySales'));
const MonthlySalesReport = lazy(() => import('../reports/reportTypes/MonthlySales'));
const OrderInvoiceReport = lazy(() => import('../order-details/OrderInvoiceReport'))


const GuardedRoutes = ({ isAuth, classes, isDrawerOpen }) => {
  let loc = localStorage.getItem('loc');
  loc = loc ? loc : "/mlshopmerchant/dashboard";
  return (
    <Suspense fallback={<LoadingModal open />}>
      {
        isAuth === true ?
          <main className={classNames(classes.content, {
            [classes.contentShift]: isDrawerOpen
          })
          }>
            <Grid item container justify="flex-end" className="pl-2 pr-2 mt-5">
              <BtnLink
                color="secondary"
                variant="contained"
                label="Add Product"
                to="/mlshopmerchant/products/addProduct"
                classes="p-1"
              />
            </Grid>
            <Switch>
              <ProtectedRoute exact
                isAuth={isAuth}
                path="/mlshopmerchant/dashboard"
                Component={Dashboard} />

              <ProtectedRoute
                exact
                isAuth={isAuth}
                path="/mlshopmerchant/feedback"
                Component={Feedback} />

              <ProtectedRoute
                exact
                isAuth={isAuth}
                path="/mlshopmerchant/paymentReceived"
                Component={PaymentReceived} />

              <ProtectedRoute
                exact
                isAuth={isAuth}
                path="/mlshopmerchant/smartCollections"
                Component={SmartCollections} />

              <ProtectedRoute
                exact
                isAuth={isAuth}
                path="/mlshopmerchant/paymentDetails"
                Component={PaymentDetails} />

              <ProtectedRoute
                isAuth={isAuth}
                path="/mlshopmerchant/products"
                exact
                Component={Products}
              />
              <ProtectedRoute

                isAuth={isAuth}
                path="/mlshopmerchant/productDetails/:product_number"
                Component={ProductDetails}
              />
              <ProtectedRoute
                isAuth={isAuth}
                exact
                path="/mlshopmerchant/orders"
                Component={Orders}
              />

              <ProtectedRoute

                isAuth={isAuth}
                exact
                path="/mlshopmerchant/reports"
                Component={Reports}
              />


              <ProtectedRoute isAuth={isAuth} exact path="/mlshopmerchant/myAccount" Component={MyAccount} />
              <ProtectedRoute isAuth={isAuth} path="/mlshopmerchant/products/addProduct" Component={AddProduct} />
              <ProtectedRoute isAuth={isAuth} path="/mlshopmerchant/products/editProduct/:product_number" Component={EditProduct} />
              <ProtectedRoute exact isAuth={isAuth} path="/mlshopmerchant/orders/orderDetails/:order_no" Component={OrderDetails} />
              <ProtectedRoute exact isAuth={isAuth} path="/mlshopmerchant/orders/orderDetails/orderInvoice/:order_no/:order_id" Component={OrderInvoiceReport} />
              <ProtectedRoute exact Component={DailySalesReport} isAuth={isAuth} path={`/mlshopmerchant/reports/daily`} />
              <ProtectedRoute exact Component={MonthlyReport} isAuth={isAuth} path={`/mlshopmerchant/reports/monthly`} />
              <ProtectedRoute exact Component={MonthlySalesReport} isAuth={isAuth} path={`/mlshopmerchant/reports/monthlySales`} />
              <ProtectedRoute exact Component={InventoryReport} isAuth={isAuth} path={`/mlshopmerchant/reports/inventory`} />
              <Redirect from="/" to={loc} />
            </Switch>
          </main >
          : null
      }
    </Suspense>
  )
};




export default GuardedRoutes;