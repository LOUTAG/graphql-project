const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"]
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Email is required"]
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        status: {
            type: String,
            default: 'member'
        },
        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post',
            }
        ]
    },
    {
        timestamps: true
    }
);
//hash password
userSchema.pre('save', async function(next){
    if(!this.isModified("password")) next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    console.log("password has been hashed");
    next();
})

//verify password method
userSchema.methods.isPasswordMatched = async function(passwordRequest){
    return await bcrypt.compare(passwordRequest, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;