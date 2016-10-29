import React from 'react';
import Immutable from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  addPeriod,
  removePeriod,
  periodFormChanged,
} from './actions';

import {
  selectCalculatorPeriods,
  calculateAllPeriodsSum,
} from './selectors';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import Subheader from 'material-ui/Subheader';
import Snackbar from 'material-ui/Snackbar';
// import FloatingActionButton from 'material-ui/FloatingActionButton';
// import ContentAdd from 'material-ui/svg-icons/content/add';
// import RefreshIndicator from 'material-ui/RefreshIndicator';
// import Divider from 'material-ui/Divider';

// import ClearIcon from 'react-material-icons/icons/content/clear';
// import AddIcon from 'react-material-icons/icons/content/add';

import styles from './styles.scss';

// import pmt from 'formula-pmt';
import {
  formatPrice,
  periodSum,
} from './utils';

import Form from './form';
import Table from './table';

export class HBCalcPeriods extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      openSnackbar: false,
      openDialogs: [...Array(props.periods.size).fill(false)],
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

  handleDialogOpen = (index) => {
    const openDialogs = this.state.openDialogs;
    openDialogs[index] = true;
    this.setState({ openDialogs });
  }

  handleDialogClose = (index) => {
    const openDialogs = this.state.openDialogs;
    openDialogs[index] = false;
    this.setState({ openDialogs });
  }

  render() {
    const periods = this.props.periods.toJS();
    const periodsSums = this.props.periodsSums.toJS();
    const firstPeriod = periods[0];
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
              onChangeVyska={this.props.onChangeVyska}
              onChangeDlzka={this.props.onChangeDlzka}
              onChangeDlzkaSkutocne={this.props.onChangeDlzkaSkutocne}
              onChangeUrok={this.props.onChangeUrok}
              onRemovePeriod={this.props.onRemovePeriod}
            />
            <div className={styles.paperBottom}>
              {/*
              <div style={{ flex: 1, display: 'inline-block', color: 'grey', textAlign: 'left' }}>
                <a onClick={() => this.handleDialogOpen(index)}>Tabuľka priebehu</a>
              </div>
              <div style={{ flex: 1, display: 'inline-block', color: 'grey', textAlign: 'right' }}>
                <a onClick={() => this.handleDialogOpen(index)}>Pridať priebeh</a>
              </div>
               */}
              {/* <RefreshIndicator
                size={40}
                left={10}
                top={0}
                status="loading"
                loadingColor={"grey"}
              /> */}
              <FlatButton
                label="Tabuľka priebehu"
                primary={false}
                onTouchTap={() => this.handleDialogOpen(index)}
                style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.8em' }}
              ></FlatButton>
              <FlatButton
                label="Odvodiť obdobie"
                primary={false}
                onTouchTap={() => this.props.onAddContinuousPeriod(period)}
                style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.8em' }}
              ></FlatButton>
              {/* <a
                label='Tabuľka priebehu'
                primary={false}
                onClick={() => this.handleDialogOpen(index)}
                style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.8em', textDecoration: 'underline' }}
              >Tabuľka priebehu</a>

              <a
                label='Odvodiť obdobie'
                primary={false}
                onClick={() => this.props.onAddContinuousPeriod(period)}
                style={{ color: 'rgba(0,0,0,0.5)', fontSize: '0.8em', marginLeft: '1em', textDecoration: 'underline' }}
              >Odvodiť obdobie</a> */}

              {/* <FloatingActionButton mini zDepth={0} style={{verticalAlign: "middle", marginLeft: "1em"}} onClick={() => this.props.onAddContinuousPeriod(period)}>
                <ContentAdd />
              </FloatingActionButton> */}
            </div>
          </Paper>
        )}

        {multiplePeriods ?
          <Paper className={styles.paper}>
            <Subheader className={styles.paperHeader}>Sumár za obdobia</Subheader>
            <TextField
              disabled={false}
              floatingLabelText="Zaplatené spolu (€)"
              floatingLabelFixed
              className={styles.importantInput}
              value={formatPrice(periodsSums.map((data) => data.kumulativnaPlatba).reduce((a, b) => a + b, 0))}
            />
            <TextField
              disabled={false}
              floatingLabelText="Zaplatené úroky (€)"
              floatingLabelFixed
              className={styles.importantInput}
              value={formatPrice(periodsSums.map((data) => data.kumulativneUroky).reduce((a, b) => a + b, 0))}
            />
            <TextField
              disabled={false}
              floatingLabelText="Zaplatené istiny (€)"
              floatingLabelFixed
              className={styles.importantInput}
              value={formatPrice(periodsSums.map((data) => data.kumulativneIstiny).reduce((a, b) => a + b, 0))}
            />
          </Paper>
          :
          null
        }

        <div style={{ textAlign: 'center', margin: '1em 0' }}>
          <RaisedButton label="Prepočítať priebeh" primary onClick={this.onCalculateClick} />
          <Snackbar
            open={this.state.openSnackbar}
            message="Prepočítané"
            autoHideDuration={1000}
          />
          &nbsp;
          <FlatButton label="Pridať obdobie" onClick={() => this.props.onAddNewPeriod(firstPeriod)} />
        </div>

        { periods.map((period, index) => {
          const actions = [
            <FlatButton
              label="Zatvoriť"
              primary
              onTouchTap={() => this.handleDialogClose(index)}
            />,
          ];
          const dlzkaString = period.dlzkaSkutocne ? `/${period.dlzkaSkutocne}` : '';
          return (this.state.openDialogs.length > index ?
            <Dialog
              key={index}
              title={`Tabuľka priebehu - ${index + 1}. obdobie (${formatPrice(period.vyska)}, ${period.urok}%, ${period.dlzka}${dlzkaString} rokov)`} // eslint-disable-line quotes prefer-template
              actions={actions}
              modal={false}
              open={this.state.openDialogs[index]}
              autoScrollBodyContent
              onRequestClose={() => this.handleDialogClose(index)}
            >
              {/* periods.length > 1 ? <Subheader className={styles.paperHeader}>{index + 1}. obdobie</Subheader> : null */}
              {this.state.openDialogs[index] ? <Table key={index} periodData={period} periodSum={periodsSums[index]} tableData={periodsSums[index].priebeh} /> : null}
            </Dialog> : null
          );
        }) }

      </div>
    );
  }
}

