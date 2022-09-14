import React from "react";
import { useTableContext } from "../context/TableDataContext";

function Table() {
  const { tableData } = useTableContext();
  return (
    <div className="tableBox">
      <table className="resultTable">
        <thead>
          <tr>
            <th>Taksit No</th>
            <th>Taksit Tutarı</th>
            <th>Ana Para</th>
            <th>Kalan Ana Para</th>
            <th>Kâr Tutarı</th>
            <th>KKDF</th>
            <th>BSMV</th>
          </tr>
        </thead>
        <tbody>
          {tableData.length > 0 &&
            tableData.map((item, index) => (
              <tr key={index}>
                <td>
                  <b>{item.installmentNum}</b>
                </td>
                <td>{item.installmentAmount}</td>
                <td>{item.principal}</td>
                <td>{item.remainingPrincipal}</td>
                <td>{item.profitAmount}</td>
                <td>{item.kkdf}</td>
                <td>{item.bsmv}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
