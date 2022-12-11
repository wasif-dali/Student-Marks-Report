const usermodel = require('../model/usermodel')
const mongoose = require('mongoose')
const Objectid = mongoose.Types.ObjectId.isValid
const jwt = require('jsonwebtoken')


const authentication = async function (req, res, next) {
    try {
        let token = req.headers["authorization"]
        if (!token) { return res.status(400).send({ status: false, message: "please enter token" }) }
        let decodetoken;
        try {
            decodetoken = jwt.verify(token.split(" ")[1], "secretkey")
        } catch (err) {
            return res.status(401).send({ status: false, message: err.message })
        }
        req.token = decodetoken
        next()

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

const authorization = async function (req, res, next) {

    try {
        let userid = req.params.userid
        if (!Objectid(userid)) {
            return res.status(400).send({ status: false, message: " PLEASE ENTER CORRECT mongoose USER ID" })
        }

        const findUseridInDb = await usermodel.findById(userid)
        if (!findUseridInDb) {
            return res.status(404).send({ status: false, message: `there is no data with this  ${userid}  id in database` })
        }

        if (req.token.id != userid) return res.status(403).send({ status: false, message: "authorization failed,userid and token are not of the same user" })
        next()

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}


module.exports = { authentication,authorization }