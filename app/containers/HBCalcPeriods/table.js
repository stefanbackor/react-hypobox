import React, { PropTypes } from 'react';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { formatPrice } from './utils';

export class HypoBoxTable extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    let kumulativnaPlatba = 0;
    const firstColStyle = { width: '8%', paddingLeft: '0' };
    const tableHeaderRow = (
      <TableRow>
        <TableHeaderColumn style={firstColStyle}>Mesiac</TableHeaderColumn>
        <TableHeaderColumn>Istina</TableHeaderColumn>
        <TableHeaderColumn>Úrok</TableHeaderColumn>
        <TableHeaderColumn>Splátka</TableHeaderColumn>
        <TableHeaderColumn>Zostatok istiny</TableHeaderColumn>
        <TableHeaderColumn>Kumulatívna platba</TableHeaderColumn>
      </TableRow>
    );
    return (
      <div>
        <Table
          selectable={false}
          multiSelectable={false}
          style={{ margin: '0.2em 0' }}
        >
          <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
            {tableHeaderRow}
          </TableHeader>
          <TableBody preScanRows={false} displayRowCheckbox={false}>
            {this.props.tableData.map((row, index) => {
              // const row = this.props.tableData[index];
              // const isYearsFirstMonth = !((index) % 12);
              const isYearsLastMonth = !((index + 1) % 12);
              return (
                <TableRow key={index} displayBorder={isYearsLastMonth}>
                  <TableRowColumn style={firstColStyle}>{index + 1}.</TableRowColumn>
                  <TableRowColumn>{formatPrice(this.props.periodSum.splatka - row.urok)}</TableRowColumn>
                  <TableRowColumn>{formatPrice(row.urok)}</TableRowColumn>
                  <TableRowColumn>{formatPrice(this.props.periodSum.splatka)}</TableRowColumn>
                  <TableRowColumn>{formatPrice(row.zostatok)}</TableRowColumn>
                  <TableRowColumn>{formatPrice(kumulativnaPlatba += this.props.periodSum.splatka)}</TableRowColumn>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
    // return (
    //   <ol>
    //     {this.props.tableData.map((row, index) =>
    //       <li key={index}>
    //         <div>{row.istina}</div>
    //         <div>{row.urok}</div>
    //         <div>{row.splatka}</div>
    //         <div>{row.zostatok}</div>
    //         <div>{row.kumulativna}</div>
    //       </li>
    //     )}
    //   </ol>
    // );
  }
}

HypoBoxTable.propTypes = {
  period: PropTypes.object,
  periodSum: PropTypes.object,
  tableData: PropTypes.array,
};

export default HypoBoxTable;
