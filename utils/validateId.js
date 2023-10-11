const mongoose = require('mongoose');

const validateMongoDbId = (id) => {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) {
        throw new Error("User Id not found");
    }
};

module.exports = validateMongoDbId;