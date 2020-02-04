import React from 'react';
import CustomCheckBox from '../utils/CustomCheckBox';
import { Typography, Grid, Divider } from '@material-ui/core';
import { Container, Center, GridContainer } from '../utils/Containers';
import { MerchantFormField, InputFormMoney } from '../utils/Forms';


// interface EditVariantModalBodyProps {
//   variant_id: string
//   variant_title: string
//   sku: string
//   barcode: string
//   compare_at_price: string | number
//   price: string | number
//   weight: string | number
//   quantity: string | number
//   errors: {}
//   handleChange: Function
// }

const EditVariantModalBody = (props) => {
  const { variant_id, variant_title, sku, barcode, compare_at_price, price, weight, quantity, errors, handleChange } = props;

  return (
    <Container wantPaper={false} hasDefaultClasses={false}>
      <Grid item xs={6}>
        <Typography
          variant="h6"
          children="Options"
          className="text-primary float-left d-block" />
        <Center justify="flex-start" classes="pt-1">
          <MerchantFormField
            isSmall
            isText
            name="variant_title"
            value={variant_title}
            error={errors}
            label="Title"
            handleChange={handleChange}
          />
        </Center>
      </Grid>
      <Divider
        style={{ paddingTop: 1 }}
        className="mt-1"
        variant="fullWidth" />
      <Typography
        variant="h6"
        children="Pricing"
        className="text-primary float-left d-block" />
      <Grid item xs={12} container spacing={8} className="mt-1">
        <GridContainer splitByTwos>
          <Center justify="flex-start" classes="pt-1">
            <InputFormMoney
              size="small"
              withSymbol={false}
              fullWidth
              name="price"
              value={price}
              onChange={handleChange}
              formatValue={false}
              InputPropsClasses="pl-0"
              label="Price"
              errors={errors}
              isAutoFocus={false}
            />
          </Center>
          <Center justify="flex-end" classes="pt-1">
            <InputFormMoney
              size="small"
              fullWidth
              errors={errors}
              name="compare_at_price"
              withSymbol={false}
              value={compare_at_price}
              InputPropsClasses="pl-0"
              onChange={handleChange}
              formatValue={false}
              label="Compare at Price"
              isAutoFocus={false}
            />
          </Center>
        </GridContainer>
        <Grid item xs={12}>
          <CustomCheckBox label="Charges taxes on this variant" checkBClasses="p-1" />
        </Grid>
      </Grid>
      <Divider
        style={{ paddingTop: 1 }}
        className="mt-1"
        variant="fullWidth" />
      <Typography
        variant="h6"
        children="Inventory"
        className="text-primary float-left d-block" />
      <Grid item xs={12} container spacing={8} className="mt-1">
        <Grid item xs={6}>
          <Center justify="flex-start" classes="pt-1">
            <MerchantFormField
              isSmall
              handleChange={handleChange}
              isText
              InputProps={{
                maxLength: 20
              }}
              name="sku"
              value={sku}
              error={errors}
              label="SKU"
            />
          </Center>
        </Grid>
        <Grid item xs={6} style={{ marginTop: -32 }}>
          <Center justify="flex-start" classes="pt-1">
            <MerchantFormField
              isSmall
              handleChange={handleChange}
              isText
              value={barcode}
              InputProps={{
                maxLength: 20
              }}
              error={errors}
              name="barcode"
              classes="mt-2-0"
              label="Barcode"
            />
          </Center>
        </Grid>
        <Grid item xs={6} className="mt-1">
          <Center justify="flex-start">
            <MerchantFormField
              isSmall
              isText
              allowDigitsOnly
              disableCopyPaste
              handleChange={handleChange}
              value={quantity}
              error={errors}
              name="quantity"
              label="Quantiy"
            />
          </Center>
        </Grid>
      </Grid>

      <Divider
        style={{ paddingTop: 1 }}
        className="mt-1"
        variant="fullWidth" />
      <Grid item xs={12} container spacing={8} className="mt-1">
        <Grid item xs={6}>
          <Typography
            variant="h6"
            children="Shipping"
            className="text-primary float-left d-block" />
          <Center justify="flex-start" classes="pt-1">
            <MerchantFormField
              isSmall
              isText
              allowDigitsOnly
              Icon="kg"
              handleChange={handleChange}
              error={errors}
              value={weight}
              disableCopyPaste
              label="Weight"
              name="weight"
            />
          </Center>
        </Grid>
        <Grid item xs={12}>
          <CustomCheckBox label="Requires Shipping" checkBClasses="p-1" />
        </Grid>
      </Grid>
      <Divider
        style={{ paddingTop: 1 }}
        variant="fullWidth" />
    </Container>
  )
}




export default EditVariantModalBody;