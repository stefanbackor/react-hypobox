import { createSelector } from 'reselect';
import { fromJS } from 'immutable';
import { periodSum } from './utils';

const selectCalculatorState = () => ((state) => state.get('calculator'));

// Vyberie vsetky obdobia zo state
const selectCalculatorPeriods = () => createSelector(
  selectCalculatorState(),
  (calculatorState) => calculatorState.get('periods'),
);

// Vyberie len obdobie danej instancie formulara zo state - pouzije props
const selectCalculatorPeriod = (state, props) => createSelector(
  selectCalculatorState(),
  (calculatorState) => calculatorState.getIn(['periods', props.id]),
);

// Vypocita hodnoty obdobia danej instancie formulara - pouzije props
const calculatePeriodSum = (state, props) => (
  createSelector(
    [selectCalculatorPeriod(state, props)],
    (period) => periodSum(period.toJS()),
  )
);

const calculateAllPeriodsSum = () => (
  createSelector(
    [selectCalculatorPeriods()],
    (periods) => fromJS(periods.toJS().map((period) => periodSum(period))),
  )
);

export {
  selectCalculatorPeriods,
  selectCalculatorPeriod,
  calculatePeriodSum,
  calculateAllPeriodsSum,
};
