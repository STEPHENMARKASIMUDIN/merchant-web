import React, { useEffect } from 'react';
import * as Title from 'react-document-title';
import Header from '../utils/Header';
import MerchantTable from '../utils/MerchantTable';
import { Container } from '../utils/Containers';
import { setLocation } from '../../helpers';
import { RouteComponentProps } from 'react-router';


const columns = [
  "Trans. Id",
  "Amount",
  "Date",
  "Status"
], data = [
  1, 2, 3
]


interface PaymentReceivedProps extends RouteComponentProps {

}


function PaymentReceived(props: PaymentReceivedProps) {

  useEffect(() => {
    setLocation(props);
  }, []);

  return (
    <Title title="Payment Received | Seller • Multivendor MarketPlace">
      <Container>
        <Header label="Payment Received" />
        <MerchantTable
          name="payment-received"
          title="Transactions"
          columns={columns}
          data={data}
        />
      </Container>
    </Title>
  )
};

export default PaymentReceived;