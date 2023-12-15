import React, { Fragment, useEffect, useState } from 'react';
import { handleSubmit, fetchSavedPasswords } from "./utils/index";
import { ENUMS, PASSWORD_LIST_INFO } from "./utils/enums";

const PasswordChecker = () => {
    // Enum variables for better readability
    const {
        PASSWORD_EVALUATION,
        PASSWORD,
        EVALUATE_PASSWORD,
        SAVED_PASSWORD,
        STRENGTH,
        TEXT,
        PASS,
        VISIBLE
    } = ENUMS;

    // State variables
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [savedPasswords, setSavedPasswords] = useState([]);
    const [loader, setLoader] = useState(false);

    // Fetch saved passwords on component mount
    useEffect(() => {
        fetchSavedPasswords({ setSavedPasswords , setLoader })
    }, []);

    // Toggle password visibility
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    // Handle password change
    const handlePasswordChange = (event) => setPassword(event.target.value);

    // Render password info UI
    const renderPasswordInfoUI = () => {
        return (
            <div>
                <ul>
                    {PASSWORD_LIST_INFO.map((message, index) => (
                        <li key={index}>
                            {message}
                        </li>
                    ))}
                </ul>
            </div>
        )
    }

    // Render saved password UI
    const renderSavedPasswordUI = () => {
        return (
            <Fragment>
                <h2>{SAVED_PASSWORD}</h2>
                <ul>
                    {savedPasswords.map((data, index) => (
                        <li key={index}>
                            {PASSWORD} {data.password}, {STRENGTH} {data.strength}
                        </li>
                    ))}
                </ul>
            </Fragment>
        )
    }

    // Render form layout
    const renderFormLayout = () => {
        return (
            <form onSubmit={(e) => { handleSubmit({ e, password, setPassword, setSavedPasswords, fetchSavedPasswords , setLoader }) }} className="form">
                <label>
                    <div>{PASSWORD}</div>
                    <br />
                    <div className="password-input">
                        <input className="input-field position-relative" type={showPassword ? TEXT : PASS} value={password} onChange={handlePasswordChange} />
                        <i className={`eye-icon position-absolute ${showPassword ? VISIBLE : ''}`} onClick={togglePasswordVisibility}>👁️</i>
                    </div>
                </label>
                <br />
                <button className="submit-btn" type="submit">
                    {EVALUATE_PASSWORD}
                </button>
                <br />
            </form>
        )
    }

    const renderLoader = () => {
        return <div className='loaderDiv'>
            <img src='/loader.gif' alt='Loader'></img>
        </div>
    }

    // Render main component
    return (
        <div className="container">
            {loader ? <Fragment>
                <h1>{PASSWORD_EVALUATION}</h1>
                {renderFormLayout()}
                {renderPasswordInfoUI()}
                {renderSavedPasswordUI()}
            </Fragment> : renderLoader()}
        </div>
    );
};

export default PasswordChecker;
