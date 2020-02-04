import React, { Component } from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import { reqOptions } from '../../helpers';
import { Container } from './Containers';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true
    }
  }
  componentDidCatch = (err, info) => {
    if (this.refs.request) {
      const opts = reqOptions('loggerUI', 'post', {
        messageOccurred: this.props.name,
        reason: err,
        info
      })
      this.props.request(opts);
    }

  }
  render() {
    if (this.state.hasError) {
      return (<Container>
        <Header label="Oops, something went wrong " />
      </Container>
      )
    } else {
      return this.props.children;
    }

  }
}

ErrorBoundary.defaultProps = {
  name: 'ErrorBoundary'
}


ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.object,
    PropTypes.array
  ]),
  name: PropTypes.string.isRequired,
  request: PropTypes.func
}


export default ErrorBoundary;