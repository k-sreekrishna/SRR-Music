const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// user schemaType
const userSchema = new mongoose.Schema(
    {
        name: {
            required: [true, "Name is required"],
            type: String,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        userType: {
            type: String,
            enum: ['MEMBER', 'MOD', 'ADMIN'],
            required: [true, "userType is required"],
            default: 'MEMBER'
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
        timestamps: true,
    }
);

// hash password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.isPasswordMatched = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}


const User = mongoose.model("User", userSchema);

module.exports = User;