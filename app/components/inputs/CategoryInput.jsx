"use client"
import Select from 'react-select'
import useCountries from '@/app/hooks/UseCountries';

export const CategoryInput = ({ onClick, icon:Icon, label, selected }) => {
    return (
        <div onClick={() => onClick(label)} className={`${selected ? 'border-black' : 'border-neutral-200'} rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer`}>
            <Icon size={30} />
            <div className="font-semibold">{label}</div>
        </div>
    );
}
