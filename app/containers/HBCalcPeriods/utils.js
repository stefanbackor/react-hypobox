import pmt from 'formula-pmt';

export function formatPrice(floatValue) {
  // const fixed = Math.round(parseFloat(floatValue)) === parseInt(floatValue) ? 0 : 2
  // return floatValue ? parseFloat(floatValue).toFixed(2) : '-';
  return floatValue ? parseFloat(floatValue).toLocaleString('sk-SK', {
    style: 'decimal', // decimal | currency
    useGrouping: false, // true | false
    currency: 'EUR',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }) : '-';
}

export function formatPercent(floatValue) {
  return floatValue ? parseFloat(floatValue).toLocaleString('sk-SK', {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }) : '';
}

export function formatFloat(floatValue) {
  return floatValue ? floatValue.toString() : '';
}

// function calculateAPR(loanamount, numpayments, baseannualrate, costs){
//   /*
//   By Paul Cormier - Sep 10, 2010 - http://webmasterymadesimple.com
//   loanamount  = the amount borrowed
//   numpayments = number of monthly payments e.g. 30 years = 360
//   baserate    = the base percentage rate of the loan. A 5.25% Annual Rate should be passed in as 0.0525 NOT 5.25
//   costs       = the loan closing costs e.g. origination fee, broker fees, etc.
//   */
//   var rate =  baseannualrate / 12;
//   var totalmonthlypayment = ((loanamount+costs) * rate * Math.pow(1+rate,numpayments)) / (Math.pow(1+rate, numpayments)-1);
//   var testrate = rate;
//   var iteration = 1;
//   var testresult = 0;
//   //iterate until result = 0
//   var testdiff = testrate;
//   while (iteration <= 100) {
//     testresult = ((testrate * Math.pow(1 + testrate, numpayments)) / (Math.pow(1 + testrate, numpayments) - 1)) - (totalmonthlypayment / loanamount);
//     if (Math.abs(testresult) < 0.0000001) break;
//     if (testresult < 0) testrate += testdiff;
//     else testrate -= testdiff;
//     testdiff = testdiff / 2;
//     iteration++;
//   }
//   testrate = testrate * 12;
//   return testrate.toFixed(6);
// }

export function periodSum(period) {
  const { vyska, dlzka, dlzkaSkutocne, urok } = {
    vyska: parseInt(period.vyska, 10) || 0,
    dlzka: parseInt(period.dlzka, 10) || 0,
    dlzkaSkutocne: parseInt(period.dlzkaSkutocne, 10) || 0,
    urok: parseFloat(typeof period.urok === 'string' ? period.urok.replace(',', '.') : period.urok) || 0,
  };
  const splatka = (0 - pmt((urok / 100) / 12, dlzka * 12, vyska));
  const mesiacovSplacania = 12 * (dlzkaSkutocne || dlzka);

  const priebeh = [];
  const zaplateneSplatky = mesiacovSplacania * splatka;
  const zaplateneUroky = ((zostatok) => {
    let zostatokDecr = zostatok;
    return [...Array(mesiacovSplacania).keys()].map(() => {
      const krokUrok = (zostatokDecr * (urok / 100 / 12));
      zostatokDecr -= (splatka - krokUrok);
      priebeh.push({
        urok: krokUrok,
        zostatok: zostatokDecr,
      });
      return krokUrok;
    });
  })(vyska).reduce((a, b) => a + b, 0);

  return {
    splatka,
    priebeh,
    kumulativneIstiny: zaplateneSplatky - zaplateneUroky,
    kumulativneUroky: zaplateneUroky,
    kumulativnaPlatba: zaplateneSplatky,
  };
}
