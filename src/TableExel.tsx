import { useEffect, useRef, useState } from "react";
import { HyperFormula } from "hyperformula";
// @ts-ignore
import { HotTable } from "@handsontable/react";
// @ts-ignore
import { registerAllModules } from 'handsontable/registry';
import "handsontable/dist/handsontable.full.min.css";
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from "./storeExel";
// @ts-ignore
import { registerRenderer, textRenderer } from 'handsontable/renderers';
import { setCurrentCell, setData, updateData } from "./storeExel/features/appStateSlice";
const COL = 50;
const ROW = 25;


// register Handsontable's modules
registerAllModules();

const TableExcel: React.FC = () => {
  const hotNamedExpressionsRef = useRef<HotTable>(null);
  const { data, mergeCells, cellStyles, dropdownMenu } = useSelector((state: RootState) => (state.appState))
  const [cellStyle, setCellStyle] = useState<any>([])
  const dispatch = useDispatch()
  useEffect(() => {
    let dt: any[] = [
      ['Travel ID', 'Destination', 'Base price', 'Price with extra cost'],
      ["154", "Rome", 400],
      ["155", "Athens", 300],
      ["156", "Warsaw", 150],
    ];
    dt = PaddingData(dt)
    dispatch(setData(dt))
  }, [])


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

  useEffect(() => {
    setCellStyle(FormatCustomCells(cellStyles))
  }, [cellStyles])

  const FormatCustomCells = (cellStyles: Record<string, any>) => {
    let arrStyles = []
    for (const property in cellStyles) {
      registerRenderer(property, (hotInstance: any, TD: any, ...rest: any) => {
        textRenderer(hotInstance, TD, ...rest);
        let cellStyle = cellStyles[property]
        for (const property in cellStyle) {
          TD.style[property] = cellStyle[property]
        }
      });
      let propertySplit = property.split('-')
      let cellStyle = {
        row: propertySplit[0],
        col: propertySplit[1],
        renderer: property,
      }
      arrStyles.push(cellStyle)
    }
    return arrStyles
  }

  const onBeforeHotChange = (changes: any) => {
    dispatch(updateData(changes));
    return false

  }
  return (
    <div className="flex-auto">
      <HotTable
        ref={hotNamedExpressionsRef}
        data={data}
        // data={PaddingData([[]])}
        colHeaders={true}
        rowHeaders={true}
        height="100%"
        weight="100%"
        // contextMenu={true}
        stretchH="all"
        readOnly={false}
        selectionMode="multiple"
        outsideClickDeselects={false}
        licenseKey="non-commercial-and-evaluation"
        // formulas={{
        //   engine: HyperFormula,
        // }}

        mergeCells={mergeCells}
        manualColumnResize={true}
        filters={true}
        dropdownMenu={dropdownMenu}
        manualRowResize={true}
        afterSelectionEndByProp={(row: number, col: number, row2: number, col2: number, _selectionLayerLevel: any) => {
          dispatch(setCurrentCell({ row: row, col: col, row2: row2, col2: col2 }))
        }}
        beforeChange={onBeforeHotChange}
        cell={cellStyle}
      />
    </div>
  );
};

export default TableExcel;
