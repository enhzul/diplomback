const {lists, countlists,studentList} = require("../../data/school/index")

exports.mergejilList = async (req, res) => {
    try{
        const mergejilAll = await lists();
        res.json({ head:mergejilAll })
    }
    catch(error){
        res.status(400).send(error.message);
    }

}

exports.mergejilCount = async ( req, res )=> {
    try{
        const CountToo = await countlists();
        res.json({ Count:CountToo })
    }
    catch(err){
        res.status(400).send(error.message);
    }
}

exports.ListStudent = async ( req, res )=> {
    try{
        const list = await studentList();
        res.json({ list })
    }catch(err){
        res.status(400).send(error.message);
    }
}