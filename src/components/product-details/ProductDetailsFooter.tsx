import React, { Fragment, Component } from 'react';
import Image from 'material-ui-image';
import NoImage from '../../images/no_image.png';
import CustomPopper from '../utils/CustomPopper';
import MerchantTable from '../utils/MerchantTable';
import { Center } from '../utils/Containers';
import { Delete } from '@material-ui/icons';
import { connect, MapStateToProps } from 'react-redux';
import { S, A, R, T } from '../../helpers/merchantTypes';
import { IconTooltip } from '../utils/IconUpload';
import { AxiosStatic } from 'axios';
import { ProductDetailsImages, MLShopMerchantState } from '../../helpers/reducersState';
import { requestToRemoveVariantImage } from '../../store/actions/products/productActions';
import { Typography, Paper, Grid, Button } from '@material-ui/core';
import { ThunkDispatch } from 'redux-thunk';

interface ownProps {
  request: AxiosStatic
  product_id: number | string
  toggleAddImageModal: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void
}



interface ProductDetailsFooterProps extends ownProps {
  data: any[]
  otherImages: ProductDetailsImages[]
  handleRemoveImage: Function
  imagesLen: number
  mainImage: string
}


const ProductDetailsFooter = (props: ProductDetailsFooterProps) => {
  const { data, otherImages, toggleAddImageModal, request, product_id, handleRemoveImage, imagesLen, mainImage } = props;
  const showAddButton = imagesLen === 5 ? 'd-none' : '';
  return (
    <Fragment>
      <Typography
        className="ml-2 mt-1"
        children="Images"
      />
      <Grid item container xs={12} spacing={8} className="ml-1 mt-1">
        {
          otherImages.length === 0 ? <SmallImage
            src={NoImage}
            hasImage={false}
          /> : otherImages.map((d, i) => (
            <Grid item key={i} >
              <SmallImage src={d.imagePath} key={`${i}${d.imagePath}`}
                handleRemoveImage={handleRemoveImage}
                request={request}
                image_id={d.id}
                image={d.image}
                product_id={product_id} />
            </Grid>
          ))
        }
      </Grid>
      <Grid item container xs={2} className="mt-4">
        <Button
          color="default"
          variant="contained"
          children="Add Image(s)"
          className={showAddButton}
          onClick={toggleAddImageModal}
        />
      </Grid>
      <Center classes="mt-1 mb-1">
        <Grid item xs={8}>
          <MerchantTable
            title="Variants"
            name="variant"
            data={data.map(o => ({
              ...o,
               mainImage 
            }))}
            columns={[
              'Images',
              'Title',
              'Price',
              'Weight',
              'Quantity',
              'Action'
            ]}
          />
        </Grid>
      </Center>
    </Fragment>
  )
};




interface SmallImageState {
  anchorEl: null
  showPopUp: boolean
}


interface SmallImageProps {
  src: string
  hasImage?: boolean
  product_id?: number | string
  request?: AxiosStatic
  handleRemoveImage?: Function
  image_id?: number | string
  image?: string
}


class SmallImage extends Component<SmallImageProps, SmallImageState> {

  state = {
    anchorEl: null,
    showPopUp: false
  };


  handleTogglePopOver = ({ currentTarget }) => {
    this.setState((prevState) => ({
      anchorEl: currentTarget,
      showPopUp: !prevState.showPopUp
    }))
  }

  render() {
    const { src, hasImage = true, product_id, request, handleRemoveImage, image_id, image } = this.props;
    const { anchorEl, showPopUp } = this.state;

    return (
      <div
        className="product-details-small">
        <Paper>
          <Image
            src={src}
          />
        </Paper>
        <div className="title mt-small icon-add-image">
          {hasImage ? (
            <>
              <IconTooltip
                MIcon={Delete}
                title="Delete"
                handleClick={this.handleTogglePopOver}
                iconClasses="icon-product tooltip-btn"
              />
              <CustomPopper
                placement="bottom"
                label="Delete this Image?"
                anchorEl={anchorEl}
                confirmCallback={(e) => {
                  handleRemoveImage(product_id, image, image_id);
                }}
                handleTogglePopOver={this.handleTogglePopOver}
                showPopUp={showPopUp}
              />
            </>
          ) : null}
        </div>
      </div>
    )
  }
}




const mapStateToProps: MapStateToProps<T, ownProps, MLShopMerchantState> = ({ products }) => {
  const imagesDetails = products.prodDetails.Product_Details.imagesDetails;

  const otherImages = imagesDetails.length
    ? imagesDetails.slice(1, imagesDetails.length) : imagesDetails;

  const mainImage = imagesDetails.length ? imagesDetails[0].imagePath : '';
  return {
    data: products.prodDetails.Product_Variant,
    otherImages,
    imagesLen: imagesDetails.length,
    mainImage
  }
};



const mapDispatchToProps = (dispatch: ThunkDispatch<S, R, A>, ownProps: ownProps) => ({
  handleRemoveImage: (product_id: number, image: string, image_id: number) =>
    dispatch(requestToRemoveVariantImage(ownProps.request, product_id, image, image_id))
});


export default connect(mapStateToProps, mapDispatchToProps)(ProductDetailsFooter);