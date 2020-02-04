import React from 'react';
import { Container } from '../utils/Containers';
import Header from '../utils/Header';
import * as Title from 'react-document-title';
import { setLocation } from '../../helpers';
import Jewelry from '../../images/Jewelry.jpg';
import ErrorBoundary from '../utils/ErrorBoundary';
import MerchantTable from '../utils/MerchantTable';
import OfficeSupplies from '../../images/OfficeSupplies.jpg';
import ValidationForm from '../utils/ValidationForm';
import FoodAndBeverages from '../../images/FoodAndBeverages.jpg';
import OtherPawnableItems from '../../images/OtherPawnableItems.jpeg';
import MobilePhoneAccessories from '../../images/MobilePhoneAccessories.jpeg';

class SmartCollections extends ValidationForm {

  executeSomeFunc = () => {
    setLocation(this.props);
  }

  columns = [
    '',
    'Title',
    'Product Conditions'
  ]
  data = [
    {
      imgSrc: FoodAndBeverages,
      title: 'Food and Beverages',
      desc1: 'Product title contains Food and Beverages',
      desc2: 'Product type contains Food and Beverages'
    },
    {
      imgSrc: Jewelry,
      title: 'Jewelry',
      desc1: 'Product title contains Jewelry',
      desc2: 'Product type is equal to Jewelry'
    },
    {
      imgSrc: MobilePhoneAccessories,
      title: 'Mobile Phone Accessories',
      desc1: 'Product title contains Mobile Phone Accessories',
      desc2: 'Product type contains Mobile Phone Accessories'
    },
    {
      imgSrc: OfficeSupplies,
      title: 'Office Supplies',
      desc1: 'Product title contains Office Supplies',
      desc2: 'Product type contains Office Supplies'
    },
    {
      imgSrc: OtherPawnableItems,
      title: 'Other Pawnable Items(OPI)',
      desc1: 'Product type contains OPI',
      desc2: 'Product vendor is equal to M. Lhuillier OPI'
    },
  ]


  render() {
    return (
      <Title title="Smart Collections | Seller • Multivendor MarketPlace">
        <ErrorBoundary name="Smart Collections" request={this.request}>
          <Container>
            <Header label="Smart Collections" />
            <MerchantTable
              name="smart-collections"
              columns={this.columns}
              data={this.data}
              isSmartCollections
            />
          </Container>
        </ErrorBoundary>
      </Title>
    )
  }
};


export default SmartCollections;

