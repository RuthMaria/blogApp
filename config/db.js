if (process.env.NODE_ENV == "production") {
    module.exports = {mongoURI: "mongodb+srv://root:rootadmin@cluster0-ehmnn.mongodb.net/test?retryWrites=true&w=majority"}
} else {
    module.exports = {mongoURI: "mongodb://localhost/blogapp"}
}