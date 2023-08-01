import { Input } from 'antd'
import { useState, useEffect } from 'react'
import { RootState } from './storeExel'
import { useSelector, useDispatch } from 'react-redux'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import fxIcon from './assets/fxIcon.png'
import { setValueCellCurent } from './storeExel/features/appStateSlice';
// import * as XLSX from 'xlsx';

const CaculatorExcel = () => {
    const { currentCell, data } = useSelector((state: RootState) => (state.appState))
    const dispatch = useDispatch()
    const [fx, setFx] = useState<any>('')


    useEffect(() => {
        setFx(data[currentCell.row][currentCell.col] || '')
    }, [currentCell])

    // const exportToExcel = (data: any[][], mergeCells: any, cellStyles: any): void => {
    //     // Tạo một workbook mới
    //     const workbook = XLSX.utils.book_new();

    //     // Tạo một worksheet mới
    //     const worksheet = XLSX.utils.aoa_to_sheet(data);

    //     // Áp dụng các style cho các ô
    //     for (const cellStyle in cellStyles) {
    //         const cellColRow = cellStyle.split('-');
    //         const style = cellStyles[cellStyle]
    //         console.log({ r: Number(cellColRow[0]), c: Number(cellColRow[1]) })
    //         const cellAddress = XLSX.utils.encode_cell({ r: Number(cellColRow[0]), c: Number(cellColRow[1]) });
    //         const cell = worksheet[cellAddress];

    //         // Sử dụng hàm XLSX.utils.format_cell để áp dụng các style cho cell
    //         worksheet[cellAddress] = XLSX.utils.format_cell(cell, style);
    //     }
    //     // Áp dụng các mergeCells
    //     // worksheet['!merges'] = mergeCells;

    //     // Thêm worksheet vào workbook
    //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

    //     // Xuất file
    //     const excelBuffer = XLSX.write(workbook, { type: 'array' });
    //     const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = 'data.xlsx';
    //     a.click();
    // };


    const onCaculator = () => {
        !!fx && dispatch(setValueCellCurent(fx))
    }

    const getText = () => {
        if (currentCell.col == currentCell.col2 && currentCell.row == currentCell.row2)
            return `${String.fromCharCode(currentCell.col + 65)}${currentCell.row + 1}`
        return `${String.fromCharCode(currentCell.col + 65)}${currentCell.row + 1}x${String.fromCharCode(currentCell.col2 + 65)}${currentCell.row2 + 1}`
    }

    return (
        <div className="flex flex-row px-3 gap-3 py-1">
            <Input className="w-20" value={getText()} />
            <div className='flex flex-row items-center gap-2'>
                <CloseOutlined className={`text-[24px] ${!!fx ? 'text-red-600' : ''}`} onClick={() => setFx('')} />
                <CheckOutlined className={`text-[24px] ${!!fx ? 'text-green-500' : ''}`} onClick={onCaculator} />
                <img src={fxIcon} className='w-5 h-5 object-contain' alt='fxIcon' />
            </div>
            <div className='flex-auto'>
                <Input width={'100%'} placeholder='=A1+C1' value={fx + ''} onChange={e => setFx(e.target.value)} />
            </div>
        </div >
    )
}

export default CaculatorExcel