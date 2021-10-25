if(process.env.NODE_ENV === 'production'){
    module.exports = require('./keys.prod')
}else{
    module.exports = require('./keys.dev')
}


// module.exports = {
//     MONGODB_URI :'mongodb+srv://paHa:dfger2244@cluster0.w0ukw.mongodb.net/shop',
//     SESSION_SECRET: 'secret value',
//     SENDGRID_API_KET: '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',
//     EMAIL_FROM: 'nodejs@example.com',
//     BASE_URL: 'http://localhost:3000'
// }