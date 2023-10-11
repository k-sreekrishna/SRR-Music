const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const AlbumSchema = new mongoose.Schema(
    {
        title: {
            required: [true, "title is required"],
            type: String,
            maxlength: [50, "Title cannot be more than 100 characters"],
        },
        uploader: {
            require: [true, "uploader name is required"],
            type: String,
        },
        difficulty: {
            type: String,
        },
        chapters: {
            require: [true, "Number of chapters is required"],
            type: Number
        },
        urls: {
            type: [String],
            required: [true, "Urls are required"],
        },
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

AlbumSchema.plugin(mongoosePaginate);

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
