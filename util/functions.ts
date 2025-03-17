// const formattedBalance = (value: any) =>
// 	new Intl.NumberFormat("en-US", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 3,
//   }).format(value);

const formattedBalance = (value: any) => {
  const numberValue = parseFloat(value);
  if (isNaN(numberValue)) {
    return "0.00";
  }
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 3,
  }).format(numberValue);
};

export default formattedBalance;
