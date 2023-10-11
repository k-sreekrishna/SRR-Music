const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;
    try {
        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_KEY);
            const user = decoded?.user;
            if (!user) throw new Error("No user found");
            req.user = user;
            next();
        }
        else {
            res.redirect('/login');
        }
    }
    catch
    {
        res.clearCookie('token');
        res.redirect('/login')
    }
};

const authAdmin = (req, res, next) => {
    if (req?.user?.userType === 'ADMIN') {
        next();
    }
    else {
        res.redirect('/login')
    }

}

const authMod = (req, res, next) => {
    if (req?.user?.userType === 'MOD' || req?.user?.userType === 'ADMIN') {
        next();
    }
    else {
        res.redirect('/login')
    }
}

module.exports = { authMiddleware, authAdmin, authMod };
