import React from 'react';
// Local Imports
import {
  InfoFilledIcon,
  SelectionDropArrowIcon,
  ThreeDotsIcon,
} from '../../../assets/icons';
import { Line, LineBarChat } from '../../shared';
import { data } from '../../../utils/data';

const ReportsInvoice = () => {
  // INVOICES
  const invoices = data.latestInvoices;
  return (
    <React.Fragment>
      <div className='grid grid-cols-3 gap-4 w-full mt-4'>
        {/* REPORTS SECTION WITH GRAPH */}
        <div className='p-3 sm:p-3 md:p-5 rounded-[10px] border border-neutral-500 col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 report-shadow'>
          {/* NAME WITH SELECTIONS */}
          <div className='flex items-center justify-between '>
            <div className='flex items-center gap-2'>
              <p className='text-[13px] sm:text-[14px] lg:text-[16px] font-[475] leading-[22px] tracking-[-0.18px] text-cool-grey-1100'>
                 Revenue overview
              </p>
              <InfoFilledIcon />
            </div>
            <div className='flex items-center rounded-[6px] border border-neutral-500 pl-[8px] py-[4px]'>
              <select className='text-[12px] sm:text-[14px] lg:text-[16px] font-[475] leading-[22px] tracking-[-0.18px] text-cool-grey-1100  appearance-none bg-slate-50 outline-none'>
                <option>2024</option>
                <option>2023</option>
                <option>2022</option>
              </select>
              <SelectionDropArrowIcon />
            </div>
          </div>
          {/* GRAPH */}
          <div className=''>
            <LineBarChat />
          </div>
        </div>
        {/* INVOICES SECTION */}
        <div className='py-3 pl-3 sm:pl-5 md:py-5 rounded-[10px] border border-neutral-500 col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1 report-shadow'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <p className='text-[13px] sm:text-[14px] lg:text-[16px] font-[475] leading-[22px] tracking-[-0.18px] text-cool-grey-1100'>
                Overdue Invoice
              </p>
            </div>
          </div>
          <Line className='my-[14px]' />
          {/* INVOICES */}
          {invoices.map((invoice, index) => {
            const lastLength = invoices.length - 1;
            return (
              <React.Fragment key={index}>
                <div
                  className='flex items-center justify-between pr-[10px]'
                  key={index}
                >
                  <div>
                    <p className='text-[12px] sm:text-[13px] lg:text-[13px] font-[600] leading-[16px] tracking-[-0.02px] text-grey-primary'>
                      {invoice.title} of {invoice.amount}
                    </p>
                    <span className='text-[11px] sm:text-[12px] lg:text-[12px] font-[475] leading-[18px] text-cool-grey-1000'>
                      {invoice.timeStamp}
                    </span>
                  </div>
                  <span className='cursor-pointer'>
                    <ThreeDotsIcon />
                  </span>
                </div>
                {index !== lastLength && <Line className='my-[14px]' />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default ReportsInvoice;
