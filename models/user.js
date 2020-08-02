const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

// Create a schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function(next) {
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Generate a password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.password, salt);
        // Re-assign the original password
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isPasswordValid = async function(password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch(error) {
        throw new Error(error);
    }
}

// Create a model
const User = mongoose.model('user', userSchema)

// Export the model
module.exports = User;