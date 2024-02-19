const Book = require('../models/Book');
const { Octokit } = require('@octokit/rest');

// for hitting github apis
const octokit = new Octokit({
    auth: process.env.ACCESS_TOKEN,
    userAgent: 'FreeAlgorithmBooks v1.0.0',
    request: {
        agent: undefined,
        fetch: undefined,
        timeout: 0,
    },
});

async function validateAndGetBookData(req, res) {
    const { language } = req.query;
    if (!language) {
        return res.status(400).json({
            message: 'Bad Request because of no language parameter',
            status: 400,
        });
    }
    const result = await Book.find({ language: language }).catch((err) => {
        console.log(err);
        return res.status(404).json({
            message: 'Requested information not found',
            status: 404,
        });
    });
    return res.status(200).json(result);
}

function createIssue(title, issueBody, labels, res) {
    octokit.issues
        .create({
            owner: process.env.OWNER,
            repo: process.env.REPO,
            title,
            body: issueBody,
            labels,
        })
        .then((_res) => {
            return res.json({
                message: 'Issue created Successfully',
                status: 200,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(400).json({ message: 'Bad Request' });
        });
}

module.exports = {
    validateAndGetBookData,
    octokit,
    createIssue,
};
