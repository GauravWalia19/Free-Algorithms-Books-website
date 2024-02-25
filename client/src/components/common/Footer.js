import React from 'react';

const Footer = () => {
    const footerStyle = {
        textAlign: 'center',
        padding: '20px',
        backgroundColor: 'var(--footer)',
        color: 'black',
    };
    function getCurrentYear() {
        return new Date().getFullYear();
    }
    return (
        <div style={footerStyle}>&copy; Gaurav Walia {getCurrentYear()}</div>
    );
};

export default Footer;
