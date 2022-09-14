import React from "react";
import { useFormDatas } from "../context/FormDataContext";
import useForm from "../hooks/useForm";
const getFreshModel = () => ({
  credit: "",
  installmentNum: "",
  profit: "",
  installmentFrequency: "30",
  kkdf: "",
  bsmv: "",
});
const Form = ({setCalculated}) => {
  const { setData } = useFormDatas();
  const { values, errors, setErrors, handleInputChange } =
    useForm(getFreshModel);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setData(values);
      setCalculated(true);
    }
  };

  const validate = (e) => {
    let temp = {};
    temp.credit = /^[0-9]*$/.test(values.credit) ? "" : "Credit is not valid.";
    temp.installmentNum = /^\d*\.?\d*$/.test(values.installmentNum)
      ? ""
      : "Installment Count is not valid.";
    temp.profit = /^\d*\.?\d*$/.test(values.profit)
      ? ""
      : "Profit is not valid.";
    temp.kkdf = /^\d*\.?\d*$/.test(values.kkdf) ? "" : "KKDF is not valid.";
    temp.bsmv = /^\d*\.?\d*$/.test(values.bsmv) ? "" : "BSMV is not valid.";
    setErrors(temp);
    return Object.values(temp).every((item) => item === "");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="formBody">
        <div className="formBox">
          <div className="form-group">
            <label htmlFor="credit">Kredi Tutarı*</label>
            <input
              required
              onChange={handleInputChange}
              type="text"
              id="credit"
              name="credit"
              placeholder="100000"
            />
            {errors.credit && <small>{errors.credit}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="installmentNum">Taksit Sayısı*</label>
            <input
              required
              onChange={handleInputChange}
              type="text"
              id="installmentNum"
              name="installmentNum"
              placeholder="12"
            />
            {errors.installmentNum && <small>{errors.installmentNum}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="profit">Kâr Oranı(%)*</label>
            <input
              required
              onChange={handleInputChange}
              type="text"
              id="profit"
              name="profit"
              placeholder="0.79"
            />
            {errors.profit && <small>{errors.profit}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="installmentFrequency">Taksit Aralığı*</label>
            <select
              onChange={handleInputChange}
              id="installmentFrequency"
              name="installmentFrequency"
              value={values.installmentFrequency}
            >
              <option value="7">Haftalık</option>
              <option value="30">Aylık</option>
              <option value="365">Yıllık</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="kkdf">KKDF(%)</label>
            <input
              required
              onChange={handleInputChange}
              type="text"
              id="kkdf"
              name="kkdf"
              placeholder="15"
            />
            {errors.kkdf && <small>{errors.kkdf}</small>}
          </div>
          <div className="form-group">
            <label htmlFor="bsmv">BSMV(%)</label>
            <input
              required
              onChange={handleInputChange}
              type="text"
              id="bsmv"
              name="bsmv"
              placeholder="10"
            />
            {errors.bsmv && <small>{errors.bsmv}</small>}
          </div>
        </div>
        <button type="submit" className="calculateBtn">
          Hesapla
        </button>
      </div>
    </form>
  );
};

export default Form;
