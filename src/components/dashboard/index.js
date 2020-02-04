import React, { useEffect } from 'react';
import * as Title from 'react-document-title';
import ErrorBoundary from '../utils/ErrorBoundary';
import DashboardHeader from './DashboardHeader';
import DashboardBody from './DashboardBody';
import DashboardFooter from './DashboardFooter';
import { Container } from '../utils/Containers';
import { setLocation } from '../../helpers';

function Dashboard(props) {

  useEffect(() => {
    setLocation(props);
  }, []);

  return (
    <Title title="Dashboard | Seller • Multivendor MarketPlace">
      <ErrorBoundary name="Dashboard">
        <Container>
          <DashboardHeader />
          <DashboardBody />
          <DashboardFooter />
        </Container>
      </ErrorBoundary>
    </Title>
  )
};





export default Dashboard;