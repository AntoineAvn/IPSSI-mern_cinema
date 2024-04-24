const expressRouter = require('express').Router(),
    userController = require('../../controllers/user'),
    JWTGuard = require('../../config/passport')

module.exports = (app) => {
    expressRouter.get('/users', userController.getAll)
    expressRouter.get('/user/:id', JWTGuard.checkIsAuth, userController.getById)
    expressRouter.patch('/user/:id', JWTGuard.checkIsAuth, userController.update)
    expressRouter.delete('/user/:id', JWTGuard.checkIsAuth, userController.delete)
    app.use('/api/v1', expressRouter)
}