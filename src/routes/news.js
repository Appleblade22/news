const express = require('express');
const axios = require('axios');
const newsRouter = express.Router();
const bodyParser = require('body-parser');
const env = require('dotenv').config();
bodyParser.urlencoded({ extended: true });
const API = process.env.API_KEY;
newsRouter.get('', async (req, res) => {
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?country=in&from=2022-05-06&sortBy=popularity&apiKey=${API}`);
        res.render('news', {
            "articles": newsAPI.data.articles
        });
    }
    catch (err) {
        if (err.response) {
            res.render('news', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('news', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('news', { articles: null })
            console.error('Error', err.message)
        }
    }
});
newsRouter.post('', async (req, res) => {
    let search = req.body.searchs;
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/everything?q=${search}&language=en&from=2022-05-06&sortBy=popularity&apiKey=${API}`);
        res.render('newsSearch', {
            "articles": newsAPI.data.articles
        });
    }
    catch (err) {
        if (err.response) {
            res.render('newsSearch', { articles: null })
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        } else if (err.requiest) {
            res.render('newsSearch', { articles: null })
            console.log(err.requiest)
        } else {
            res.render('newsSearch', { articles: null })
            console.error('Error', err.message)
        }
    }
});


module.exports = newsRouter;