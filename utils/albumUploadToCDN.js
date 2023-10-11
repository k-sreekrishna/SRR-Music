const ImageKit = require("imagekit")

const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const albumUploadToCDNParallel = (req, res, next) => {
    const promises = []
    for (let i = 0; i < req.files.length; i++) {
        promises.push(
            imagekit.upload({
                file: req.files[i].buffer, //required
                fileName: req.files[i].originalname, //required
                folder: 'MyMusic', // optional
            }))
    }
    Promise.all(promises).then((responses) => {
        const urls = [] 
        responses.forEach((response) => {
            urls.push(response.url);
        })
        req.body.urls = urls;
        next();
    }).catch((err) => {
        res.render('error.ejs', { message: err.message })
    })
}

const albumUploadToCDN = async (req, res, next) => {
    const urls = [];
    for (let i = 0; i < req.files.length; i++) {
        try {
            const response = await imagekit.upload({
                file: req.files[i].buffer,
                fileName: req.files[i].originalname,
                folder: 'testFolder',
            });
            urls.push(response.url);
        } catch (err) {
            return res.render('error.ejs', { message: err.message });
        }
    }
    req.body.urls = urls;
    next();
};
module.exports = albumUploadToCDN;