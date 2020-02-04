import React, { useEffect } from 'react'
import * as Title from 'react-document-title';
import Header from '../utils/Header';
import MerchantTable from '../utils/MerchantTable';
import { Container } from '../utils/Containers';
import { setLocation } from '../../helpers';
import { RouteComponentProps } from 'react-router-dom';

const columns = [
  'ID',
  'Customer Name',
  'Seller Rating',
  'Date',
  'Action'
];

interface FeedbackProps extends RouteComponentProps {

}

function Feedback(props: FeedbackProps) {

  useEffect(() => {
    setLocation(props);
  }, [])

  return (
    <Title title="Feedback | Seller • Multivendor MarketPlace">
      <Container>
        <Header label="Feedback" />
        <MerchantTable
          name="feedback"
          title="Feedback List"
          columns={columns}
          data={[1]}
        />
      </Container>
    </Title>
  )

}

export default Feedback;
