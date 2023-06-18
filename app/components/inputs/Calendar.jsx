'use client'
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

export const Calendar = ({ value, disabledDates, onChange }) => {
    return <DateRange
        rangeColors={["#262626"]}
        minDate={new Date}
        disabledDates={disabledDates}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction='vertical'
        showDateDisplay={false}
    />
};
