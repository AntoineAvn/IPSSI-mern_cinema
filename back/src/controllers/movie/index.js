
const movieModel = require("../../models/movie");
/**
 * @description get all movies
 * @param req
 * @param res
 * @return {*}
 */

exports.getAll = async (req, res) => {
    try {
        const movies = await movieModel.find().exec()
        return !movies
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN RETRIEVE ALL MOVIES '})
            :
            res.status(200).json({statusCode: 200, message: movies})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

exports.create = async (req, res) => {
    try {
        const { name, description, category, watched, pictureUrl, creatorId } = req.body
        const movie = await movieModel.create({
            name,
            description,
            category,
            watched,
            pictureUrl,
            creatorId
        })
        return !movie
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR IN CREATE NEW MOVIE '})
            :
            res.status(200).json({statusCode: 201, message: movie})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

exports.getById = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await movieModel.findById(id).exec()
        return !movie
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR in getby id '})
            :
            res.status(200).json({statusCode: 201, message: movie})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, category, watched, pictureUrl, creatorId } = req.body
        const movie = await movieModel.findByIdAndUpdate(id, {
            name,
            description,
            category,
            watched,
            pictureUrl,
            creatorId
        }).exec()
        return !movie
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR in update '})
            :
            res.status(200).json({statusCode: 200, message: movie})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params
        const movie = await movieModel.findByIdAndDelete(id).exec()
        return !movie
            ?
            res.status(400).json({statusCode: 400, message: 'ERROR in delete '})
            :
            res.status(200).json({statusCode: 200, message: movie})
    } catch (e) {
        console.log(e)
        return res.status(400).json({statusCode: 400, message: e.message})
    }
}

