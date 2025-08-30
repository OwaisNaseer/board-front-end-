import React from 'react';
import { StatsCard } from '../../shared';
import { data } from '../../../utils/data';

const DashbaordStats = () => {
    const stats = data.stats;
    return (
          <div className='mt-[20px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full'>
            {stats.map((state, index) => (
                <StatsCard
                    name={state.name}
                    amount={state.amount}
                    percentage={state.percentage}
                    metrics={state.metrics}
                    key={index}
                />
            ))}
        </div>
    );
};

export default DashbaordStats;
