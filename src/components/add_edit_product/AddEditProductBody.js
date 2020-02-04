import React from 'react';
import Header from '../utils/Header';
import CustomSelect from '../utils/CustomSelect';
import CustomCheckBox from '../utils/CustomCheckBox';
import TagComponent from '../utils/Tags';
import { Editor } from '@tinymce/tinymce-react';
import { Grid, Typography } from '@material-ui/core';
import { GridContainer, Container, Center } from '../utils/Containers';
import { MerchantFormField, InputFormMoney } from '../utils/Forms';


const opts =
  [{
    label: 'FOOD & BEVERAGES',
    value: 'FOOD & BEVERAGES'
  }, {
    label: 'JEWELRY',
    value: 'JEWELRY',
  }, {
    label: 'MOBILE PHONE ACCESSORIES',
    value: 'MOBILE PHONE ACCESSORIES'
  }, {
    label: 'OFFICE & SUPPLIES',
    value: 'OFFICE & SUPPLIES'
  }, {
    label: 'OTHER PAWNABLE ITEMS (OPI)',
    value: 'OTHER PAWNABLE ITEMS (OPI)'
  }];



const AddEditProductBody = ({ handleChange, data, errors, labelWidth, id, context }) => {
  const upperType = data.product_type.replace('and', '&').toUpperCase();
  let tags = data.product_tags;
  if (id === 'edit-product-body') {
    tags = data.tags;
  }

  return (
    <Container wantPaper={false} isChildContainer={true} spacing={32}>
      <GridContainer>
        <MerchantFormField
          label="Product Name"
          name="product_name"
          error={errors}
          value={data.product_name}
          handleChange={handleChange}
          isText
          isNormal
        />

      </GridContainer>
      <GridContainer >
        <CustomSelect
          name="product_type"
          handleChange={({ target: { name, value } }) => {
            handleChange({ target: { id: name, value } })
          }}
          context={context}
          selectLabel={"Product Type"}
          labelWidth={labelWidth}
          defaultSelectVal="Choose a Product Type"
          options={opts}
          value={upperType}
        />
      </GridContainer>
      <GridContainer>
        <Editor
          onEditorChange={(value) => {
            handleChange({ target: { id: 'description', value } })
          }}
          value={data.description}
          id="description"
        />
      </GridContainer>
      <GridContainer>
        <TagComponent tags={tags} id={id} />
      </GridContainer>
      <GridContainer>
        <Header
          label="Shipping"
          labelColor="text-primary"
          variant="h6"
          dividerClass="divider-brown"
        />
      </GridContainer>
      <GridContainer>
        <MerchantFormField
          label="Weight"
          name="weight"
          error={errors}
          value={data.weight}
          handleChange={handleChange}
          Icon="kg"
          disableCopyPaste
          allowMoneyFormat
          isText
          isNormal
        />
      </GridContainer>
      <div >
        <CustomCheckBox label="Requires Shipping" />
      </div>

      <Grid item container xs={12} spacing={40}>
        <GridContainer splitByTwos>
          <div >
            <Header
              label="Pricing"
              labelColor="text-primary"
              variant="h6"
              dividerClass="divider-brown"
            />
            <div className="mt-1">
              <InputFormMoney
                label="Price"
                name="price"
                isDisabled={false}
                withSymbol={false}
                isAutoFocus={false}
                formatValue={false}
                value={data.price}
                onChange={handleChange}
                fullWidth

              />
              <InputFormMoney
                className="mt-2"
                label="Compare at Price"
                name="comp_at_price"
                withSymbol={false}
                isDisabled={false}
                onChange={handleChange}
                isAutoFocus={false}
                formatValue={false}
                value={data.comp_at_price}
                fullWidth
              />
              <CustomCheckBox
                divClasses="mt-1"
                checkBClasses="p-0 mr-small"
                label="Charge taxes on this product"
              />
            </div>
          </div>
          <div>
            <Header
              label="Inventory"
              labelColor="text-primary"
              variant="h6"
              dividerClass="divider-brown"
            />
            <div className="mt-1">
              <MerchantFormField
                label="SKU"
                error={errors}
                name="sku"
                isNormal
                isText
                handleChange={handleChange}
                value={data.sku}
                fullWidth
              />
              <MerchantFormField
                label="Barcode"
                error={errors}
                name="barcode"
                classes="mt-2"
                handleChange={handleChange}
                isNormal
                isText
                value={data.barcode}
                fullWidth
              />
              <MerchantFormField
                label="Quantity"
                error={errors}
                name="quantity"
                classes="mt-2"
                value={data.quantity}
                handleChange={handleChange}
                isNormal
                isText
                allowDigitsOnly
                disableCopyPaste
                fullWidth
              />
            </div>
          </div>
        </GridContainer>
      </Grid>

      {id !== 'edit-product-body' ?
        <>
          <GridContainer>
            <Header
              label="Images"
              labelColor="text-primary"
              variant="h6"
              dividerClass="divider-brown"
            />
          </GridContainer>
          <Center>
            <Center xs={7} wantPaper classes="mb-1"
              style={{ backgroundColor: '#eeeeee' }}>
              <Typography
                color="secondary"
                variant="h6"
                children="Note:" />
              <Typography
                className="mt-1 text-black"
                children={
                  <span className="d-inline font-md" style={{
                    textAlign: 'justify',
                  }}>
                    Image can be uploaded of any dimension but we recommend you to upload image with dimension of 1024x1024 & its size must be
                       less than 15MB.
           </span>
                }
              />
            </Center>
          </Center>
        </> : null
      }
    </Container>
  )
}
export default AddEditProductBody;


