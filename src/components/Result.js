import React from "react";
import { useTableContext } from "../context/TableDataContext";

function Result({ showTable, setShowTable }) {
  const { totalPayingAmount, perInstallmentAmount, taxesAmount } =
    useTableContext();
  return (
    <>
      <div className="resultBox">
        <div>
          <span>Toplam Tutar:</span> <b>{totalPayingAmount} TL</b>
        </div>
        <div>
          <span>Taksit Tutarı:</span> <b>{perInstallmentAmount} TL</b>
        </div>
        <div>
          <span>Vergiler:</span> <b>{taxesAmount} TL</b>
        </div>
      </div>
      <div className="showTableBox">
      <button className="showTableBtn" onClick={() => setShowTable((prev) => !prev)}>
        Tabloyu {showTable ? "Gizle" : "Göster"}
      </button>
      </div>
    </>
  );
}

export default Result;
