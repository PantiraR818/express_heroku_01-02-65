const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    console.log(token);
    //                                 Signature
    const decoded = jwt.verify(token, "secret"); //ถอดรหัส
    req.userData = decoded;
    // console.log(req.userData);
    next();
  } catch (err) {
    //   เกี่ยวกับ user ขึ้นต้นด้วย4
    return res.status(401).json({
      message: "Authentification Failed"
    });
  }
};