    
var validateCategory = function(category){
    var error = []

    if (!category.name || typeof category.name == undefined || category.name == null) {
        error.push({ text: 'Invalid name' })
    }

    if (!category.slug || typeof category.slug == undefined || category.slug == null) {
        error.push({ text: 'Invalid slug' })
    }

    if (category.name.length < 2) {
        error.push({ text: 'Name of the category is very small' })
    }

    return error
}

module.exports = validateCategory