import React from 'react';
import './ThirdPage.css';
import Footer from '../../common/Footer';
import NewBookForm from '../../NewBookForm';
import BugReportForm from '../../BugReportForm';

const ThirdPage = () => {
    return (
        <React.Fragment>
            <div id="thirdPage">
                <h2>Community</h2>
                <hr />
                <BugReportForm />
                <hr id="mobileLine" />
                <NewBookForm />
            </div>
            <Footer />
        </React.Fragment>
    );
};

export default ThirdPage;
