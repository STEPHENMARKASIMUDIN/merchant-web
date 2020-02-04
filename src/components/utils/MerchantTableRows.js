import React, { Fragment, Component } from 'react';
import Image from 'material-ui-image';
import NoImage from '../../images/no_image.png';
import CustomChip from './CustomChip';
import MDatePicker from './Pickers';
import CustomSelect from './CustomSelect';
import CustomPopper from './CustomPopper';
import CustomPopover from './CustomPopover';
import { dispatch } from '../../store';
import { IconTooltip } from './IconUpload';
import { MerchantFormField } from './Forms';
import { Visibility, Delete, Edit } from '@material-ui/icons';
import { Paper, TableCell, TableRow, Typography } from "@material-ui/core";
import { isLengthValid, isItemAvailable, formatAndConvertToDate, toCurrency } from '../../helpers';
import { openVariantModal } from '../../store/actions/actionHelpers';


const VariantTableRow = ({ d }) => (
  <TableRow>
    <TableCell>
      <Image
        className="product-image"
        src={!d.images.length ? NoImage : d.mainImage}
        alt="Product Image"
      />
    </TableCell>
    <TableCell>
      {isItemAvailable(d.variant_title)}
    </TableCell>
    <TableCell>
      {
        (isItemAvailable(d.price) === 'N/A') ? '₱0.00'
          : `₱${d.price}`
      }
    </TableCell>
    <TableCell>
      {isItemAvailable(d.weight)}
    </TableCell>
    <TableCell>
      {isItemAvailable(d.quantity)}
    </TableCell>
    <TableCell>
      <IconTooltip
        MIcon={Edit}
        title="Edit Variant"
        iconClasses="icon-product tooltip-btn"
        handleClick={() => {
          let newData = { ...d };
          delete newData['mainImage'];
          dispatch(openVariantModal(newData))
        }}
      />
    </TableCell>
  </TableRow>
)


class FormFields extends Component {

  state = {
    state: {
      date: new Date()
    }
  }


  handleDChange = (d, name) => {
    this.setState({
      state: {
        date: formatAndConvertToDate(d)
      }
    })
  }

  render() {
    const { isPaymentReceived } = this.props;
    return (
      <Fragment>
        <TableCell>
          <MerchantFormField isNormal
            name="id"
            error={{}}
            isText
            handleChange={(e) => { console.log(e) }} />
        </TableCell>
        <TableCell>
          <MerchantFormField isNormal
            name="customer_name"
            error={{}}
            isText
            handleChange={(e) => { console.log(e) }} />
        </TableCell>
        <TableCell className={isPaymentReceived ? 'd-none' : ''}>
          <MerchantFormField isNormal
            name="seller_rating"
            error={{}}
            isText
            handleChange={(e) => { console.log(e) }} />
        </TableCell>
        <TableCell>
          <MDatePicker
            name="date"
            state={this.state.state}
            errors={{}}
            handleDChange={this.handleDChange}
          />
        </TableCell>
      </Fragment>
    )
  }
}

class PaymentReceivedRow extends Component {

  state = {
    value: ''
  }


  render() {
    const { isPaymentReceived } = this.props;
    return (
      <TableRow>
        <FormFields isPaymentReceived={isPaymentReceived} />
        <TableCell>
          <CustomSelect
            value={this.state.value}
            name="select_payment_received"
            handleChange={(e) => { this.setState({ value: e.target.value }) }}
            notRequired
            options={[{
              label: 'Transit',
              value: 'Transit'
            }, {
              label: 'Success',
              value: 'Success'
            }, {
              label: 'Cancel',
              value: 'Cancel'
            }]}
          />
        </TableCell>
      </TableRow>
    )
  }
}

const FeedbackRow = ({ d }) => (
  <TableRow>
    <FormFields />
  </TableRow>
)

const DashboardRow = ({ d: { order_no, date, customer_name, order_total, status } }) => (
  <TableRow hover>
    <TableCell>
      {isItemAvailable(order_no)}
    </TableCell>
    <TableCell>
      {formatAndConvertToDate(date, 'YYYY-MM-dd hh:mm:ss a')}
    </TableCell>
    <TableCell>
      {isItemAvailable(customer_name)}
    </TableCell>
    <TableCell>
      {isItemAvailable(toCurrency(order_total))}
    </TableCell>
    <TableCell>
      <CustomChip status={status} />
    </TableCell>
  </TableRow>
)

