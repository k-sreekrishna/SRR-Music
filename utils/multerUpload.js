const multer = require("multer")

const multerMultipleFileUpload = (req, res, next) => {
    const storage = multer.memoryStorage();
    const uploadFiles = multer({ storage: storage }).any('file');
    uploadFiles(req, res, err => {
        if (err instanceof multer.MulterError) {
            res.render('error.ejs', { message: "err instanceof multer.MulterError" })
        } else if (err) {
            res.render('error.ejs', { message: err.message })
        }
        next();
    })
}

module.exports = multerMultipleFileUpload;