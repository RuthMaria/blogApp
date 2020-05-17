module.exports = {
    itsAdmin: function(request, response,next) {
        if (request.isAuthenticated() && request.user.itsAdmin == 1) {
            return next()
        }

        request.flash('error_msg','You need is logged into an administrator account')
        response.redirect('/')
    }
}