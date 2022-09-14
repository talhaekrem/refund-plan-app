import { useEffect, useRef, useState } from "react";
import "./App.css";
import Form from "./components/Form";
import Table from "./components/Table";
import Result from "./components/Result";
import { FormProvider } from "./context/FormDataContext";
import { TableProvider } from "./context/TableDataContext";
function App() {
  const [showTable, setShowTable] = useState(false);

  const [calculated, setCalculated] = useState(false);
  return (
    <FormProvider>
      <TableProvider>
        <div className="App">
          <h1 className="app-title">Refund Plan App</h1>
          <Form setCalculated={setCalculated} />
          {calculated && (
            <Result showTable={showTable} setShowTable={setShowTable} />
          )}
          {showTable && <Table />}
        </div>
      </TableProvider>
    </FormProvider>
  );
}

export default App;
