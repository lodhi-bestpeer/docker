const User = require("../models/index")

const redis = require('redis');
const { promisify } = require('util');
const client = redis.createClient(6379, 'redis');
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

const signup = async(req,res)=>{
   try {
    const {firstName, lastName, email, password} = req.body

    await setAsync("firstName",JSON.stringify({...req.body}))

    const getData =JSON.parse(await getAsync("firstName"))

    console.log("redisData",getData)

    const user = await User.create({
        firstName, lastName, email, password
    })
    res.send(user)
   } catch (error) {
    res.send(error.message)
   } 


}

const getSingalUser = async(req,res)=>{
    try {
     const {id} = req.params
     const user = await User.findById(id)
     res.send(user)
    } catch (error) {
     res.send(error.message)
    }
 }

 const deleteUserProfile = async(req,res)=>{
    try {
     const {id} = req.body
     const user = await User.findByIdAndDelete(id)
     res.send(user)
    } catch (error) {
     res.send(error.message)
    }
 }

 const updateUserProfile = async(req,res)=>{
    try {
     const {firstName, lastName, email, password, id} = req.body
     if(password){
      return res.status(400).json({error: "password can not allow"})
     }
     const user = await User.findByIdAndUpdate(id,{
         firstName, lastName, email
     },{new:true})
     res.send(user)
    } catch (error) {
     res.send(error.message)
    }
 }

 const getAllUser = async(req,res)=>{
    try {
     const user =  await User.find({})
     res.send(user)
    } catch (error) {
     res.send(error.message)
    }
 }


module.exports = {
    signup,
    deleteUserProfile,
    updateUserProfile,
    getSingalUser,
    getAllUser
}