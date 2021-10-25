const {Schema, model} = require('mongoose')

const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    avatarURL: String,
    resetToken: String,
    resetTokenExp: Date,
    cart:{
        items:[
            {
                count:{
                    type: Number,
                    required: true,
                    default: 1
                },
                courseId:{
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true
                }
            }
        ]
    }

})


userSchema.methods.addToCart = function(course){
    const items = [...this.cart.items]
    const index = items.findIndex((elem)=>{
        return elem.courseId.toString() === course._id.toString()
    })

    if (index>=0) {
        items[index].count = items[index].count + 1
    } else {
        items.push({
            courseId: course._id,
            count: 1
        })
    }

    // const newCart = {items: clonedItems}
    // this.cart = newCart


    this.cart = {items}
    return this.save()
}

userSchema.methods.removeFromCart = function(id){
    let items = [...this.cart.items]
    let newItems = []
    // console.log(`ID: ${id}`)
    const index = items.findIndex((elem)=>{
        return elem.courseId.toString() === id.toString()
    })
    console.log(index)
    console.log(items[index].count)

    if (items[index].count === 1) {

        newItems = items.filter((elem)=>elem.courseId.toString() !== id.toString())
        items = [...newItems]
    } else {
        items[index].count--
    }

    console.log(`Items ${newItems}`)

    this.cart = {items}
    return this.save()

}

userSchema.methods.clearCart = function(){
    this.cart = {items:[]}
    return this.save()
}


module.exports = model('User', userSchema)