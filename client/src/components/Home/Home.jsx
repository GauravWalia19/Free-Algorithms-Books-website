import React from 'react';
import Header from '../common/Header';
import './Home.css';
import SecondPage from '../pages/SecondPage';
import ThirdPage from '../pages/ThirdPage';

const Home = () => {
    return (
        <React.Fragment>
            <div className="firstPage">
                <Header />
                <div className="section">
                    <div className="sectionQuote">
                        <h1>
                            “Algorithms are not arbiters of objective truth and
                            fairness simply because they're math.”
                        </h1>
                        <p>- Zoe Quinn</p>
                    </div>
                    <img
                        src="./images/steve.png"
                        alt="steve jobs"
                        className="steveImage"
                    />
                </div>
            </div>
            <SecondPage />
            <ThirdPage />
        </React.Fragment>
    );
};

export default Home;
