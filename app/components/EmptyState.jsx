'use client'

import { useRouter } from 'next/navigation'
import { Heading } from './Heading';
import { Button } from './Button';
export const EmptyState = ({ title = 'No exact matces', subtitle = 'Try changing or removing some of your filters', showReset }) => {
    const router = useRouter();

    return (
        <div className='h-[60vh] flex flex-col gap-2 justify-center items-center'>
            <Heading title={title} subtitle={subtitle} center />
            <div className='w-48 mt-4'>
                {showReset && (<Button outline label='Remove all filters' onClick={() => router.push('/')} />)}
            </div>
        </div>
    );
};

