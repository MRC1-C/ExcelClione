import React from 'react';
import TableExel from './TableExel';
import './index.css'; // Import file CSS cho phần tử App
import HeaderExcel from './HeaderExcel';
import CaculatorExcel from './CaculatorExcel';
import { Provider } from 'react-redux';
import { store } from './storeExel';

const Excel: React.FC = () => {


  return (
    <Provider store={store}>
      <div className='w-full'>
        <div className="flex flex-col h-screen">
          <HeaderExcel />
          <CaculatorExcel />
          <TableExel />
        </div>
      </div>
    </Provider>
  );
};

export default Excel;
