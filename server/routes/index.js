const router = require('express').Router();
const userController = require('../controllers/user');
const authController = require('../controllers/authentication');

router.get('/profile', userController.getProfile);
router.get('/movie', userController.getMovies);
router.post('/movie', userController.addMovie);
router.delete('/movie', userController.deleteMovie);

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
