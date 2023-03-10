const jwt = require("jsonwebtoken");
const AllStudents = require("../models/all-students");
const hscCrtificate = require("../models/hsc-certificate");
async function getStudentProfile(req, res) {
  try {
    const { authorization } = req.headers;
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "superdupersecret");
    const { userEmail, userId, reg } = decoded;
    const stu = await hscCrtificate.findOne({ reg });

    res.json(stu);
  } catch (err) {
    res.json({
      msg: "you are not logged in to view the profile page",
    });
    console.log(err);
  }
}
async function getCerti(req, res) {
  const { authorization } = req.headers;
  const token = authorization.split(" ")[1];

  const decoded = jwt.verify(token, "superdupersecret");
  const { userEmail, userId, reg } = decoded;
  const resp = await hscCrtificate.findOne({ reg });

  res.json({ resp });
}
async function enterNewStudent(req, res, next) {
  try {
    const { enteredRegNo, studentMail } = req.body;
    const studentFound = await AllStudents.findOne({ reg: enteredRegNo });
    if (studentFound) {
      return res.send({
        msg: `This student with registration number ${enteredRegNo} is already registered`,
      });
    }
    const student = new AllStudents({
      reg: enteredRegNo,
      mail: studentMail,
    });
    const rsp = await student.save({ validationBeforeSave: true });
    res.send({
      msg: `Student with a registration number of ${rsp.reg} has been registred!`,
    });
  } catch (err) {
    next(err);
  }
}
async function saveCertificate(req, res) {
  try {
    const {
      name,
      fName,
      mName,
      insName,
      center,
      reg,
      group,
      bangla,
      eng,
      ict,
      phy,
      chem,
      math,
      bio,
    } = req.body;
    // console.log(
    //   name,
    //   fName,
    //   mName,
    //   insName,
    //   center,
    //   reg,
    //   group,
    //   bangla,
    //   eng,
    //   ict,
    //   phy,
    //   chem,
    //   math,
    //   bio
    // );
    const Hsc = new hscCrtificate({
      name: name,
      father: fName,
      mother: mName,
      institution: insName,
      centre: center,
      reg: reg,
      group: group,
      bangla: bangla,
      english: eng,
      ict: ict,
      physics: phy,
      Chemistry: chem,
      higherMath: math,
      biology: bio,
    });
    const rsp = await Hsc.save();
    res.json({
      msg: "student certificate data has been successfully saved on our system",
    });
  } catch (e) {
    next(e);
  }
}

module.exports = {
  enterNewStudent: enterNewStudent,
  saveCertificate: saveCertificate,
  getCerti: getCerti,
  getStudentProfile,
  // getStudentProfile: getStudentProfile
};
