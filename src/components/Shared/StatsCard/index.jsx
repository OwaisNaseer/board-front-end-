import React from 'react';
import { ProgressIcon } from '../../../assets/icons';

const StatsCard = ({ name, amount, percentage, metrics }) => {
    return (
       <React.Fragment>
            <div className='rounded-[10px] border-[1px] border-cool-grey-200 p-3 sm:p-3 lg:p-4 flex flex-col gap-6 stats-card-shadow'>
                <p className='text-[13px] sm:text-[14px] lg:text-[16px] font-[475] leading-[22px] tracking-[-0.18px] text-cool-grey-1100'>
                    {name}
                </p>
                <div className='flex flex-col gap-1'>
                    <p className='text-[13px] sm:text-[14px] lg:text-[16px] font-[600] leading-[22px] tracking-[-0.18px] text-cool-grey-1100'>
                        {amount}
                    </p>
                    <div className='flex items-center gap-1'>
                        <ProgressIcon fill={metrics > 0 ? '#019939' : '#E12121'} />
                        <span
                            className={`text-[12px] font-[600] leading-[18px] tracking-[-0.18px] ${metrics > 0 ? 'text-green-800' : 'text-red-800'
                                }`}
                        >
                            {percentage > 0 ? '+' : ''}{percentage}%
                        </span>
                        <span className='text-[12px] font-[400] leading-[18px] tracking-[-0.18px] text-cool-grey-800'>
                            vs last 30 days
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default StatsCard;
