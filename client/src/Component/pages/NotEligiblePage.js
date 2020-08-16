import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

// To render the not available page with details

const NotEligiblePage = props => {

    let uiRender;

    if (props.renderUiPage === 'NotEligible') {
        uiRender = <div>
            <div className="row">
                <h2>Sorry,You are not eligible</h2>
            </div>
            <br></br>
            <div className="row">You need to be at least 18 years old to apply for a credit card, but some cards have a higher minimum age. </div>
            <br></br>
            <div className="row">
                <div className="col span-1-of-3">
                    <label>&nbsp;</label>
                </div>
                <div className="col span-2-of-3">
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
    }
}

const mapDispatchToProps = dispatch => {
    return {
        switchToFormPage: () => dispatch({ type: 'SWITCH_TO_FORM_PAGE' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotEligiblePage);