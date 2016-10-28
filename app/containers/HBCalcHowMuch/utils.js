import housePriceCalculate from 'house-price-calculate';

export function periodSum(period) {
  const { splatka, dlzka, urok } = {
    splatka: parseInt(period.splatka, 10) || 0,
    dlzka: parseInt(period.dlzka, 10) || 0,
    urok: parseFloat(typeof period.urok === 'string' ? period.urok.replace(',', '.') : period.urok) || 0,
  };
  // const splatka = (0 - pmt((urok / 100) / 12, dlzka * 12, vyska));
  const mesiacovSplacania = 12 * dlzka;
  const zaplateneSplatky = mesiacovSplacania * splatka;

  const vyska = housePriceCalculate({
    monthlyPayment: splatka,
    downPayment: 0,
    APR: urok,
    termYears: dlzka,
    closingCostsPercent: 0,
    annualEscrowPercent: 0,
  });

  return {
    vyska,
    kumulativnaPlatba: zaplateneSplatky,
  };
}
