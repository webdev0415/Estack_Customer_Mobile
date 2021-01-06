import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../redux/actions';
import Transactions from './Transactions';

class TransactionsScreen extends Component {
  state = {
    data: [
      { value: 'All' },
      { value: 'Redeemed' },
      { value: 'Earned' }
    ],
    from: '',
    to: '',
    type: 'All',
    refreshing: false,
  };

  componentDidMount() {
    this.getTransaction();
    this.props.onGetTotals();
  };

  cancelFilter = () => this.setState({ from: '', to: '', type: 'All' })

  setDate = (date) => this.setState({ from: date.startDate, to: date.endDate }, () => this.getTransaction());
  setType = (type) => this.setState({ type }, () => this.getTransaction());

  refreshOn = () => this.setState({ refreshing: true });
  refreshOff = () => this.setState({ refreshing: false });

  getTransaction = () => this.props.onGetTransactions({ from: this.state.from, to: this.state.to, type: this.state.type });

  render() {
    const { data, refreshing, from, to, type } = this.state;
    const { transactions, onGetTotals } = this.props;

    if (!transactions.transactions) {
      return null;
    }
    return (
      <Transactions
        data={data}
        from={from}
        to={to}
        type={type}
        setDate={this.setDate}
        setType={this.setType}
        refreshOn={this.refreshOn}
        refreshing={refreshing}
        refreshOff={this.refreshOff}
        cancelFilter={this.cancelFilter}
        transactions={transactions.transactions}
        onGetTransactions={this.getTransaction}
        onGetTotals={onGetTotals}
        earned={transactions.earned}
        spent={transactions.spent}
      />
    )
  }
};

const mapStateToProps = (state) => ({
  transactions: state.transactions,
});

const mapDispatchToProps = (dispatch) => ({
  onGetTransactions: (payload) => dispatch(actions.getTransactionsAction(payload)),
  onGetTotals: () => dispatch(actions.getTransactionTotalsAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);
