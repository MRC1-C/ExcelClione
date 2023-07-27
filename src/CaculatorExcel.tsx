import { Input } from 'antd'
import { useState } from 'react'
import { RootState } from './storeExel'
import { useSelector, useDispatch } from 'react-redux'
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import fxIcon from './assets/fxIcon.png'
import { setValueCellCurent } from './storeExel/features/appStateSlice';

const CaculatorExcel = () => {
    const { currentCell } = useSelector((state: RootState) => (state.appState))
    const dispatch = useDispatch()
    const [fx, setFx] = useState<String>('')


    const onCaculator = () => {
        !!fx && dispatch(setValueCellCurent(fx))
    }
    return (
        <div className="flex flex-row px-3 gap-3 py-1">
            <Input className="w-16" value={`${String.fromCharCode(currentCell.col + 65)}${currentCell.row + 1}`} />
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