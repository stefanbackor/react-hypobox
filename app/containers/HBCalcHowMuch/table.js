import React, { PropTypes } from 'react';

import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';


export class HypoBoxTable extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const firstColStyle = { width: '10%', paddingLeft: '16px' };
    return (
      <Table
        multiSelectable
        xheight={'300px'}
      >
        <TableHeader
          adjustForCheckbox={false}
          displaySelectAll={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn style={firstColStyle}>Mesiac</TableHeaderColumn>
            <TableHeaderColumn>Istina</TableHeaderColumn>
            <TableHeaderColumn>Úrok</TableHeaderColumn>
            <TableHeaderColumn>Splátka</TableHeaderColumn>
            <TableHeaderColumn>Zostatok istiny</TableHeaderColumn>
            <TableHeaderColumn>Kumulatívna platba</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody
          preScanRows={false}
          displayRowCheckbox={false}
        >
          {this.props.tableData.map((row, index) => {
            // const isYearsFirstMonth = !((index) % 12);
            const isYearsLastMonth = !((index + 1) % 12);
            return (
              <TableRow key={index} displayBorder={isYearsLastMonth}>
                <TableRowColumn style={firstColStyle}>{row.mesiac}.</TableRowColumn>
                <TableRowColumn>{row.istina}</TableRowColumn>
                <TableRowColumn>{row.urok}</TableRowColumn>
                <TableRowColumn>{row.splatka}</TableRowColumn>
                <TableRowColumn>{row.zostatok}</TableRowColumn>
                <TableRowColumn>{row.kumulativna}</TableRowColumn>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
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
  tableData: PropTypes.array,
};

export default HypoBoxTable;
