'use client'
import Select from 'react-select'
import useCountries from "@/app/hooks/UseCountries";

export const CountrySelect = ({ value, onChange }) => {
    const { getAll } = useCountries();
    return (
        <div className="">
            <Select
                theme={(theme) => ({ ...theme, borderRadius: 6, colors: { ...theme.colors, primary: 'black', primary25: '#ffe4e6' } })}
                classNames={{ control: () => 'p-3 border-2', input: () => 'text-lg', option: () => 'texy-lg' }}
                placeholder='Anywhere'
                isClearable options={getAll()}
                value={value}
                onChange={(value) => onChange(value)}
                formatOptionLabel={({ flag, label, region }) => <div className='flex fle[-row items-center gap-3'><div>{flag}</div><div>{label}, <span className='text-neutral-500 ml-1'>{region}</span></div></div>}
            />
        </div>
    );
};

