const router = require('express').Router();

const api = require('./api-info');
const tmdb = require('./tmdb-helper');
const request = require('request-promise');

const options = {
  method: 'GET',
  json: true,
  qs: {
    api_key: api.key,
    language: 'en-US',
  },
};

function getData(res, opts) {
  request(opts)
  .then((data) => {
    data = tmdb.extractData(data);
    res.json(data);
  })
  .catch((err) => {
    err = tmdb.handleError(err);
    res.status(400).send(err);
  });
}

// Upcoming Movies
router.get('/upcoming/:page?', (req, res, next) => {
  options.uri = `${api.url}/movie/upcoming`;
  options.qs.page = req.params.page || 1;

  getData(res, options);
});

// Top Rated Movies
router.get('/top_rated/:page?', (req, res, next) => {
  options.uri = `${api.url}/movie/top_rated`;
  options.qs.page = req.params.page || 1;

  getData(res, options);
});

// Now Playing
router.get('/now_playing/:page?', (req, res, next) => {
  options.uri = `${api.url}/movie/now_playing`;
  options.qs.page = req.params.page || 1;

  getData(res, options);
});

// Popular Movies
router.get('/popular/:page?', (req, res, next) => {
  options.uri = `${api.url}/movie/popular`;
  options.qs.page = req.params.page || 1;

  getData(res, options);
});

module.exports = router;