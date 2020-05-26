
var validateUser = function(currentUser, databaseUser) {

    var error = []

    if (!currentUser.name || typeof currentUser.name == undefined || currentUser.name == null) {
        error.push({ text: 'Invalid name' })
    }

    if (!currentUser.email || typeof currentUser.email == undefined || currentUser.email == null) {
        error.push({ text: 'Invalid email' })
    }

    if (!currentUser.password || typeof currentUser.password == undefined || currentUser.password == null) {
        error.push({ text: 'Invalid password' })
    }

    if (currentUser.password.length < 7) {
        error.push({ text: 'This password is very small' })
    }

    if (currentUser.password != currentUser.password2) {
        error.push({ text: 'The passwords are different, try again!' })
    }

    if (currentUser.email == databaseUser) {
        error.push({text:'There is an account with this email address!' })
    }
    
    return error
}

module.exports = validateUser