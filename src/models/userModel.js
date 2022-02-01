const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true          // ห้ามซ้ำกับคนอื่น
    },
}, {
    timestamps: true,
});
// นำไปแปลงในProjectได้เลย 
//                การเข้ารหัส ==>ยำจนไม่รู้ว่าเป็นข้อมูลอะไร
userSchema.methods.hashPassword = async (password) => {
    return await bcrypt.hashSync(password, 10);
}                               //             ตรวจสอบว่ารหัสตรงไหม โดยเช็คค่ารหัส
userSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
    return await bcrypt.compare(inputtedPassword, hashedPassword)
}       //สร้าง Token                Dataที่ต้องการเข้ารหัส,ตัวไขรหัส,อายุการใช้งานเวลาที่จะหมดอายุ
userSchema.methods.generateJwtToken = async (payload, secret, expires) => {
    return jwt.sign(payload, secret, expires)
    // ส่งข้อมูล jsonwebtoken
}
module.exports = mongoose.model("User", userSchema);
userSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});