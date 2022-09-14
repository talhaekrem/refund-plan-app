import { useContext, createContext, useState } from "react";
const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [data, setData] = useState({
    credit: "",
    installmentNum: "",
    profit: "",
    installmentFrequency: "monthly",
    kkdf: "",
    bsmv: "",
  });
  const values = {
    data,
    setData,
  };
  return <FormContext.Provider value={values}>{children}</FormContext.Provider>;
};

const useFormDatas = () => useContext(FormContext);

export { FormProvider, useFormDatas };
