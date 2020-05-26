// Checks if the user is an administrator

module.exports = {
    itsAdmin: function(req, res, next) {
        if (req.isAuthenticated() && req.user.itsAdmin == 1) {
            return next()
        }

        req.flash('error_msg','You need is logged into an administrator account')
        res.redirect('/')
    }
}