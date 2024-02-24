const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {
    getBooksByLanguage,
    getBooksByNameAndLanguage,
    createIssue,
} = require('../../util/util');
const {
    validateLanguageInQuery,
    validateBugReportRequestBody,
    validateNewBookBody,
} = require('../../util/middleware');

const connectMongoose = async () => {
    await mongoose.connect(process.env.MONGODB_URI).catch((err) => {
        console.log('Error on initializing the connection ', err);
    });
};

const handleMongooseConnectionEvents = () => {
    mongoose.connection.on('connected', () => {
        console.log('MongoDB connected successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log('Connection error: ', err);
    });
};

connectMongoose();
handleMongooseConnectionEvents();

/**
 * @endpoint: /api/v1/book
 *
 * @method GET
 * @access public
 * @author Gaurav Walia
 *
 * Query Parameters
 * @param language
 *
 * @return response
 **/
router.get('/book', validateLanguageInQuery, (req, res) => {
    const { language } = req.query;
    return getBooksByLanguage(res, language);
});

/**
 * @endpoint: /api/v1/book/search
 *
 * @method GET
 * @access public
 * @author Gaurav Walia
 *
 * Query Parameters
 * @param language
 * @param name
 *
 * @return response
 **/
router.get('/book/search', validateLanguageInQuery, (req, res) => {
    const { language, name } = req.query;
    if (!name) {
        return getBooksByLanguage(res, language);
    } else {
        return getBooksByNameAndLanguage(res, language, name);
    }
});

/**
 * @endpoint /api/v1/bug/report
 *
 * @method POST
 **/
router.post('/bug/report', validateBugReportRequestBody, async (req, res) => {
    const {
        title,
        description,
        expectedBehaviour,
        device,
        os,
        browser,
        version,
        username,
    } = req.body;

    const issueBody = ''.concat(
        '**Describe the bug**\n',
        description,
        '\n\n**Expected behavior**\n',
        expectedBehaviour,
        '\n\n**Desktop/Smartphone**\n-Device: ',
        device,
        '\n-OS: ',
        os,
        '\n-Browser: ',
        browser,
        '\n-Version: ',
        version,
        '\n\n**Github Username**\n',
        username
    );

    try {
        await createIssue(`Bug Report: ${title}`, issueBody, ['bug']);
        return res.status(200).json({
            message: 'Bug reported successfully',
            status: 200,
        });
    } catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
        });
    }
});

/**
 * @endpoint /api/v1/book
 *
 * @method POST
 * @access public
 * @param title
 * @param bookName
 * @param language
 * @param downloadLink
 * @param username
 *
 * @return response
 **/
router.post('/book', validateNewBookBody, async (req, res) => {
    const { title, bookName, language, downloadLink, username } = req.body;

    let issueBody = ''.concat(
        '**Book Name**\n',
        bookName,
        '\n\n**Programming Language**\n',
        language,
        '\n\n**Book Download Link**\n',
        downloadLink,
        '\n\n**Github Username**\n',
        username
    );

    try {
        await createIssue(`New Book Request: ${title}`, issueBody, [
            'question',
        ]);
        return res.status(200).json({
            message: 'Book add request submitted successfully',
            status: 200,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 500,
        });
    }
});

module.exports = router;
