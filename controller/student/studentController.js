const {student, students, updateStudent} = require("../../data/students")

exports.studentOne = async (req, res) => {
    try{
        const id = req.params.id
        const Onestudent = await student(id);
        res.json({ data:Onestudent })
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

exports.studentAll = async (req, res) => {
    try{
        const studentAll = await students();
        res.status(200).json({
            success: true,
            data: studentAll
        })
    }
    catch(error){
        res.status(400).send(error.message);
    }
}

exports.updateStudent = async ( req, res) => {
    try {
        const userId =  req.params.id;
        const studentData = req.body;
        const updated = await updateStudent(userId,studentData);
        res.status(200).json({
            success: true,
            data: updated
        })
    }
    catch(error){
        res.status(400).send(error.message);
    }

}