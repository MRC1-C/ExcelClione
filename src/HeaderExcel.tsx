import { Avatar, Button, Tabs, Drawer } from 'antd'
import Search from 'antd/es/input/Search'
import { useState } from 'react'
import type { TabsProps } from 'antd';


type ItemsProps = {
    item: string[]
}

const ItemsTab = ({ item }: ItemsProps) => {
    return (
        <div className='flex flex-row'>
            {
                item.map((i, idx) => <Button key={idx} type='text'>{i}</Button>)
            }
        </div>
    )
}

const HeaderExcel = () => {
    const [open, setOpen] = useState(false);
    const [activeKey, setActiveKey] = useState("2")
    const onChange = (key: string) => {
        if (key == "1") {
            showDrawer()
        }
        else {
            setActiveKey(key)
        }
    };
    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };


    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Tệp`,
            children: <ItemsTab item={["Bảng", "Form", "Vẽ"]} />,
        },
        {
            key: '2',
            label: `Trang đầu`,
            children: <ItemsTab item={["Thiết lập trang", "Vùng in", "Vẽ"]} />,
        },
        {
            key: '3',
            label: `Chèn`,
            children: <ItemsTab item={["fsdBảng", "Form", "Vẽ"]} />,
        },
        {
            key: '4',
            label: `Vẽ`,
            children: <ItemsTab item={["fsdBảng", "Form", "Vẽ"]} />,
        },
        {
            key: '5',
            label: `Bố trí trang`,
            children: <ItemsTab item={["Thiết lập trang", "Vùng in", "Vẽ"]} />,
        },
        {
            key: '6',
            label: `Công thức`,
            children: <ItemsTab item={["fsdBảng", "Form", "Vẽ"]} />,
        },
    ];


    return (
        <div>
            <div className='flex flex-row justify-between items-center bg-green-600 p-3'>
                <div>logo</div>
                <Search className='w-1/3 hidden md:inline' placeholder='Search' />
                <div>
                    <Avatar>Q</Avatar>
                </div>
            </div>
            <div className='flex flex-col lg:flex-row justify-between px-3'>
                <Tabs activeKey={activeKey} items={items} onChange={onChange} />
                <div className='pt-2'>
                    <Button>Chú thích</Button>
                    <Button>Cập nhập</Button>
                    <Button>Chỉnh sửa</Button>
                    <Button>Chia sẻ</Button>
                </div>
            </div>
            <Drawer
                placement={'left'}
                // closable={false}
                onClose={onClose}
                open={open}
            >

                <div className='h-full '>
                    <Tabs defaultActiveKey="1" items={items} onChange={onChange} className='pb-2' tabPosition='left' />;
                </div>
            </Drawer>
        </div>
    )
}

export default HeaderExcel