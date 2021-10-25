const {Router} = require('express')
const Order = require('../models/order')
const auth = require('../middleware/auth')

const router = Router()

router.get('/', auth, async (req, res)=>{
    try {
        const orders = await Order.find({
            'user.userId': req.user._id
        }).populate('user.userId')

        res.render('orders', {
            isOrder: true,
            title: 'Заказы',
            orders: orders.map((elem)=>{
                return {
                    ...elem._doc,
                    price: elem.courses.reduce((total, el)=>{
                        return total = total + el.count*el.course.price
                    }, 0)
                }
            })
        })
    } catch (e) {
        console.log(e)
    }
    
})

router.post('/', auth, async (req, res)=>{
    try {
    const user = await req.user
        .populate('cart.items.courseId')
    
    console.log(user)

    const courses = user.cart.items.map((elem)=>({
        count: elem.count,
        course: {...elem.courseId._doc}
    }))

    

    const order = new Order({
        user:{
            name:req.user.name,
            userId: req.user
        },
        courses: courses
    })

    await order.save()
    await req.user.clearCart()

    res.redirect('/orders')

    } catch (e) {
        console.log(e)
    }
    
})

module.exports = router