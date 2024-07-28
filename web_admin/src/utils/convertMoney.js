const ConvertMoney = (money) => {
  if (money > 100) {
    return `${money.toLocaleString()} VND`;
  } else {
    return `${money} %`;
  }
};

export default ConvertMoney;
