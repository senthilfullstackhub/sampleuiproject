import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// To render the Vanquis page with details
const VanquisPage = props => {

    let uiRender;

    if (props.renderUiPage === 'Vanquis') {
        uiRender = <div>
            <div className="row">
                <h2>Eligible for Vanquis Credit Card</h2>
            </div>
            <div className="row"><b>0% interest balance transfer and purchases for up to 18 months.</b></div>
            <br></br>
            <div className="row imageCenter">
                <img src="../Vanquiscard.png" alt="Vanquis card" />
            </div>
            <div className="row">
                <ul >
                    <li className="col span-1-of-3">
                        <span>Representative </span>
                        <span><b> {props.reduxCurrentApr}% APR </b></span>
                        <span >(variable)</span>
                    </li>
                    <li className="col span-1-of-3">
                        <span>Purchase rate </span>
                        <span><b> 34.95% </b></span>
                        <span>p.a. (variable)</span>
                    </li>
                    <li className="col span-1-of-3">
                        <span>Based on a </span>
                        <span><b>£1,200 </b></span>
                        <span>credit limit</span>
                    </li>
                </ul>
            </div>
            <br></br>
            <div className="row"><b>Representative Example:</b>
            <span>Representative 34.90% APR variable. Based on assumed borrowing of £1,000. Rate of interest 34.94% (variable) annual. Credit limit is subject to status.</span>
            </div>
            <div className="row">
                <div className="col span-1-of-3">
                    <label>&nbsp;</label>
                </div>
                <div className="col span-3-of-3 btnCenter">
                    <input type="submit" value="Back to Form Page" onClick={props.switchToFormPage}></input>
                </div>
            </div>
        </div>
    }

    if (props.renderUiPage === 'Home') {
        uiRender = <Redirect to="/" />
    }

    return (
        uiRender
    );

}

const mapStateToProps = (state) => {
    return {
        renderUiPage: state.pageTag.uiPage,
        reduxCurrentApr : state.pageTag.currentApr
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchToFormPage: () => dispatch({ type: 'SWITCH_TO_FORM_PAGE' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(VanquisPage);
