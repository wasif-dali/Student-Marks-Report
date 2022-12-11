const usermodel = require("../model/usermodel")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt')


let reg = /^[a-zA-Z_ ]{2,50}$/
let pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/

const registration = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide data for registration" })
        let { name, password } = data

        if (!name) return res.status(400).send({ status: false, message: "please enter name for registration" })
        if (!reg.test(name)) return res.status(400).send({ status: false, message: "name can have only alphabets and space" })

        if (!password) return res.status(400).send({ status: false, message: "please enter password for registration" })
        if (!pass.test(password)) return res.status(400).send({ status: false, message: "password must have one capital one small one numericand one special character [#?!@$%^&*-] and length between 8-15" })

        data.password = await bcrypt.hash(password, 10)


        let savedata = await usermodel.create(data)
        return res.status(200).send({ data: savedata })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}
const userlogin = async function (req, res) {
    try {
        let name = req.body.name
        let password = req.body.password

        if (Object.keys(req.body).length == 0) return res.status(400).send({ status: false, message: "please provide name and password for login" })

        if (!name) return res.status(400).send({ status: false, message: "please enter name" })
        if (!reg.test(name)) return res.status(400).send({ status: false, message: "name can have only alphabets and space" })

        if (!password) return res.status(400).send({ status: false, message: "please enter password for login" })
        if (!pass.test(password)) return res.status(400).send({ status: false, message: "password must have one capital one small one numericand one special character [#?!@$%^&*-] and length between 8-15" })

        let data = await usermodel.findOne({name:name})
        if (!data) {
            return res.status(404).send({ status: false, message: "User not found with this name" })
        }
        let checkpassword = await bcrypt.compare(password, data.password);
        if (!checkpassword) return res.status(400).send({ status: false, message: "login failed this password not matches with name" })

        let token = jwt.sign({ id:data._id }, "secretkey")

        return res.status(200).send({ status: true, data: { id:data._id, token: token } })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports = { registration, userlogin }