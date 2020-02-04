import React, { Fragment } from 'react';
import Image from 'material-ui-image';
import NoImage from '../../images/no_image.png';
import CustomExpansionPanel from '../utils/CustomExpansionPanel';
import { T } from '../../helpers/merchantTypes';
import { Grid, Paper } from '@material-ui/core';
import { MLShopMerchantState } from '../../helpers/reducersState';
import { connect, MapStateToProps } from 'react-redux';


interface OwnProps {
  classes: object
}

interface ProductDetailsBodyProps extends OwnProps {

  product_name: string
  type: string
  description: string
  tags: string
  status: string
  mainImage: string
}


const ProductDetailsBody = (props: ProductDetailsBodyProps) => {
  const { classes, product_name, type, description, tags, status, mainImage } = props;
  return (
    <Fragment>
      <Grid item container xs={12}
        className="mt-2"
        spacing={32}>
        <Grid item xs={7}>
          <CustomExpansionPanel
            classes={classes}
            details={product_name}
            summary="Product Name"
          />
          <CustomExpansionPanel
            classes={classes}
            details={type}
            summary="Product Type"
          />
          <CustomExpansionPanel
            classes={classes}
            details={description}
            summary="Description"
            hasButton
          />
          <CustomExpansionPanel
            classes={classes}
            details={tags}
            summary="Product Tags"
          />
          <CustomExpansionPanel
            classes={classes}
            details={status}
            summary="Status"
          />
        </Grid>
        <Grid item xs={5} >
          <div
            className="product-details-img">
            <Paper>
              <Image
                src={mainImage}
              />
            </Paper>
          </div>
        </Grid>
      </Grid>
    </Fragment>
  )
};


const mapStateToProps: MapStateToProps<T, OwnProps, MLShopMerchantState> = ({ products: { prodDetails } }) => ({
  product_name: prodDetails.Product_Details.product_name,
  type: prodDetails.Product_Details.product_type,
  description: prodDetails.Product_Details.description,
  tags: prodDetails.Product_Details.product_tags,
  status: prodDetails.Product_Details.status,
  //Uncomment when building
  mainImage: prodDetails.Product_Details.images.length ? prodDetails.Product_Details.imagesDetails[0].imagePath : NoImage
  //mainImage: NoImage
})



export default connect(mapStateToProps)(ProductDetailsBody);