HBCalcPeriods.propTypes = {
  periods: React.PropTypes.instanceOf(Immutable.List),
  periodsSums: React.PropTypes.instanceOf(Immutable.List),
  onChangeVyska: React.PropTypes.func,
  onChangeDlzka: React.PropTypes.func,
  onChangeDlzkaSkutocne: React.PropTypes.func,
  onChangeUrok: React.PropTypes.func,
  onAddNewPeriod: React.PropTypes.func,
  onAddContinuousPeriod: React.PropTypes.func,
  onRemovePeriod: React.PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    onChangeVyska: (id, value) => dispatch(periodFormChanged(id, { vyska: value })),
    onChangeDlzka: (id, value) => dispatch(periodFormChanged(id, { dlzka: value })),
    onChangeDlzkaSkutocne: (id, value) => dispatch(periodFormChanged(id, { dlzkaSkutocne: value })),
    onChangeUrok: (id, value) => dispatch(periodFormChanged(id, { urok: value })),
    onAddNewPeriod: (basePeriod) => {
      const newPeriod = {
        vyska: parseInt(basePeriod.vyska, 10),
        dlzka: parseInt(basePeriod.dlzka, 10),
        dlzkaSkutocne: parseInt(basePeriod.dlzkaSkutocne, 10),
        urok: parseFloat(basePeriod.urok),
      };
      return dispatch(addPeriod(newPeriod));
    },
    onAddContinuousPeriod: (basePeriod) => {
      const basePeriodSum = periodSum(basePeriod);
      const newPeriod = {
        vyska: parseInt(basePeriod.vyska - (basePeriod.dlzkaSkutocne ? basePeriodSum.kumulativneIstiny : 0), 10),
        dlzka: parseInt(basePeriod.dlzka - (basePeriod.dlzkaSkutocne ? basePeriod.dlzkaSkutocne : 0), 10),
        dlzkaSkutocne: 0,
        urok: parseFloat(basePeriod.urok),
      };
      return dispatch(addPeriod(newPeriod));
    },
    onRemovePeriod: (id) => dispatch(removePeriod(id)),
    dispatch,
  };
}

const mapStateToProps = () => createStructuredSelector({
  periods: selectCalculatorPeriods(),
  periodsSums: calculateAllPeriodsSum(),
});

export default connect(mapStateToProps, mapDispatchToProps)(HBCalcPeriods);