const SmartCollectionsRow = ({ d }) => {
  return (
    <TableRow hover>
      <Fragment>
        <TableCell>
          <Paper
            className="paper-img" >
            <Image
              src={d.imgSrc} alt={d.title} />
          </Paper>
        </TableCell>
        <TableCell>
          <Typography
            children={d.title}
          />
        </TableCell>
        <TableCell>
          <Typography
            children={d.desc1}
          />
          <Typography
            children={d.desc2}
          />
        </TableCell>
      </Fragment>
    </TableRow>
  )
}


class ProductsRow extends Component {


  state = {
    anchorEl: null,
    showPopUp: false
  }



  handleTogglePopOver = ({ currentTarget }) => {
    this.setState(state => ({
      showPopUp: !state.showPopUp,
      anchorEl: currentTarget
    }))
  }

  render() {
    const { d, deleteCB, request, page } = this.props;

    let prod_name = this.checkLengthProdName(d);

    return (
      <TableRow hover>
        <TableCell>
          {d.product_number}
        </TableCell>
        <TableCell align="center">
          {isItemAvailable(d.created_at)}
        </TableCell>
        <TableCell className="product-img">
          <Image
            className="product-image"
            src={!d.imagePath ? NoImage : d.imagePath}
            alt="Product Image"
          />
          {/* <Image
            className="product-image"
            src={!d.image ? NoImage : d.image}
            alt="Product Image"
          /> */}
        </TableCell>
        <TableCell className="pl-0 pr-0">
          {prod_name}
        </TableCell>
        <TableCell>
          {isItemAvailable(d.product_type)}
        </TableCell>
        <TableCell>
          {`₱${d.price}`}
        </TableCell>
        <TableCell>
          {d.quantity}
        </TableCell>
        <TableCell style={{ paddingRight: 0 }}>
          {isItemAvailable(d.status)}
        </TableCell>
        <TableCell colSpan={2} className="td-icons">
          <div>
            <IconTooltip
              MIcon={Visibility}
              title="View"
              iconClasses="icon-product tooltip-btn"
              isLink
              linkProps={{
                to: "/mlshopmerchant/productDetails/" + d.product_number
              }}
            />
            <IconTooltip
              MIcon={Delete}
              title="Delete"
              handleClick={this.handleTogglePopOver}
              iconClasses="icon-product tooltip-btn"
            />
            <CustomPopper
              placement="bottom"
              label="Are you sure?"
              confirmCallback={() => { deleteCB(request, d.product_number, d.image, page) }}
              anchorEl={this.state.anchorEl}
              handleTogglePopOver={this.handleTogglePopOver}
              showPopUp={this.state.showPopUp}
            />
            <IconTooltip
              MIcon={Edit}
              title="Edit"
              isLink
              linkProps={{
                to: "/mlshopmerchant/products/editProduct/" + d.product_number
              }}
              iconClasses="icon-product tooltip-btn"
            />
          </div>
        </TableCell>
      </TableRow>
    )
  }

  checkLengthProdName(d) {
    let prod_name = isItemAvailable(d.product_name);
    if (!isLengthValid(prod_name)) {
      prod_name = <CustomPopover isHover content={prod_name} btnLabel="Show" />;
    }
    return prod_name;
  }
}
const OrderEarningsRow = ({ d: { order_no, date, product_earnings, shipping_charge, tax_charge, total_order } }) => {

  return (
    <TableRow id={order_no}>
      <TableCell>
        {isItemAvailable(order_no)}
      </TableCell>
      <TableCell>
        {isItemAvailable(date) === 'N/A' ? 'N/A'
          : formatAndConvertToDate(new Date(date), 'YYYY-MM-dd hh:mm:ss a')}
      </TableCell>
      <TableCell>
        {toCurrency(isItemAvailable(product_earnings))}
      </TableCell>
      <TableCell>
        {toCurrency(isItemAvailable(shipping_charge))}
      </TableCell>
      <TableCell>
        {toCurrency(isItemAvailable(tax_charge))}
      </TableCell>
      <TableCell>
        {toCurrency(isItemAvailable(total_order))}
      </TableCell>
    </TableRow>
  )
}
const OrdersRow = ({ d: { order_no, date, customer_name, payment_mode, payment_status, fulfillment_status } }) => {
  //console.log(format(date, 'dd-MMM-yyyy'));

  return (
    <TableRow hover>
      <TableCell>
        {isItemAvailable(order_no)}
      </TableCell>
      <TableCell>
        {isItemAvailable(date) === 'N/A' ? 'N/A'
          : formatAndConvertToDate(new Date(date), 'YYYY-MM-dd hh:mm:ss a')}
      </TableCell>
      <TableCell>
        {isItemAvailable(customer_name)}
      </TableCell>
      <TableCell>
        {isItemAvailable(payment_mode)}
      </TableCell>
      <TableCell>
        {isItemAvailable(payment_status)}
      </TableCell>
      <TableCell>
        {isItemAvailable(fulfillment_status)}
      </TableCell>
      <TableCell className="td-icons">
        <IconTooltip
          MIcon={Visibility}
          title="View Order Details"
          iconClasses="icon-product tooltip-btn"
          isLink
          linkProps={{
            to: "/mlshopmerchant/orders/orderDetails/" + order_no
          }}
        />
      </TableCell>
    </TableRow>
  )
};
const OrderInvoiceRow = ({ d }) => (
  <TableRow >
    <TableCell>{isItemAvailable(d.name)}</TableCell>
    <TableCell>{toCurrency(isItemAvailable(d.price))}</TableCell>
    <TableCell>{isItemAvailable(d.sku)}</TableCell>
    <TableCell>{isItemAvailable(d.quantity)}</TableCell>
    <TableCell>{toCurrency(isItemAvailable(d.price))}</TableCell>
  </TableRow>
);

