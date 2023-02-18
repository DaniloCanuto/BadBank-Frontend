export const toUSD = (number) => {
  if(!number){
    return ''
  }
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
};
