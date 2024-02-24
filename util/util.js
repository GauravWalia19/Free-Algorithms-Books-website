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

async function getBooksByLanguage(res, language) {
    const result = await Book.find({ language: language }).catch((err) => {
        console.log(err);
        return res.status(404).json({
            message: 'Requested information not found',
            status: 404,
        });
    });
    return res.status(200).json(result);
}

async function getBooksByNameAndLanguage(res, language, name) {
    let expression = new RegExp(name, 'i');
    const result = await Book.find({
        language: language,
        name: expression,
    }).catch((err) => {
        console.log(err);
        return res.status(404).json({
            message: 'Requested information not found',
            status: 404,
        });
    });
    return res.status(200).json(result);
}

async function createIssue(title, issueBody, labels) {
    return await octokit.issues.create({
        owner: process.env.OWNER,
        repo: process.env.REPO,
        title,
        body: issueBody,
        labels,
    });
}

module.exports = {
    getBooksByLanguage,
    getBooksByNameAndLanguage,
    octokit,
    createIssue,
};
