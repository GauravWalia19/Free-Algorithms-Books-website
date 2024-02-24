const { octokit } = require('./util');

function validateLanguageInQuery(req, res, next) {
    const { language } = req.query;
    if (!language) {
        return res.status(400).json({
            message: 'Bad Request because of no language parameter',
            status: 400,
        });
    }
    next();
}

function validateBugReportRequestBody(req, res, next) {
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

    if (
        !title ||
        !description ||
        !expectedBehaviour ||
        !device ||
        !os ||
        !browser ||
        !version ||
        !username
    ) {
        return res.status(400).json({
            message: 'Bad Request because of missing parameter',
            status: 400,
        });
    }
    next();
}

function validateNewBookBody(req, res, next) {
    const { title, bookName, language, downloadLink, username } = req.body;

    if (!title || !bookName || !language || !downloadLink || !username) {
        return res.status(400).json({
            message: 'Bad Request because of missing parameters',
            status: 400,
        });
    }

    next();
}

async function validateUserForBugReport(req, res, next) {
    const { username } = req.body;
    try {
        await octokit.users.getByUsername({
            username,
        });
    } catch (err) {
        return res.status(401).json({
            message: 'Unauthorized - invalid user',
            status: 401,
        });
    }
    next();
}

module.exports = {
    validateLanguageInQuery,
    validateBugReportRequestBody,
    validateNewBookBody,
};
