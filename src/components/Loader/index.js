import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

const Loader = ({ loader }) => (
  <Spinner
    visible={loader}
    textContent='Loading...'
    textStyle={{ color: 'black' }}
  />
);

const mapStateToProps = (state) => ({
  loader: state.loader.loader,
});

export default connect(mapStateToProps, null)(Loader);
