import { useEffect, useRef } from "react";
import { HyperFormula } from "hyperformula";
// @ts-ignore
import { HotTable } from "@handsontable/react";
// @ts-ignore
import { registerAllModules } from 'handsontable/registry';
import "handsontable/dist/handsontable.full.min.css";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "./storeExel";
import { CellCurent, setCurrentCell, setData, updateData } from "./storeExel/features/appStateSlice";


const COL = 40;
const ROW = 40;


// register Handsontable's modules
registerAllModules();

const TableExcel: React.FC = () => {
  const hotNamedExpressionsRef = useRef<HotTable>(null);
  // const [ip, setIp] = useState<String>("");
  const { data } = useSelector((state: RootState) => (state.appState))
  const dispatch = useDispatch()
  useEffect(() => {
    let dt: any[] = [
      // ['Travel ID', 'Destination', 'Base price', 'Price with extra cost'],
      ["154", "Rome", 400],
      ["155", "Athens", 300],
      ["156", "Warsaw", 150],
    ];
    dt = PaddingData(dt)
    dispatch(setData(dt))
  }, [])
  // useEffect(() => {
  //   const hotNamedExpressions = hotNamedExpressionsRef.current?.hotInstance;
  //   hotNamedExpressions.render();
  // }, [data])
  // const CaculatorCell = () => {
  //   const hotNamedExpressions = hotNamedExpressionsRef.current?.hotInstance;
  //   let op = ip.split("=");
  //   for (let i = 1; i <= col; i++) {
  //     const transformedExpression = op[1].replace(
  //       /[A-Z]/g,
  //       (match) => `${match}${i}`
  //     );
  //     if (!hotNamedExpressions) return;
  //     hotNamedExpressions.setDataAtCell(
  //       i - 1,
  //       op[0].charCodeAt(0) - "A".charCodeAt(0),
  //       "=" + transformedExpression
  //     );
  //   }
  //   hotNamedExpressions.render();
  // };

  const PaddingData = (dt: any[]) => {
    let col = dt[0].length;
    let row = dt.length;
    const emptyRow: string[] = Array(ROW).fill("");

    dt = dt.map((d) => d.concat(emptyRow.slice(0, ROW - row)));

    for (let index = 0; index < COL - col; index++) {
      dt.push([...emptyRow]);
    }

    return dt;
  };
  const onBeforeHotChange = (changes: any) => {
    dispatch(updateData(changes))
    return false
  }

  {/* <div className="flex flex-row px-3">
    <Input className="w-1/5" placeholder="D=A+C" value={ip + ""} onChange={(e) => setIp(e.target.value)} />
    <Button onClick={CaculatorCell}>Caculator</Button>
  </div> */}
  return (
    <div className="flex-auto">
      <HotTable
        ref={hotNamedExpressionsRef}
        data={data}
        colHeaders={true}
        rowHeaders={true}
        height="100%"
        weight="100%"
        contextMenu={true}
        stretchH="all"
        readOnly={false}
        licenseKey="non-commercial-and-evaluation"
        formulas={{
          engine: HyperFormula,
        }}
        afterOnCellMouseDown={(_event: any, coords: CellCurent, _TD: any) => dispatch(setCurrentCell({ row: coords.row, col: coords.col }))}
        beforeChange={onBeforeHotChange}
      />
    </div>
  );
};

export default TableExcel;
