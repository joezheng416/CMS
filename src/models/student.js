const {Schema,model} = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
    firstName: {
        type: String,
        minLength: 2,
        require: true,
    },
    lastName: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        validate: [
            {
                validator: (email)=>{
                    return !Joi.string().email().validate(email).error;
                },
                msg: "Invalid email format"
            }
        ],
    },
    age: {
        type: String,
        default : 10,
    },
    courses: [
        {
            type: String,
            ref: "Course",
        }
    ],
}
)

const StudentModel = model("Student", schema);

module.exports = StudentModel;