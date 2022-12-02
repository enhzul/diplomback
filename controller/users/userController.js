var bcrypt = require('bcryptjs');
const {
  usersAll,
  userById,
  userCreate,
  getUserByUserEmail, 
  createRoleUser,
  tokenSave,
  reftokenCheck} = require("../../data/users");
const {student} = require("../../data/students")

const { sign} = require("jsonwebtoken")
const jwt = require("jsonwebtoken")
exports.getUsers = async (req, res) => {
  try {
    const users = await usersAll();
    res.json({users});
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userById(id);
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
exports.createUser = async (req, res)=>{
 try{
  const createdCheck = await getUserByUserEmail(req.body.username);
  if(!createdCheck){
    const userData = req.body; 
    const salt = bcrypt.genSaltSync(10);
    userData.password = bcrypt.hashSync(userData.password, salt);
    const userId = await userCreate(userData);
    if(userId) {
     const role =  await createRoleUser(userId);
    }
    res.status(200).json({
      success: true,
      data: userId,
    });
  }else{
    res.status(200).json({
      success: false,
      data: "мэйл хаяг бүртгэлтэй байна!",
    });
  }
 }
 catch (error){
  res.status(400).send(error.message);
 }
  
};
exports.login = async (req, res) => {
  try{
    const body = req.body;
   const login = await getUserByUserEmail(body.username);
      if (!login) {
        return res.json({
          success: 0,
          data: "invalid password or email"
        });
      }
      if(login) {
      const resualt = await bcrypt.compare(body.password,login.password);
      if(resualt) {
        const roles = login.roleId
        login.password = undefined;
        const accessToken = sign(
          {
            "username":login.userName,
            "roles": roles              
          }, 
          process.env.SECRET,
          {expiresIn: "10s"}
          );

        
        const refreshToken = sign(
          {"username":login.userName}, 
          process.env.SECRET,
          { expiresIn: '1d' }
          );
          const userId = login.id[0]
          const result = await tokenSave(userId, refreshToken)
         res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
         const id = userId;
         const Onestudent = await student(id);
        res.json({ Onestudent,userId, roles, accessToken });
      }
      else{
        return res.json({
          success: 0,
          data: "invalid password or email"
        });
      }
  }
}
  catch (error){
    res.status(400).send(error.message);
  }
};

exports.refToken =  async (req, res) => {
  try{
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    const foundUser = await reftokenCheck(refreshToken);
    if (!foundUser) return res.sendStatus(403); 
   const edcode = jwt.verify(refreshToken,process.env.SECRET,
      (err, decoded)=> {
        if (err || foundUser[0].userName !== decoded.username) return res.sendStatus(403);
        const accessToken = jwt.sign(
          { "username": decoded.username },
          process.env.SECRET,
          { expiresIn: '30s' }
      );
      res.json({ accessToken })
      });
  }
  catch(error){
    res.status(400).send(error.message);
  }
 
}