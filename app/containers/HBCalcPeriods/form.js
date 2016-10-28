import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { Subheader, TextField } from 'material-ui';
import ClearIcon from 'react-material-icons/icons/content/clear';

import {
  selectCalculatorPeriod,
  calculatePeriodSum,
} from './selectors';

import styles from './styles.scss';
import { formatPrice } from './utils';

export class HypoBoxCalculatorForm extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const period = this.props.period.toJS();
    return (
      <form noValidate>
        {this.props.multiplePeriods ? <ClearIcon className={styles.closePaperIcon} onClick={() => this.props.onRemovePeriod(this.props.id)} /> : null}
        {this.props.multiplePeriods ? <Subheader className={styles.paperHeader}>{(this.props.id + 1)}. obdobie</Subheader> : null}
        <TextField
          type="number"
          step="1000"
          min="0"
          fullWidth
          className={styles.regularInput}
          floatingLabelText="Výška úveru (€)"
          floatingLabelFixed
          value={period.vyska}
          onChange={(e) => this.props.onChangeVyska(this.props.id, e.target.value)}
        />
        <TextField
          type="number"
          step="any"
          min="0"
          fullWidth
          className={styles.regularInput}
          floatingLabelText="Úroková sadzba p.a. (%)"
          floatingLabelFixed
          value={period.urok}
          onChange={(e) => this.props.onChangeUrok(this.props.id, e.target.value)}
        />
        <TextField
          type="number"
          step="1"
          min="0"
          fullWidth
          className={styles.regularInput}
          floatingLabelText="Dĺžka splácania (rokov)"
          floatingLabelFixed
          value={period.dlzka}
          onChange={(e) => this.props.onChangeDlzka(this.props.id, e.target.value)}
        />
        <TextField
          type="number"
          step="1"
          min="0"
          fullWidth
          className={styles.regularInput}
          floatingLabelText="Skutočne splatených (rokov)"
          floatingLabelFixed
          value={period.dlzkaSkutocne ? period.dlzkaSkutocne : ''}
          onChange={(e) => this.props.onChangeDlzkaSkutocne(this.props.id, e.target.value)}
        />
        <br />
        <TextField
          disabled={false}
          fullWidth
          floatingLabelText="Mesačná splátka (€)"
          floatingLabelFixed
          className={styles.importantInput}
          value={formatPrice(this.props.periodSum.splatka)}
        />
        <TextField
          disabled={false}
          fullWidth
          floatingLabelText="Zaplatené úroky (€)"
          floatingLabelFixed
          className={styles.importantInput}
          value={formatPrice(this.props.periodSum.kumulativneUroky)}
        />
        <TextField
          disabled={false}
          fullWidth
          floatingLabelText="Zaplatená istina (€)"
          floatingLabelFixed
          className={styles.importantInput}
          value={formatPrice(this.props.periodSum.kumulativneIstiny)}
        />
        {period.dlzkaSkutocne ?
          <TextField
            disabled={false}
            fullWidth
            floatingLabelText="Zostatok istiny (€)"
            floatingLabelFixed
            className={styles.importantInput}
            value={formatPrice(period.vyska - this.props.periodSum.kumulativneIstiny)}
          />
          : null}
      </form>
    );
  }
}

HypoBoxCalculatorForm.propTypes = {
  id: React.PropTypes.number,
  period: React.PropTypes.instanceOf(Immutable.Map),
  periodSum: React.PropTypes.object,
  multiplePeriods: React.PropTypes.bool,
  onChangeVyska: React.PropTypes.func,
  onChangeDlzka: React.PropTypes.func,
  onChangeDlzkaSkutocne: React.PropTypes.func,
  onChangeUrok: React.PropTypes.func,
  onRemovePeriod: React.PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  dispatch,
});

const mapStateToProps = (state, props) => createStructuredSelector({
  period: selectCalculatorPeriod(state, props),
  periodSum: calculatePeriodSum(state, props),
});

export default connect(mapStateToProps, mapDispatchToProps)(HypoBoxCalculatorForm);
