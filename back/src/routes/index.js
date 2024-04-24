module.exports = (app) => {
    require('./users')(app)
    require('./movies')(app)
    require('./auth')(app)
}