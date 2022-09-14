import { useContext, createContext, useState, useEffect } from "react";
import { useFormDatas } from "./FormDataContext";
const TableContext = createContext();

const TableProvider = ({ children }) => {
  const [tableData, setTableData] = useState([]);
  const [totalPayingAmount, setTotalPayingAmount] = useState(0);
  const [perInstallmentAmount, setPerInstallmentAmount] = useState(0);
  const [taxesAmount, setTaxesAmount] = useState(0);
  const { data } = useFormDatas();

  const getProfit = (mainCredit, profit, day) => {
    return parseFloat(mainCredit * (profit / 100) * (day / 30)).toFixed(2);
  };
  useEffect(() => {
    let installmentAmount = installmentAmountCalc(
      data.credit,
      data.profit,
      data.installmentNum,
      data.kkdf,
      data.bsmv
    );
    setPerInstallmentAmount(installmentAmount || 0);
    const calculateMoney = (
      amount,
      credit,
      profit,
      installmentNum,
      kkdf,
      bsmv,
      days
    ) => {
      let temp = [];
      let remainingCredit = credit;
      for (let i = 0; i < installmentNum; i++) {
        let obj = {
          installmentNum: i + 1,
          installmentAmount: "",
          principal: "",
          remainingPrincipal: "",
          profitAmount: "",
          kkdf: "",
          bsmv: "",
        };
        //kar oranı
        let calcProfit = getProfit(remainingCredit, profit, days);
        //kkdf
        obj.kkdf = parseFloat(calcProfit * (kkdf / 100)).toFixed(2);
        obj.bsmv = parseFloat(calcProfit * (bsmv / 100)).toFixed(2);

        obj.installmentAmount = parseFloat(amount).toFixed(2);
        obj.profitAmount = parseFloat(calcProfit).toFixed(2);

        obj.principal = parseFloat(
          amount - obj.profitAmount - obj.kkdf - obj.bsmv
        ).toFixed(2);
        obj.remainingPrincipal = parseFloat(
          remainingCredit - obj.principal
        ).toFixed(2);
        remainingCredit = parseFloat(obj.remainingPrincipal).toFixed(2);
        temp.push(obj);
      }
      if (temp.length !== 0) {
        let lastCoin = temp[installmentNum - 1].remainingPrincipal;
        let newInstallmentAmount = parseFloat(lastCoin) + parseFloat(amount);
        temp[installmentNum - 1].installmentAmount =
          newInstallmentAmount.toFixed(2);
        temp[installmentNum - 1].remainingPrincipal = "0.00";
        temp[installmentNum - 1].principal =
          temp[installmentNum - 2].remainingPrincipal;
      }

      setTableData(temp);
      let taxes = 0;
      let totalPaying = 0;
      for (let i = 0; i < temp.length; i++) {
        totalPaying += Number(temp[i].installmentAmount);
        taxes += Number(temp[i].bsmv) + Number(temp[i].kkdf);
      }
      setTotalPayingAmount(totalPaying.toFixed(2));
      setTaxesAmount(taxes.toFixed(2));
    };

    calculateMoney(
      installmentAmount,
      data.credit,
      data.profit,
      data.installmentNum,
      data.kkdf,
      data.bsmv,
      data.installmentFrequency
    );
  }, [data]);

  const values = {
    tableData,
    totalPayingAmount,
    perInstallmentAmount,
    taxesAmount,
  };
  return (
    <TableContext.Provider value={values}>{children}</TableContext.Provider>
  );
};

const useTableContext = () => useContext(TableContext);

export { TableProvider, useTableContext };
const installmentAmountCalc = (
  credit,
  profit,
  installmentNum,
  kkdf = 0,
  bsmv = 0
) => {
  //ekstradan vergiler varsa bunları ekleyip yeni faiz oranı üzerinden hesap yaparız
  let newprofit = (1 + (kkdf / 100 + bsmv / 100)) * (profit / 100);
  let power = Math.pow(1 + newprofit, installmentNum);
  let result = (credit * ((newprofit * power) / (power - 1))).toFixed(2);
  return result;
};
