'use strict';

module.exports = function(app) {

    const { sequelize, user, rating, meal } = require('../models')
    let middleware = require('../middleware');


    // POST a new user
app.post('/users', middleware.checkToken, async(req, res) => {
    const { username, password, email } = req.body

    try {
        const User = await user.create({ username, password, email })

        return res.json(User)
    } catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

// GET all users in database
app.get('/users', middleware.checkToken, async (req, res) => {
    try {

        const Users = await user.findAll({ include: [rating]})


        return res.json(Users)
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})

// GET a specific user by UUID
app.get('/users/:uuid', middleware.checkToken, async (req, res) => {
    const userUuid = req.params.uuid
    try {
        const User = await user.findOne({
            where: {userUuid: userUuid},
            include: [rating]
        })

        return res.json(User)
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})

// DELETE a specific user by UUID
app.delete('/users/:uuid', middleware.checkToken, async (req, res) => {
    const userUuid = req.params.uuid
    try {
        const User = await user.findOne({
            where: {userUuid: userUuid},
        })

        await User.destroy()

        return res.json({message: 'User deleted'})
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong. User not deleted.'})
    }
})

// UPDATE a specific user by UUID
app.put('/users/:uuid', middleware.checkToken, async (req, res) => {
    const userUuid = req.params.uuid
    const { username, password, email } = req.body

    try {
        const User = await user.findOne({
            where: {userUuid: userUuid},
        })

        User.username = username
        User.password = password
        User.email = email

        await User.save()

        return res.json({User})
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong. User not updated.'})
    }
})

// POST a new rating
app.post('/ratings', middleware.checkToken, async(req, res) => {
    const { userUuid, mealUuid, ratingScore } = req.body

    try {
        const User = await user.findOne({where: { userUuid: userUuid}})
        const Meal = await meal.findOne({where: { mealUuid: mealUuid}})

        const Rating = await rating.create({ ratingScore: ratingScore, userId: User.id, mealId: Meal.id })

        return res.json(Rating)
    } catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

// GET a new rating
app.get('/ratings', middleware.checkToken, async(req, res) => {
    try {
        const Ratings = await rating.findAll({
           include: [user,meal]
           }) 

        return res.json(Ratings)
    } catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})

// POST a new meal
app.post('/meals', middleware.checkToken, async(req, res) => {
    const { mealName, calories } = req.body

    try {
        const Meal = await meal.create({ mealName, calories })

        return res.json(Meal)
    } catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
})


// GET all meals in database
app.get('/meals', middleware.checkToken, async (req, res) => {
    try {
        const Meals = await meal.findAll({/* include: [rating]*/})

        return res.json(Meals)
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})

// GET a specific meal by UUID
app.get('/meals/:uuid', middleware.checkToken, async (req, res) => {
    const mealUuid = req.params.uuid
    try {
        const Meal = await meal.findOne({
            where: {mealUuid: mealUuid},
            include: [rating]
        })

        return res.json(Meal)
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong'})
    }
})

// DELETE a specific meal by UUID
app.delete('/meals/:uuid', middleware.checkToken, async (req, res) => {
    const mealUuid = req.params.uuid
    try {
        const Meal = await meal.findOne({
            where: {mealUuid: mealUuid},
        })

        await Meal.destroy()

        return res.json({message: 'Meal deleted'})
    } catch(err) {
        console.log(err)
        return res.status(500).json({error: 'Something went wrong. Meal not deleted.'})
    }
})

}
