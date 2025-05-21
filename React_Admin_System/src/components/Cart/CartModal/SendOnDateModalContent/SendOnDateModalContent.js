import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import './SendOnDateModalContent.css'

const SendOnDateModalContent = ({ setIsSendOnDateModalOpen, sendOnDate, changeSendOnDate }) => {
    const [dayValue, setDayValue] = useState('01');
    const [monthValue, setMonthValue] = useState('01');
    const [yearValue, setYearValue] = useState(new Date().getUTCFullYear());
    const [daysList, setDaysList] = useState([]);
    const [yearOptions, setYearOptions] = useState([new Date().getUTCFullYear()]);
    const [monthOptions, setMonthOptions] = useState([...Array(12).keys()].map(i => (i + 1).toString().padStart(2, '0')));
    const [errorMessage, setErrorMessage] = useState('');
    const dayBoxRef = useRef();
    const monthBoxRef = useRef();
    const yearBoxRef = useRef();

    const saveSendOnDate = () => {
        const selectedDate = new Date(Date.UTC(yearValue, monthValue - 1, dayValue));
        const currentDate = new Date();
        const currentUTCDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate()));
        const maxDate = new Date(Date.UTC(currentUTCDate.getUTCFullYear(), currentUTCDate.getUTCMonth() + 6, currentUTCDate.getUTCDate()));

        if (selectedDate < currentUTCDate) {
            setErrorMessage('Please select a date in the future.');
            return;
        }

        if (selectedDate > maxDate) {
            setErrorMessage('The latest date for selection must be within 6 months of today.');
            return;
        }

        const dayOfWeek = selectedDate.getUTCDay();
        if (dayOfWeek === 6 || dayOfWeek === 0) {
            setErrorMessage('We send orders Monday to Friday. Please select a weekday for your order.');
            return;
        }

        const currentHour = currentDate.getUTCHours();
        if (selectedDate.toUTCString() === currentUTCDate.toUTCString() && currentHour >= 15) {
            setErrorMessage('Orders placed after 3pm be sent tomorrow. Please select a date from tomorrow onwards.');
            return;
        }

        changeSendOnDate(`${dayValue}/${monthValue}/${yearValue}`);
        setIsSendOnDateModalOpen(false);
    };

    const updateDaysList = (year, month) => {
        const numberOfDaysInMonth = new Date(Date.UTC(year, month, 0)).getUTCDate();
        const daysArray = [...new Array(numberOfDaysInMonth)].map((_, i) => (i + 1).toString().padStart(2, '0'));
        setDaysList(daysArray);

        if (dayValue > numberOfDaysInMonth) {
            setDayValue(daysArray[daysArray.length - 1]);
        }
    };

    useEffect(() => {
        if (sendOnDate) {
            const dateArray = sendOnDate.split('/');
            setDayValue(dateArray[0]);
            setMonthValue(dateArray[1]);
            setYearValue(dateArray[2]);
        } else {
            const dateObj = new Date();
            setDayValue(dateObj.getUTCDate().toString().padStart(2, '0'));
            setMonthValue((dateObj.getUTCMonth() + 1).toString().padStart(2, '0'));
            setYearValue(dateObj.getUTCFullYear());
        }
    }, [sendOnDate]);

    useEffect(() => {
        const currentDate = new Date();
        const maxDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth() + 6, currentDate.getUTCDate()));
        const currentYear = currentDate.getUTCFullYear();
        const maxYear = maxDate.getUTCFullYear();

        if (currentYear === maxYear) {
            setYearOptions([currentYear]);
            setMonthOptions([...Array(12).keys()].map(i => (i + 1).toString().padStart(2, '0')));
        } else {
            setYearOptions([currentYear, currentYear + 1]);
            if (yearValue === currentYear) {
                setMonthOptions([...Array(12).keys()].map(i => (i + 1).toString().padStart(2, '0')));
            } else {
                const maxMonth = maxDate.getUTCMonth() + 1;
                setMonthOptions([...Array(maxMonth).keys()].map(i => (i + 1).toString().padStart(2, '0')));
            }
        }
    }, [yearValue]);

    useEffect(() => {
        updateDaysList(yearValue, monthValue);
    }, [monthValue, yearValue]);


    return (
        <div className='send-on-modal-backdrop' onClick={() => setIsSendOnDateModalOpen(false)}>
            <div className='send-on-modal-wrapper' onClick={(e) => e.stopPropagation()}>
                <div className='cart-send-on-modal-header'>Send On Date</div>
                <div className='cart-send-on-modal-content'>
                    <div className='cart-send-on-modal-content-dates'>
                        <div className='cart-send-on-box'>
                            <input
                                className='cart-send-on-date-input'
                                type='text'
                                value={dayValue}
                                readOnly
                                onFocus={() => {
                                    dayBoxRef.current.style.display = 'block';
                                    monthBoxRef.current.style.display = 'none';
                                    yearBoxRef.current.style.display = 'none';
                                }}
                            />
                            <div
                                ref={dayBoxRef}
                                className='cart-send-on-box-list-wrapper'
                                onClick={() => {
                                    dayBoxRef.current.style.display = 'none';
                                }}
                            >
                                <ul className='cart-send-on-box-list'>
                                    {daysList.map(day => (
                                        <li
                                            key={day}
                                            onClick={() => {
                                                setDayValue(day);
                                                dayBoxRef.current.style.display = 'none';
                                            }}
                                        >
                                            {day}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='cart-send-on-name'>Day</div>
                        </div>
                        <div className='cart-send-on-box'>
                            <input
                                className='cart-send-on-date-input'
                                type='text'
                                value={monthValue}
                                readOnly
                                onFocus={() => {
                                    dayBoxRef.current.style.display = 'none';
                                    monthBoxRef.current.style.display = 'block';
                                    yearBoxRef.current.style.display = 'none';
                                }}
                            />
                            <div
                                ref={monthBoxRef}
                                className='cart-send-on-box-list-wrapper'
                                onClick={() => {
                                    monthBoxRef.current.style.display = 'none';
                                }}
                            >
                                <ul className='cart-send-on-box-list'>
                                    {monthOptions.map(month => (
                                        <li
                                            key={month}
                                            onClick={() => {
                                                setMonthValue(month);
                                                monthBoxRef.current.style.display = 'none';
                                            }}
                                        >
                                            {month}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='cart-send-on-name'>Month</div>
                        </div>
                        <div className='cart-send-on-box'>
                            <input
                                className='cart-send-on-date-input cart-send-on-date-input-long'
                                type='text'
                                value={yearValue}
                                readOnly
                                onFocus={() => {
                                    dayBoxRef.current.style.display = 'none';
                                    monthBoxRef.current.style.display = 'none';
                                    yearBoxRef.current.style.display = 'block';
                                }}
                            />
                            <div
                                ref={yearBoxRef}
                                className='cart-send-on-box-list-wrapper cart-send-on-date-input-long'
                                onClick={() => {
                                    yearBoxRef.current.style.display = 'none';
                                }}
                            >
                                <ul className='cart-send-on-box-list'>
                                    {yearOptions.map(year => (
                                        <li
                                            key={year}
                                            onClick={() => {
                                                setYearValue(year);
                                                yearBoxRef.current.style.display = 'none';
                                            }}
                                        >
                                            {year}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='cart-send-on-name'>Year</div>
                        </div>
                    </div>
                    {errorMessage && <div className="cart-error-message">{errorMessage}</div>}
                    <div className='cart-send-on-content-info'>
                        Please note that this is the date your card will leave our production facility, <b>not the date of arrival</b>. We recommend that you allow additional time for delivery based on the postage method selected.
                    </div>
                </div>
                <div className='cart-send-on-modal-footer'>
                    <button className='cart-send-on-modal-cancel-button' onClick={() => setIsSendOnDateModalOpen(false)}>
                        Cancel
                    </button>
                    <button className='cart-send-on-modal-confirm-button' onClick={() => saveSendOnDate()}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SendOnDateModalContent

SendOnDateModalContent.propTypes = {
    setIsSendOnDateModalOpen: PropTypes.func.isRequired,
    sendOnDate: PropTypes.string,
    changeSendOnDate: PropTypes.func.isRequired
}
