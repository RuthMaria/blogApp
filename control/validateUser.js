
var validateUser = function(user) {

    var error = []

    if (!user.name || typeof user.name == undefined || user.name == null) {
        error.push({ text: 'Invalid name' })
    }

    if (!user.email || typeof user.email == undefined || user.email == null) {
        error.push({ text: 'Invalid email' })
    }

    if (!user.password || typeof user.password == undefined || user.password == null) {
        error.push({ text: 'Invalid password' })
    }

    if (user.password.length < 4) {
        error.push({ text: 'This password is very small' })
    }

    if (user.password != user.password2) {
        error.push({ text: 'The passwords are different, try again!' })
    }
    
    return error
}

module.exports = validateUser