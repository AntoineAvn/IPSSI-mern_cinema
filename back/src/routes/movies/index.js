const expressRouter = require('express').Router(),
    movieController = require('../../controllers/movie'),
    JWTGuard = require('../../config/passport')

module.exports = (app) => {
    expressRouter.get('/movies', movieController.getAll)
    expressRouter.get('/movies/user/:id', JWTGuard.checkIsAuth, movieController.getByUser)
    expressRouter.get('/movie/:id', JWTGuard.checkIsAuth, movieController.getById)
    expressRouter.post('/movie', JWTGuard.checkIsAuth, movieController.create)
    expressRouter.patch('/movie/:id', JWTGuard.checkIsAuth, movieController.update)
    expressRouter.delete('/movie/:id', JWTGuard.checkIsAuth, movieController.delete)
    app.use('/api/v1', expressRouter)
}