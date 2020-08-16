import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as actions from './Component/store/actions';
import { Redirect } from 'react-router-dom';
import Spinner from './Component/Spinner';

const Home = props => {

    // State to control the form

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState("");
    const [income, setIncome] = useState('');
    const [formErrorFirstName, setFormErrorFirstName] = useState(false);
    const [formErrorLastName, setFormErrorLastName] = useState(false);
    const [formErrorIncome, setFormErrorIncome] = useState(false);

    // To handle and validate the change in form field

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
        if ((event.target.value === "") || (event.target.value === null) || (event.target.value === " ")) {
            setFormErrorFirstName('Should not be empty')
        }
        else {
            if (event.target.value.length < 2)  {
                setFormErrorFirstName('Atleast 2 characters')
            }
            else {
                setFormErrorFirstName('')
            }
        }
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
        if ((event.target.value === "") || (event.target.value === null) || (event.target.value === " ")) {
            setFormErrorLastName('Should not be empty')
        }
        else {
            if (event.target.value.length < 2)  {
                setFormErrorLastName('Atleast 2 characters')
            }
            else {
                setFormErrorLastName('')
            }
        }
    }

    const handleIncomeChange = (event) => {
        let formIncome = event.target.value;
        if (isNaN(formIncome) || formIncome < 1) {
            setIncome(event.target.value );
            setFormErrorIncome('Invalid Income Input');
          } 
        else {
            let reStrictToTwoDecimal= (formIncome.indexOf(".") >= 0) ? (formIncome.substr(0, formIncome.indexOf(".")) + formIncome.substr(formIncome.indexOf("."), 3)) : formIncome;
            setIncome(reStrictToTwoDecimal);
            setFormErrorIncome('');
        }
    }

    const handleDobChange = (event) => {
        setDob(event.target.value)
    }

    // To submit the form to get the decision check services

    const handleSubmit = (event) => {
        event.preventDefault();
        if (firstName === lastName) {
            setFormErrorLastName('Lastname should not be same')
        } else if ((formErrorFirstName === '') &&  (formErrorLastName === '') && (formErrorIncome === '')) {
            props.spinnerAction();
            props.requestFetchDecisions(firstName, lastName, dob, income);
            setFirstName('')
            setLastName('')
            setDob("")
            setIncome('')
           }
        }

    // To get the current day

    const todayDate = () => {
        let d = new Date(),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-').toString();
    }

    // To render the check form

    let uiRender;

    if (props.renderUiPage === 'Home') {
        uiRender = <div className="section">
        <div className="row subHeadingContainer">
            <h2>Pre-qualification Check Form</h2>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="contact-form">
                    <div className="row">
                        <div className="col span-1-of-3">
                            <label>First Name *</label>
                        </div>
                        <div className="col span-1-of-3">
                            <input type="text" id="firstName" placeholder="Enter your First Name" required onChange={handleFirstNameChange} value={firstName} maxLength="15" />
                        </div>
                        <div className="col span-1-of-3 errorMessage"> 
                             <p id="formErrorFirstName">{formErrorFirstName}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col span-1-of-3">
                            <label>Last Name *</label>
                        </div>
                        <div className="col span-1-of-3">
                            <input type="text" id="lastName" placeholder="Enter your Last Name" required onChange={handleLastNameChange} value={lastName}  maxLength="15"  />
                        </div>
                        <div className="col span-1-of-3 errorMessage"> 
                             <p id="formErrorLastName">{formErrorLastName}</p>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col span-1-of-3">
                            <label>Annual Income in £ *</label>
                        </div>
                        <div className="col span-1-of-3">
                            <input type="text" id="income"  placeholder="Enter your Income" required onChange={handleIncomeChange} value={income} />
                        </div>
                        <div className="col span-1-of-3 errorMessage"> 
                             <p id="formErrorIncome">{formErrorIncome}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col span-1-of-3">
                            <label>Birth Date *</label>
                        </div>
                        <div className="col span-1-of-3">
                            <input type="date" id="dob" placeholder="dd-mm-yyyy" required onChange={handleDobChange} value={dob} max={todayDate()} />
                        </div>
                        <div className="col span-1-of-3"> 
                        <label>&nbsp;</label>
                        </div>
                    </div>
                    <br></br>
                    <div className="row">
                        <div className="col span-1-of-3">
                            <label>&nbsp;</label>
                        </div>
                        <div className="col span-2-of-3">
                            <input type="submit" value="Submit"></input>
                        </div>
                    </div>
                </div>
            </div>
        </form>
        <br></br>
        <div className="errorMessage">
            <p>{props.serverFetchError}</p>
        </div>
    </div>
    }

    if (props.renderUiPage === 'Loading') {
        uiRender = <div className="spinnerCenter"><Spinner /></div>;                  
    }

    // To render the UI page based on the services 

    if (props.renderUiPage === 'Barclay') {
        uiRender = <Redirect to="/pages/Barclay" />
    }

    if (props.renderUiPage === 'Vanquis') {
        uiRender = <Redirect to="/pages/Vanquis" />
    }

    if (props.renderUiPage === 'NotEligible') {
        uiRender = <Redirect to="/pages/NotEligible" />
    }

    return (
        uiRender
    );

};


const mapStateToProps = (state) => {
    return {
        renderUiPage: state.pageTag.uiPage,
        serverFetchError: state.pageTag.FetchError,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        requestFetchDecisions: (firstName, lastName, dob, income) => dispatch(actions.fetchDecisions(firstName, lastName, dob, income)),
        spinnerAction: () => dispatch(actions.spinnerAction())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);
