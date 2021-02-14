import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";
import {addWeightRecord, filterWeightDataAction, getProfileInfo, hideRecordError, logOut} from "../AC";
import Loading from "react-loading";
import {LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip} from 'recharts';
import styles from "./profile.sass"
import DatePickerModal from "../DatePickerModal";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


function Profile(props) {

    const {userData, newWeightRecord} = useSelector(state => state.user);
    const dispatch = useDispatch();
    const [customDatePickerOpened, setCustomDatePickerOpened] = useState(false);
    const [showError, setShowError] = useState(false);
    const [date, setDate] = useState(new Date());
    const [weight, setWeight] = useState(40);

    const windowHeight = window.screen.height;
    const windowWidth = window.screen.width;

    const widthMultiplier = windowWidth < 1024 ? 0.9 : 0.6
    const heightMultiplier = windowHeight / windowWidth > 1.3 ? 0.4 : 0.7

        useEffect(() => {
        if (!userData.loaded && !userData.loading && userData.authToken) {
            dispatch(getProfileInfo(userData.authToken))
        }
    }, [userData])

    useEffect(() => {
        if (newWeightRecord.error) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false)
                dispatch(hideRecordError())
            }, 3000)
        }
    }, [newWeightRecord.error])

    if (!userData.authToken || userData.error) {
        return <Redirect to={"/login"}/>
    }

    const handleWeightChange = (ev) => {
        setWeight(ev.target.value);
    }

    const handleBlur = (ev) => {
        if (ev.target.value < 40) {
            setWeight(40)
        } else if (ev.target.value > 300) {
            setWeight(300)
        } else {
            setWeight(Number(ev.target.value).toFixed(1))
        }
    }

    const filterWeight = (startDate, endDate) => {
        dispatch(filterWeightDataAction(startDate, endDate))
    }

    const getDateWithOffset = (offset) => {
        const currentDate = new Date();
        currentDate.setDate(new Date().getDate() - offset);

        return currentDate;
    }

    const renderLoading = (userData) => {
        if (!userData.loaded) {
            return (
                <div className={'loading-wrapper'} >
                    <Loading type={"bubbles"} color={'#0366d6'} height={'300px'} width={'300px'} />
                </div>
            )
        }
    }

    const handleSubmit = (endDate, startDate) => {
        filterWeight(startDate, endDate)
        setCustomDatePickerOpened(false)
    }
    
    const handleAddRecord = () => {
        if(date && weight && !newWeightRecord.loading) {
            dispatch(addWeightRecord(date, weight, userData.authToken))
        }
    }

    const renderChart = (userData) => {
         if (userData.filteredWeightData) {
            return (
                <div className={'chart-wrapper'}>
                    <div className={'chart-control-panel'}>
                        <span className={'chart-control-button'} onClick={() => filterWeight((new Date()), getDateWithOffset(7))}>1 Week</span>
                        <span className={'chart-control-button'} onClick={() => filterWeight((new Date()), getDateWithOffset(14))}>2 Week's</span>
                        <span className={'chart-control-button'} onClick={() => filterWeight((new Date()), getDateWithOffset(30))}>1 Month</span>
                        <span className={'chart-control-button'} onClick={() => filterWeight((new Date()), getDateWithOffset(180))}>6 Month's</span>
                        <span className={'chart-control-button'} onClick={() => filterWeight((new Date()), getDateWithOffset(365))}>1 Year</span>
                        <span className={'chart-control-button'} onClick={() => setCustomDatePickerOpened(true)}>Custom</span>
                    </div>
                    <LineChart width={windowWidth * widthMultiplier} height={windowHeight * heightMultiplier} data={userData.filteredWeightData}>
                        <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                        <CartesianGrid stroke="#ccc" />
                        <XAxis dataKey="readableDate" />
                        <YAxis type={'number'} domain={['dataMin', 'dataMax']}/>
                        <Tooltip />
                    </LineChart>
                </div>
            )
        }
    }

    const renderAddRecord = () => {
        return (
            <div className={'add-record-wrapper'}>
                <DatePicker
                    selected={date}
                    onChange={startDate => setDate(startDate)}
                    maxDate={new Date()}
                    inline
                />
                <input
                    onChange={handleWeightChange}
                    value={weight}
                    className={`weight-input`}
                    min={40}
                    max={300}
                    onBlur={handleBlur}
                    type={"number"}
                    placeholder={"Weight"}
                />
                <button onClick={handleAddRecord} className={`action-button submit-date`}>Add Record</button>
            </div>
        )
    }

    const renderError = () => {
        if (showError) {
            return <span className={'modal-error'}>{newWeightRecord.error}</span>
        }
    }

    return (
        <div className={'profile-wrapper'}>
            <button onClick={() => dispatch(logOut())} className={`action-button log-out`}>Log Out</button>
            {renderLoading(userData)}
            {renderChart(userData)}
            {renderAddRecord()}
            {renderError()}
            {customDatePickerOpened && (
                <DatePickerModal
                    onSubmit={handleSubmit}
                    onCancel={() => setCustomDatePickerOpened(false)}
                />
            )}
        </div>
    );
}

export default Profile;