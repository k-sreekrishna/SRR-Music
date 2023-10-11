const Album = require('../models/Album');
const User = require('../models/User');

const { generateToken } = require("../config/token/generateToken");
const asyncHandler = require('express-async-handler');

const userRegisterPage = asyncHandler((req, res) => {
    try {
        res.status(200).render("register.ejs", { 'title': 'Register' });
    } catch (err) {
        throw new Error(err.message);
    }
});


const userRegister = asyncHandler(async (req, res, next) => {
    const userExists = await User.findOne({ email: req?.body?.email });
    if (userExists) throw new Error('user exists');
    try {
        const newUser = await User.create({
            name: req?.body?.name,
            email: req?.body?.email,
            password: req?.body?.password
        });
        res.status(201).redirect('/login');
    }
    catch (err) {
        throw new Error(err.message);
    }
});

const userLoginPage = (req, res) => {
    try {
        res.status(200).render('login.ejs', { title: 'Login' });
    } catch (err) {
        throw new Error(err.message);
    }
}

const userLogin = asyncHandler(async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req?.body?.email });
        if (user?.isActive === false) {
            throw new Error("Your account has not yet been approved by ADMIN, Please Wait");
        }
        else if (user && await user.isPasswordMatched(req?.body?.password)) {
            const token = generateToken(user);
            res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });
            res.status(200).redirect('/');
        }
        else {
            res.status(403).redirect('/login');
        }
    } catch (err) {
        throw new Error(err.message);
    }
});

const uploadAlbum = asyncHandler(async (req, res, next) => {
    const album = new Album({
        title: req.body.title,
        urls: req.body.urls,
        difficulty: req.body.difficulty,
        uploader: req.user.name || 'Ramani',
        chapters: req.body.urls.length
    });
    try {
        await album.save();
        res.status(201).redirect("/");
    } catch (error) {
        throw new Error(error.message);
    }
});

const getUploadForm = (req, res) => {
    res.status(200).render("upload.ejs");
}


const approveUser = asyncHandler((req, res, next) => {
    const id = req.params.id;
    User.findByIdAndUpdate(id, { isActive: true }).then(result => {
        res.status(200);
        res.json({ 'msg': 'updated successfully' });
    }).catch(err => {
        res.status(500);
        res.json({ 'msg': 'something went wrong' });
    })
})

const tobeapproved = asyncHandler((req, res) => {
    User.find({ isActive: false }).then(result => {
        res.status(200).render("ToBeApprovedList.ejs", { buttonName: "Approve", title: "To be approved", user: result });
    }).catch(err => {
        res.status(500);
        throw new Error(err.message);
    })
});


const promote = asyncHandler((req, res) => {
    User.find({ userType: "MEMBER" }).then(result => {
        res.status(200).render("ToBeApprovedList.ejs", { buttonName: "Promote", title: "To be promoted", user: result });
    }).catch(err => {
        res.status(500);
        throw new Error(err.message);
    })
});

const promoteUser = asyncHandler((req, res, next) => {
    const id = req.params.id;
    
    User.findByIdAndUpdate(id, { userType: "MOD" }).then(result => {
        console.log(result)
        res.status(200);
        res.json({ 'msg': 'updated successfully' });
    }).catch(err => {
        res.status(500);
        res.json({ 'msg': 'something went wrong' });
    })
})

const getAlbumList = (req, res) => {
    let page = req.query.page || 1;
    Album.paginate({}, { page: page, limit: 15 }).then(result => {
        res.status(200).render("AlbumList.ejs", { title: "Albums", albumList: result.docs, totalPages: result.pages, currentPage: result.page, ispagination: true });
    }).catch(err => {
        throw new Error(err.message);
    })
}

const getSearchedAlbums = (req, res) => {
    let query = { title: new RegExp(req.body.title, 'i') };
    Album.find(query).then(result => {
        res.status(200).render("AlbumList.ejs", { title: "Albums", albumList: result, ispagination: false });
    }).catch(err => {
        throw new Error(err.message);
    });
}

const getAlbum = (req, res) => {
    const id = req.params.id;
    Album.findById(id).then(result => {
        res.status(200).render("Album.ejs", { Album: result });
    }).catch(err => {
        throw new Error(err.message);
    })
}

const getUpload = (req, res) => {
    res.status(200).render('uploadForm.ejs', { titlt: "Upload" });
}

const getHomePage = (req, res) => {
    res.status(200).render('home.ejs', { title: "Home" });
}

const getAdminPage = (req, res) => {
    res.status(200).render('Admin.ejs', { title: "Admin" })
}




module.exports =
{
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
    promoteUser,
};