const OrderDetailsRow = ({ d }) => (
  <TableRow >
    <TableCell>{isItemAvailable(d.id)}</TableCell>
    <TableCell>{isItemAvailable(d.name)}</TableCell>
    <TableCell>{isItemAvailable(d.sku)}</TableCell>
    <TableCell>{toCurrency(isItemAvailable(d.quantity))}</TableCell>
    <TableCell>{toCurrency(isItemAvailable(d.price))}</TableCell>
  </TableRow>
)
const OrderDetailsFooterRow = ({ totalShipping, totalPrice }) => (
  <Fragment>
    <TableRow>
      <TableCell colSpan="3" style={{ borderBottom: 0 }} />
      <TableCell colSpan="1" align="right" className="bold">
        Seller Shipping
    </TableCell>
      <TableCell colSpan="1" align="left">
        {toCurrency(isItemAvailable(totalShipping))}
      </TableCell>
    </TableRow>
    <TableRow>
      <TableCell colSpan="3" style={{ borderBottom: 0 }} />
      <TableCell colSpan="1" align="right" className="bold">
        Order Total
      </TableCell>
      <TableCell colSpan="1" align="left">
        {toCurrency(isItemAvailable(totalPrice))}
      </TableCell>
    </TableRow>
  </Fragment>
)


export {
  OrdersRow,
  ProductsRow,
  FeedbackRow,
  DashboardRow,
  OrderInvoiceRow,
  OrderDetailsRow,
  VariantTableRow,
  OrderEarningsRow,
  PaymentReceivedRow,
  SmartCollectionsRow,
  OrderDetailsFooterRow,
}



// const ProductsRow = ({ d }) => {
//   let prod_name = d.product_name ? d.product_name : 'N/A';

//   if (!isLengthValid(prod_name)) {
//     prod_name = <CustomPopover
//       isHover
//       content={prod_name}
//       btnLabel="Show"
//     />
//   }

//   return (
//     <TableRow hover>
//       <TableCell>
//         {d.product_number}
//       </TableCell>
//       <TableCell align="center">
//         {isItemAvailable(d.upload_date)}
//       </TableCell>
//       <TableCell className="product-img">
//         <Image
//           className="product-image"
//           src={!d.image ? NoImage : d.image}
//           alt="Product Image"
//         />
//       </TableCell>
//       <TableCell className="pl-0 pr-0">
//         {prod_name}
//       </TableCell>
//       <TableCell>
//         {isItemAvailable(d.product_type)}
//       </TableCell>
//       <TableCell>
//         {`${toCurrency(isItemAvailable(d.price))}`}
//       </TableCell>
//       <TableCell>
//         {isItemAvailable(d.quantity)}
//       </TableCell>
//       <TableCell style={{ paddingRight: 0 }}>
//         {isItemAvailable(d.status)}
//       </TableCell>
//       <TableCell colSpan={2} className="td-icons">
//         <div>
//           <IconTooltip
//             MIcon={Visibility}
//             title="View"
//             iconClasses="icon-product tooltip-btn"
//             isLink
//             linkProps={{
//               to: "/productDetails/" + d.product_number
//             }}
//           />
//           <IconTooltip
//             MIcon={Delete}
//             title="Delete"
//             iconClasses="icon-product tooltip-btn"
//           />
//           <CustomPopover>

//           </CustomPopover>
//           <IconTooltip
//             MIcon={Edit}
//             title="Edit"
//             iconClasses="icon-product tooltip-btn"
//           />
//         </div>
//       </TableCell>
//     </TableRow>
//   )
// }