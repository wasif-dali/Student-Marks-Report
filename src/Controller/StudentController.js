const StudentModel = require("../Models/StudentModel")
const UserModel = require("../Models/UserModel")

const mongoose = require('mongoose')
const Objectid = mongoose.Types.ObjectId.isValid


let reg = /^[a-zA-Z_ ]{2,50}$/
let num = /^[0-9]{1,3}$/
const createstudent = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, message: "please provide data to create student" })

        data.userid = req.params.userid

        let { name, marks, subject } = data

        if (!name) return res.status(400).send({ status: false, message: "please enter name of student" })
        if (!reg.test(name)) return res.status(400).send({ status: false, message: "please enter only alphabets in name" })

        if (!subject) return res.status(400).send({ status: false, message: "please enter subject of student" })
        if (!reg.test(subject)) return res.status(400).send({ status: false, message: "please enter only alphabets in subject" })

        if (!marks) return res.status(400).send({ status: false, message: "please enter marks of student" })
        if (!num.test(marks)) return res.status(400).send({ status: false, message: "please enter only alphabets in marks" })

        let getdata = await studentmodel.findOne({ name, subject })
        console.log(getdata);
        if (getdata) {
            console.log("inside if");
            let savedata = await studentmodel.findOneAndUpdate(
                { name, subject },
                { $set: { marks: marks + getdata.marks } },
                { new: true }
            )
            return res.status(201).send({ status: true, data: savedata })

        }
        let savedata = await studentmodel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const getstudent = async function (req, res) {
    try {
        if (!Objectid(req.params.userid)) { return res.status(400).send({ status: false, message: "please enter valid userid" }) }
        let getdata = await studentmodel.find({ userid: req.params.userid, isdeleted: false })
        if (getdata.length == 0) { return res.status(4).send({ status: false, message: "no data found with this userid" }) }
        return res.status(201).send({ status: true, data: getdata })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const findstudent = async function (req, res) {
    try {
        let name = req.query.name
        let subject = req.query.subject

        let filter = { isdeleted: false }

        if (typeof (name) != "undefined") {
            if (!name) return res.status(400).send({ status: false, message: "please enter name of student" })
            if (!reg.test(name)) return res.status(400).send({ status: false, message: "please enter only alphabets in name" })
            filter["name"] = { "$regex": name }
        }

        if (typeof (subject) != "undefined") {
            if (!subject) return res.status(400).send({ status: false, message: "please enter subject of student" })
            if (!reg.test(subject)) return res.status(400).send({ status: false, message: "please enter only alphabets in subject" })

            filter["subject"] = { "$regex": subject }
        }

        let data = await studentmodel.find(filter)
        if (data.length == 0) return res.status(404).send({ status: false, message: "no data found" })
        return res.status(200).send({ status: true, data: data })


    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const updatestudent = async function (req, res) {
    try {

        let { name, subject, marks } = req.body
        let filter = {}

        if (typeof (name) != "undefined") {
            if (!name) return res.status(400).send({ status: false, message: "please enter name of student" })
            if (!reg.test(name)) return res.status(400).send({ status: false, message: "please enter only alphabets in name" })
             filter["name"] = name 
        }

        if (typeof (subject) != "undefined") {
            if (!subject) return res.status(400).send({ status: false, message: "please enter subject of student" })
            if (!reg.test(subject)) return res.status(400).send({ status: false, message: "please enter only alphabets in subject" })

            filter["subject"] = subject 
        }
        if (typeof (marks) != "undefined") {
            if (!marks) return res.status(400).send({ status: false, message: "please enter subject of student" })
            if (!num.test(marks)) return res.status(400).send({ status: false, message: "please enter only alphabets in subject" })

            filter["marks"] = marks
        }

        let savedata = await studentmodel.findOneAndUpdate(
            { _id: req.params.studentid ,isdeleted:false},
            { $set: filter },
            { new: true }
        )
        return res.status(200).send({ status: true, message: "data has been updated", data: savedata })
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}
const deletestudent = async function (req, res) {
    try {
        if(!Objectid(req.params.studentid)){return res.status(400).send({status:false,message:"please enter correct student id"})
        }

        let savedata = await studentmodel.findOneAndUpdate(
            { _id: req.params.studentid ,isdeleted:false},
            { $set: { isdeleted: true, deletedAt: Date.now() } },
            { new: true }
        )
        if(!savedata) return res.status(404).send({ status: true, message: "no data found" })
        return res.status(200).send({ status: true, message: "data has been deleted", data: savedata })

    } catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createstudent, getstudent, findstudent, updatestudent, deletestudent }