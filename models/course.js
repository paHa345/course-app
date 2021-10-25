const {Schema, model} = require('mongoose')

const course = new Schema({
    title: {
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    img:{
        type: String
    },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

//метод, который изменяет данные полученные из базы данных при отправке серверу
//отключен, потому что делаю без него

// course.method('toClient', function(){
//     const course = this.toObject()

//     course.id = course._id
//     delete course._id
// })

module.exports = model('Course', course)














































// const { v4: uuidv4 } = require('uuid');
// const fs = require('fs')
// const path = require('path')

// class Course{
//     constructor(title, price, img){
//         this.title = title
//         this.price = price
//         this.img = img
//         this.id = uuidv4()

//     }

//     toJson(){
//         return ({
//             title:this.title,
//             price:this.price,
//             img:this.img,
//             id:this.id
//         })
//     }

//     static async update(course){
//         const courses = await Course.getAll()

//         const index = courses.findIndex((c)=>{
//             return c.id === course.id
//         })

//         courses[index] = course
//         return new Promise((resolve, reject)=>{
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'courses.json'),
//                 JSON.stringify(courses),
//                 (err)=>{
//                     if(err){
//                         reject(err)
//                     }else{
//                         resolve()
//                     }
//                 }
//                 )
//         })


//     }

//     async save(){
//         const courses = await Course.getAll()
//         courses.push(this.toJson())
//         return new Promise((resolve, reject)=>{
//             fs.writeFile(
//                 path.join(__dirname, '..', 'data', 'courses.json'),
//                 JSON.stringify(courses),
//                 (err)=>{
//                     if(err){
//                         reject(err)
//                     }else{
//                         resolve()
//                     }
//                 }
//                 )

//         })

//     }
//     static getAll(){
//         return new Promise((resolve, reject)=>{
//             fs.readFile(path.join(__dirname, '..', 'data', 'courses.json'),
//             'utf-8',
//             (err, content)=>{
//                 if(err){
//                     reject(err)
//                 }else{
//                     resolve(JSON.parse(content))
//                 }

//             }
//         )
//         })


//     }

//     static async getById(id){
//         const courses = await Course.getAll()
//         return courses.find((c)=>{
//             return c.id === id
//         })

//     }
// }


// module.exports = Course