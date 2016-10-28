import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import Paper from 'material-ui/Paper';
// import Subheader from 'material-ui/Subheader';
import TextField from 'material-ui/TextField';
// import ClearIcon from 'react-material-icons/icons/content/clear';

import {
  selectCalculatorPeriod,
  calculatePeriodSum,
} from './selectors';

import { formatPrice } from '../HBCalcPeriods/utils';
import styles from '../HBCalcPeriods/styles.scss';

export class Form extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const period = this.props.period.toJS();
    return (
      <form noValidate>
        {/* this.props.multiplePeriods ? <ClearIcon className={styles.closePaperIcon} onClick={() => this.props.onRemovePeriod(this.props.id)} /> : null */}
        {/* this.props.multiplePeriods ? <Subheader className={styles.paperHeader}>{(this.props.id + 1)}. obdobie</Subheader> : null */}

        <TextField
          type="number"
          step="10"
          className={styles.regularInput}
          floatingLabelText="Mesačná splátka (€)"
          floatingLabelFixed
          value={period.splatka}
          onChange={(e) => this.props.onChangeSplatka(this.props.id, e.target.value)}
        />
        <TextField
          type="number"
          step="any"
          className={styles.regularInput}
          floatingLabelText="Najlepšia úroková sadzba p.a. (%)"
          floatingLabelFixed
          value={period.urok}
          onChange={(e) => this.props.onChangeUrok(this.props.id, e.target.value)}
        />

        <TextField
          type="number"
          step="1"
          className={styles.regularInput}
          floatingLabelText="Dĺžka splácania (rokov)"
          floatingLabelFixed
          value={period.dlzka}
          onChange={(e) => this.props.onChangeDlzka(this.props.id, e.target.value)}
        />

        <br />

        <TextField
          disabled={false}
          floatingLabelText="Výška hypotéky (€)"
          floatingLabelFixed
          className={styles.importantInput}
          value={formatPrice(this.props.periodSum.vyska)}
        />
        <TextField
          disabled={false}
          floatingLabelText="Spolu zaplatíte (€)"
          floatingLabelFixed
          className={styles.importantInput}
          value={formatPrice(this.props.periodSum.kumulativnaPlatba)}
        />
        {/*
        <TextField
          disabled={false}
          floatingLabelText="Vypočítané zaplatené úroky (€)"
          floatingLabelFixed
          className={styles.importantInput}
          value={formatPrice(this.props.periodSum.kumulativneUroky)}
        /> */}
      </form>
    );
  }
}

Form.propTypes = {
  id: React.PropTypes.number,
  period: React.PropTypes.instanceOf(Immutable.Map),
  periodSum: React.PropTypes.object,
  multiplePeriods: React.PropTypes.bool,
  onChangeSplatka: React.PropTypes.func,
  onChangeDlzka: React.PropTypes.func,
  onChangeUrok: React.PropTypes.func,
  // onRemovePeriod: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state, props) => createStructuredSelector({
  period: selectCalculatorPeriod(state, props),
  periodSum: calculatePeriodSum(state, props),
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
