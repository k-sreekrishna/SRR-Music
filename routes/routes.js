const express = require('express');

const {
    userRegisterPage,
    uploadAlbum,
    getHomePage,
    userLoginPage,
    userLogin,
    getUpload,
    getAlbumList,
    getSearchedAlbums,
    getAlbum,
    userRegister,
    tobeapproved,
    approveUser,
    getAdminPage,
    promote,
    promoteUser
} = require('../controllers/controller.js');

const routes = express.Router();

const { authMiddleware, authAdmin, authMod } = require('../middlewares/auth/authMiddleware');

const multerUpload = require("../utils/multerUpload");
const albumUploadToCDN = require("../utils/albumUploadToCDN");

routes.get("/", getHomePage);

routes.get("/register", userRegisterPage);
routes.post('/register', userRegister);

routes.get('/login', userLoginPage);
routes.post('/login', userLogin);

routes.get('/upload', authMiddleware, authMod, getUpload);
routes.post("/upload", authMiddleware, authMod, multerUpload, albumUploadToCDN, uploadAlbum);

routes.get('/albumList', getAlbumList);
routes.post('/search', authMiddleware, getSearchedAlbums);

routes.get("/album/:id", getAlbum);

routes.get('/admin', authMiddleware, authMod, getAdminPage);

routes.get('/approve', authMiddleware, authAdmin, tobeapproved);
routes.post('/approve/:id', authMiddleware, authAdmin, approveUser);

routes.get('/promote', authMiddleware, authAdmin, promote);
routes.post('/promote/:id', authMiddleware, authAdmin, promoteUser);


module.exports = routes;