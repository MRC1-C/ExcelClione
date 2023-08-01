import { AlignLeftOutlined, BgColorsOutlined, BoldOutlined, BorderBottomOutlined, CopyOutlined, FallOutlined, FilterOutlined, FontColorsOutlined, ItalicOutlined, MergeCellsOutlined, RiseOutlined, RollbackOutlined, SearchOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, ColorPicker, Menu, Popover, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux'
import { TypeCustomBorderStyle, mergeCell, removemergeCell, setCustomBorderCell, setCustomCell, setFilter, setHoldValueCellCurent, setRaseValueCellCurent, setValueCellCurent } from '../../storeExel/features/appStateSlice';
import sumIcon from '../../assets/sum.png'
import { RootState } from '../../storeExel';
const { Option } = Select;

const fontFamilies = [
  'Arial',
  'Helvetica',
  'Times New Roman',
  'Times',
  'Courier New',
  'Courier',
  'Verdana',
];

const fontSizes = [
  8, 9, 10, 11, 12, 14, 18, 22, 26, 36, 72
]


const formatTypeData = [
  {
    key: 1,
    value: "Tổng quát"
  },
  {
    key: 2,
    value: "Số"
  },
  {
    key: 3,
    value: "Tiền tệ"
  },
  {
    key: 4,
    value: "Thời gian"
  },
]



const ItemFirstPage = () => {
  const dispatch = useDispatch()
  const { cellStyles, currentCell } = useSelector((state: RootState) => (state.appState))
  const items: MenuProps['items'] = [
    {
      label: '',
      key: 'back',
      icon: <div>
        <RollbackOutlined style={{ fontSize: 22 }} />
      </div>
    },
    {
      label: '',
      key: 'copy',
      icon: <div>

        <CopyOutlined style={{ fontSize: 22 }} />,
      </div>
    },
    {
      label: '',
      key: 'font',
      icon:
        <div>
          <div className='w-36'>
            <Select
              style={{ width: '100%' }}
              showSearch
              defaultValue={'Verdana'}
              onChange={(value: any) => dispatch(setCustomCell({ fontFamily: value }))}
            // options={options}
            >
              {fontFamilies.map((font) => (
                <Option key={font} value={font}>
                  {font}
                </Option>
              ))}
            </Select>
          </div>

          <div className='w-20'>
            <Select
              defaultValue={14}
              style={{ width: '100%' }}
              onChange={(value: any) => dispatch(setCustomCell({ fontSize: `${value}px` }))}
            >
              {fontSizes.map((font) => (
                <Option key={font} value={font}>
                  {font}
                </Option>
              ))}
            </Select>
          </div>
        </div>
    },
    {
      label: '',
      key: 'fontB',
      icon:
        <div>
          <BoldOutlined style={{ fontSize: 22 }} onClick={() => {
            let fW = cellStyles[`${currentCell.row}-${currentCell.col}`]?.fontWeight == 700 ? 400 : 700
            dispatch(setCustomCell({ fontWeight: fW }))
          }} />
        </div>
    },
    {
      label: '',
      key: 'fontI',
      icon:
        <div>
          <ItalicOutlined style={{ fontSize: 22 }} onClick={() => {
            let fS = cellStyles[`${currentCell.row}-${currentCell.col}`]?.fontStyle == 'italic' ? '' : 'italic'
            dispatch(setCustomCell({ fontStyle: fS }))
          }} />
        </div>
    },
    {
      label: '',
      key: 'border',
      icon:
        <div>
          <Popover placement='bottom' content={() => <div className='flex flex-col'>
            <Button type='text' onClick={() => { dispatch(setCustomBorderCell(TypeCustomBorderStyle.NONE)) }}>Không viền</Button>
            <Button type='text' onClick={() => { dispatch(setCustomBorderCell(TypeCustomBorderStyle.TOP)) }}>Viền trên</Button>
            <Button type='text' onClick={() => { dispatch(setCustomBorderCell(TypeCustomBorderStyle.BOTTOM)) }}>Viền dưới</Button>
            <Button type='text' onClick={() => { dispatch(setCustomBorderCell(TypeCustomBorderStyle.LEFT)) }}>Viền trái</Button>
            <Button type='text' onClick={() => { dispatch(setCustomBorderCell(TypeCustomBorderStyle.RIGHT)) }}>Viền phải</Button>
            <Button type='text' onClick={() => { dispatch(setCustomBorderCell(TypeCustomBorderStyle.ALL)) }}>Viền tất cả</Button>
          </div>}>
            <BorderBottomOutlined style={{ fontSize: 22 }} />
          </Popover>
        </div>
    },
    {
      label: '',
      key: 'bgcolor',
      icon:
        <div>
          <ColorPicker trigger="hover"
            onChangeComplete={(color) => dispatch(setCustomCell({ backgroundColor: color.toHexString() }))}
          >
            <BgColorsOutlined style={{ fontSize: 22 }} />
          </ColorPicker>
        </div>
    },
    {
      label: '',
      key: 'fontcolor',
      icon:
        <div>
          <ColorPicker trigger="hover"
            onChangeComplete={(color) => dispatch(setCustomCell({ color: color.toHexString() }))}
          >
            <FontColorsOutlined style={{ fontSize: 22 }} />
          </ColorPicker>
        </div>
    },
    {
      label: '',
      key: 'align',
      icon:
        <div>
          <Popover placement='bottom' content={() => <div className='flex flex-col'>
            <Button type='text' onClick={() => { dispatch(setCustomCell({ textAlign: 'left' })) }}>Căn trái</Button>
            <Button type='text' onClick={() => { dispatch(setCustomCell({ textAlign: 'center' })) }}>Giữa</Button>
            <Button type='text' onClick={() => { dispatch(setCustomCell({ textAlign: 'right' })) }}>Căn phải</Button>
            <Button type='text' onClick={() => { dispatch(setCustomCell({ verticalAlign: 'top' })) }}>Căn trên</Button>
            <Button type='text' onClick={() => { dispatch(setCustomCell({ verticalAlign: 'middle' })) }}>Căn giữa</Button>
            <Button type='text' onClick={() => { dispatch(setCustomCell({ verticalAlign: 'bottom' })) }}>Căn dưới</Button>
          </div>}>
            <AlignLeftOutlined style={{ fontSize: 22 }} />
          </Popover>
        </div>
    },
    {
      label: '',
      key: 'mergtcell',
      icon:
        <div>
          <Popover placement='bottom' content={() => <div className='flex flex-col'>
            <Button type='text' onClick={() => dispatch(mergeCell())}>Gộp ô</Button>
            <Button type='text' onClick={() => dispatch(removemergeCell())}>Tách ô</Button>
          </div>}>
            <MergeCellsOutlined style={{ fontSize: 22 }} />
          </Popover>
        </div>
    },
    {
      label: '',
      key: 'sum',
      icon:
        <div>
          <Popover placement='bottom' content={() => <div className='flex flex-col'>
            <Button type='text' onClick={() => dispatch(setValueCellCurent('=SUM('))}>Tổng</Button>
            <Button type='text' onClick={() => dispatch(setValueCellCurent('=AVERAGE('))}>Trung bình</Button>
            <Button type='text' onClick={() => dispatch(setValueCellCurent('=COUNT('))}>Đếm số</Button>
            <Button type='text' onClick={() => dispatch(setValueCellCurent('=MAX('))}>Tối đa</Button>
            <Button type='text' onClick={() => dispatch(setValueCellCurent('=MIN('))}>Tối thiểu</Button>
          </div>}>
            <img src={sumIcon} alt='sum' className='mt-4' style={{ height: 19 }} />
          </Popover>
        </div>
    },
    {
      label: '',
      key: 'font1',
      icon:
        <div className='w-36'>
          <Select
            defaultValue={"Tổng quát"}
            style={{ width: '100%' }}
            onChange={(value: any) => console.log(value)}
          >
            {formatTypeData.map((font) => (
              <Option key={font.key} value={font.value}>
                {font.value}
              </Option>
            ))}
          </Select>
        </div>
    },
    {
      label: '',
      key: 'rise',
      icon:
        <div>
          <RiseOutlined style={{ fontSize: 22 }} onClick={() => dispatch(setRaseValueCellCurent())} />
        </div>
    },
    {
      label: '',
      key: 'fall',
      icon:
        <div>
          <FallOutlined style={{ fontSize: 22 }} onClick={() => dispatch(setHoldValueCellCurent())} />
        </div>
    },
    {
      label: '',
      key: 'fillter',
      icon:
        <div>
          <Popover placement='bottom' content={() => <div className='flex flex-col'>
            <Button type='text' onClick={() => { dispatch(setCustomCell({ textAlign: 'left' })) }}>Sắp xếp theo tăng dần</Button>
            <Button type='text' onClick={() => { dispatch(setCustomCell({ textAlign: 'center' })) }}>Sắp xệp theo giảm dần</Button>
            <Button type='text' onClick={() => { dispatch(setFilter()) }}>Bộ lọc</Button>
          </div>}>
            <FilterOutlined style={{ fontSize: 22 }} />
          </Popover>
        </div>

    },
    {
      label: '',
      key: 'search',
      icon:
        <div>
          <SearchOutlined style={{ fontSize: 22 }} />
        </div>
    },
    // {
    //   label: '',
    //   key: 'TableOutlined',
    //   icon:
    //     <div>
    //       <TableOutlined style={{ fontSize: 22 }} />
    //       <div className='pl-3 text-sm'>Định dạng có điều kiện</div>
    //     </div>
    // },
    // {
    //   label: '',
    //   key: 'RadiusBottomrightOutlined1',
    //   icon:
    //     <div>
    //       <RadiusBottomrightOutlined style={{ fontSize: 22 }} />
    //       <div className='pl-3 text-sm'>Kiểu ô</div>
    //     </div>
    // },
    // {
    //   label: '',
    //   key: 'RadiusBottomrightOutlined',
    //   icon:
    //     <div>
    //       <RadiusBottomrightOutlined style={{ fontSize: 22 }} />
    //       <div className='pl-3 text-sm'>Định dạng dưới văn bản</div>
    //     </div>
    // },
    // {
    //   label: '',
    //   key: 'đinhang',
    //   icon:
    //     <div>
    //       <TableOutlined style={{ fontSize: 22 }} />
    //       <div className='pl-3 text-sm'>Định dạng</div>
    //     </div>
    // },
  ]
  return (
    <Menu mode="horizontal" items={items} />
  )
}

export default ItemFirstPage