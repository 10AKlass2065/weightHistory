import React, {useState} from 'react';
import styles from './datePickerModal.sass';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export function DatePickerModal(props) {

    const {onSubmit, onCancel} = props;

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(null);

    const onChange = dates => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    const handleSubmit = () => {
        if (startDate && endDate) {
            onSubmit(startDate, endDate)
        } else {
            onCancel()
        }
    }

    return (
        <div className={'date-picker-modal-wrapper'} onClick={onCancel}>
            <div className={'date-picker-modal-body'} onClick={ev => ev.stopPropagation()}>
                <DatePicker
                    selected={startDate}
                    onChange={onChange}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    inline
                />
                <button onClick={handleSubmit} className={`action-button submit-date`}>Submit</button>
            </div>
        </div>
    );
}