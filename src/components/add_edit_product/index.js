import React, { Component } from 'react';
import * as Title from 'react-document-title';
import Header from '../utils/Header';
import AddEditProductBody from './AddEditProductBody';
import AddEditProductFooter from './AddEditProductFooter';
import { findDOMNode } from 'react-dom';
import { Container, Center } from '../utils/Containers';


class AddEditProduct extends Component {

  componentDidMount = () => {
    if (this.props.labelWidth === 0) {
      this.props.changeSelectLabelWidth(findDOMNode(this.labelRef).offsetWidth)
    }
  }

  componentDidUpdate = () => {
    if (this.props.labelWidth === 0) {
      this.props.changeSelectLabelWidth(findDOMNode(this.labelRef).offsetWidth)
    }
  }
  render() {
    const { title, labelHeader, handleChange, data, errors, request,
      labelWidth, changeSelectLabelWidth, idBody = 'add-product-body', product_number = null, submitCallBack = () => { } } = this.props;
    return (
      <Title title={title}>
        <Center wantPaper={false}>
          <Container parentSize={10} id="add-product-paper" parentJustify="center">
            <Header
              label={labelHeader}
            />
            <AddEditProductBody
              id={idBody}
              context={this}
              product_number={product_number}
              changeSelectLabelWidth={changeSelectLabelWidth}
              handleChange={handleChange}
              data={data}
              errors={errors}
              labelWidth={labelWidth}
            />
            <AddEditProductFooter
              idBody={idBody}
              submitCallBack={submitCallBack}
              request={request}
            />
          </Container>
        </Center>
      </Title>
    )
  }
};



export default AddEditProduct;

