import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  // addPeriod,
  // removePeriod,
  periodFormChanged,
} from './actions';

import {
  selectCalculatorPeriods,
  calculateAllPeriodsSum,
} from './selectors';

// import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Snackbar from 'material-ui/Snackbar';
// import Subheader from 'material-ui/Subheader';
// import Divider from 'material-ui/Divider';

// import ClearIcon from 'react-material-icons/icons/content/clear';
// import AddIcon from 'react-material-icons/icons/content/add';

import styles from '../HBCalcPeriods/styles.scss';

// import pmt from 'formula-pmt';
// import {
//   formatPrice,
//   periodSum,
// } from './utils';

import Form from './form';

export class HBCalcHowMuch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
    };
  }
  // componentWillUpdate(nextProps, nextState) {
  //   console.log(JSON.stringify(nextState));
  // }

  // componentDidMount() {
  //   this.props.dispatch(addPeriod({
  //     vyska: '65001',
  //     dlzka: '30',
  //     dlzkaSkutocne: '',
  //     urok: '1,79',
  //   }));
  // }

  /**
   * Handles calculation click
   */
  onCalculateClick = () => {
    this.setState({
      openSnackbar: true,
    });
  };

  render() {
    const periods = this.props.periods.toJS();
    // const periodsSums = this.props.periodsSums.toJS();
    // const lastPeriod = periods[Math.max(periods.length - 1, 0)];
    const multiplePeriods = periods.length > 1;

    return (
      <div>
        {periods.map((period, index) =>
          <Paper key={index} className={styles.paper}>
            <Form
              key={index}
              id={index}
              multiplePeriods={multiplePeriods}
              onChangeSplatka={this.props.onChangeSplatka}
              onChangeDlzka={this.props.onChangeDlzka}
              onChangeUrok={this.props.onChangeUrok}
              onRemovePeriod={this.props.onRemovePeriod}
            />
          </Paper>
        )}

        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <RaisedButton label="Prepočítať výšku" primary onClick={this.onCalculateClick} />
          <Snackbar
            open={this.state.openSnackbar}
            message="Prepočítané"
            autoHideDuration={1000}
          />
          {/* &nbsp;<RaisedButton label="Pridať obdobie" onClick={() => this.props.onAddPeriod(lastPeriod)} /> */}
        </div>

      </div>
    );
  }
}

HBCalcHowMuch.propTypes = {
  periods: React.PropTypes.instanceOf(Immutable.List),
  periodsSums: React.PropTypes.instanceOf(Immutable.List),
  onChangeSplatka: React.PropTypes.func,
  onChangeDlzka: React.PropTypes.func,
  onChangeUrok: React.PropTypes.func,
  onAddPeriod: React.PropTypes.func,
  onRemovePeriod: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeSplatka: (id, value) => dispatch(periodFormChanged(id, { splatka: value })),
    onChangeDlzka: (id, value) => dispatch(periodFormChanged(id, { dlzka: value })),
    onChangeUrok: (id, value) => dispatch(periodFormChanged(id, { urok: value })),
    // onAddPeriod: (lastPeriod) => {
    //   const lastPeriodSum = periodSum(lastPeriod);
    //   return dispatch(addPeriod({
    //     vyska: parseInt(lastPeriod.vyska - (lastPeriod.dlzkaSkutocne ? lastPeriodSum.kumulativneIstiny : 0), 10),
    //     dlzka: parseInt(lastPeriod.dlzka - (lastPeriod.dlzkaSkutocne ? lastPeriod.dlzkaSkutocne : 0), 10),
    //     dlzkaSkutocne: 0,
    //     urok: lastPeriod.urok,
    //   }));
    // },
    // onRemovePeriod: (id) => dispatch(removePeriod(id)),
    dispatch,
  };
}

const mapStateToProps = () => createStructuredSelector({
  periods: selectCalculatorPeriods(),
  periodsSums: calculateAllPeriodsSum(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HBCalcHowMuch);
