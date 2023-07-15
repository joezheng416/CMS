const {Schema,model} = require("mongoose");

module.exports = model(
    "Course",
    new Schema(
        {
            _id:{ type: String, uppercase: true, alias: "code"},
            name: {type: String, required: true},
            description: {type: String, default: "this is a description"},
            students:[{
                type: Schema.Types.ObjectId,
                ref: "Student",
            }]
        }
    )
)