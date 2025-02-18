// const mongoose = require('mongoose')
// const User = mongoose.Schema({
//     fullname : {
//         type : String,
//         require : true
//     },
//     email : {
//         type : String,
//         require : true,
//         unique : true
//     },
//     username : {
//         type : String,
//         require : true,
//         unique : true
//     },
//     password : {
//         type : String,
//         require : true,
//         unique : true
//     }
// })

// const user = mongoose.model('users', User)
// module.exports = user
const mongoose = require('mongoose')
const User=mongoose.Schema({
    FirstName : {
        type : String,
        required : true
    },
    LastName : {
        type : String
    },
    Email : {
        type : String,
        required : true,
        unique : true
    },
    UserName : {
        type :String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    }
})
const user = mongoose.model('users',User)
module.exports = user