import React, { Fragment, useState } from 'react';
import { ENUMS, PARTITION_LIST_INFO } from "./utils/enums";
import { minimumDifference } from "./MinimumDifference";

const PartitionMatcher = () => {
    // Enum variables for better readability
    const {
        PARTITION_LIST,
        TEXT,
        MINIMUM_DIFFERENCE
    } = ENUMS;

    // State variables
    const [password, setPassword] = useState('');
    const [output, setOutput] = useState(true);

    // Handle password change
    const handlePasswordChange = (event) => setPassword(event.target.value);

    // Render password info UI
    const renderPasswordInfoUI = () => {
        return (
            <div>
                <ul>
                    {PARTITION_LIST_INFO.map((message, index) => (
                        <li key={index}>
                            {message}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    const formatPartition = (password) => {
        const splitByComma = password.split(',');
        // Split by hyphen for negative numbers and map to integers
        const numbersArray = splitByComma.flatMap(item => {
            if (item.includes('-')) {
                return item.split('-').map(Number);
            } else {
                return [Number(item)]; // Wrap single positive numbers in an array
            }
        });
        return numbersArray;
    }

    // Render form layout
    const renderFormLayout = () => {
        return (
            <form onSubmit={(e) => {
                setOutput(minimumDifference(formatPartition(password)));
             }} className="form">
                <label>
                    <div>{PARTITION_LIST}</div>
                    <br />
                    <div className="password-input">
                        <input className="input-field position-relative" type={TEXT} value={password} onChange={handlePasswordChange} />
                    </div>
                </label>
                <br />
                <button className="submit-btn" type="submit">
                    {MINIMUM_DIFFERENCE}
                </button>
                <br />
            </form>
        )
    }

    return (
        <div className="container">
            <Fragment>
                <h1>{MINIMUM_DIFFERENCE}</h1>
                {renderFormLayout()}
                <div>Please enter numbers separated by commas: {password}</div>
                <div>Output: {output}</div>
                {renderPasswordInfoUI()}
            </Fragment>
        </div>
    );
};

export default PartitionMatcher;
