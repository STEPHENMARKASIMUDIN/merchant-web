import React, { Fragment, Component } from 'react';
import styles from '../../merchant-theme/styles';
import MaterialChipInput from 'material-ui-chip-input';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { addTagAddProduct, deleteTagAddProduct } from '../../store/actions/add-product/addProductActions';
import { addTagEditProduct, deleteTagEditProduct } from '../../store/actions/edit-product/editProductActions';
import className from 'classnames';

const ENTER_KEY = 13;
const COMMA_KEY = 188;

class Tags extends Component {


  state = {
    tag: ''
  }

  onTagDelete = (tag, i) => () => {
    const { onDelete_EditProduct, onDelete_AddProduct, id, optionName } = this.props;
    switch (id) {
      case 'edit-product-body':
        return onDelete_EditProduct(tag, i);
      default:
        return onDelete_AddProduct(tag, i, optionName);
    }
  }

  handleChange = (e) => {
    this.setState({ tag: e.target.value })
  }


  onAddTag = (tag) => {
    const { onAdd_EditProduct, onAdd_AddProduct, id, optionName } = this.props;
    switch (id) {
      case 'edit-product-body':
        return onAdd_EditProduct(tag);
      default:
        return onAdd_AddProduct(tag, optionName);
    }
  }

  render() {
    const { tags, classNames, isDisabled } = this.props;

    return (
      <Fragment>
        <MaterialChipInput
          fullWidthInput={true}
          className={className(classNames, 'chip-input')}
          value={tags.length ? tags.split(',') : []}
          onDelete={(tag, index) => this.onTagDelete(tag, index)()}
          onAdd={this.onAddTag}
          disabled={isDisabled === undefined ? false : isDisabled}
          variant="outlined"
          fullWidth
          label="Item Code"
          newChipKeyCodes={[ENTER_KEY, COMMA_KEY]}
          FormHelperTextProps={{
            className: 'text-black',
            style: {
              margin: '9px 0px 0px 0px',
              fontSize: 13,
            }
          }}
          helperText="Press the 'Enter' key or the 'Comma' key to add a new Item Code"
        />
      </Fragment>
    )
  }

};





export default connect(null, (dispatch) => ({
  onDelete_EditProduct: (tag, i) => dispatch(deleteTagEditProduct(tag, i)),
  onAdd_EditProduct: (tag) => dispatch(addTagEditProduct(tag)),
  onDelete_AddProduct: (tag, i, optionName) => dispatch(deleteTagAddProduct(tag, i, optionName)),
  onAdd_AddProduct: (tag, optionName) => dispatch(addTagAddProduct(tag, optionName))
}))(withStyles(styles, { withTheme: true })(Tags));