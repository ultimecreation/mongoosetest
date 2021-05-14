const express = require('express')
const mongoose = require('mongoose')

const User = mongoose.model('User', new mongoose.Schema({
    name:{
        type:String
    },
    wishlist:{
        type: [String]
    },
    wishlistArrayOfObjects: [{}]
    
}))

const db = ()=>{
    try {
        mongoose.connect(
            "mongodb+srv://mongoosetest:mongoosetest@cluster0.vnyos.mongodb.net/mongoosetest?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            }
        )
        console.log('mongo connected')
    } catch (error) {
        console.log(error)
    }
}
db()
const app = express()
app.get('/',async (req,res)=>{
    
   /* 
        // save
        const jean = new User({name: "Jean"})
        const result = await jean.save() 
        console.log(result)
        return res.json(result)
    */

     /* 
        // update array of strings
        // 1 - on recupere l'id via l'url
        const JeanId = "609ee99ae2e91618d8a8ce89"

        // 2 - on recupere un id de challenge 
        const wishlistArr = [ 1,2,3 ]

        // 4 - on met a jour l'utilisateur en db
        updatedUser = await User.findByIdAndUpdate(
            {_id: JeanId},
            {$addToSet:{wishlist: wishlistArr[0]}},
            {upsert: true,new: true}
        )

        // 5 - on retourne l'utilisateur après la maj
        console.log(updatedUser)
        return res.json(updatedUser) 
    */

        // update array of objects
        // 1 - on recupere l'id via l'url
        const JeanId = "609ee99ae2e91618d8a8ce89"

        // 2 - on recupere un id de challenge 
        const wishlistArr = [ {someId :1},{someId :2},{someId :3} ]
        const user = await User.findById(JeanId)

        // on boucle sur le tableau d'objets et si l'id est inexistant, on l'ajoute au tabeau
        if(user.wishlistArrayOfObjects.map(object=> object.someId).indexOf(wishlistArr[0].someId) === -1){
            user.wishlistArrayOfObjects.push(wishlistArr[0])
        }
        //console.log(user.wishlistArrayOfObjects)

        // 4 - on met a jour l'utilisateur en db
        updatedUser = await User.findByIdAndUpdate(
            {_id: JeanId},
            {$set: { wishlistArrayOfObjects: user.wishlistArrayOfObjects } },
            {upsert: true,new: true}
        )

        // 5 - on retourne l'utilisateur après la maj
        console.log(updatedUser)
        return res.json(updatedUser) 
})
app.listen(3000,()=> 'server started')