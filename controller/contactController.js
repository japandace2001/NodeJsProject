const asyncHandler = require('express-async-handler');
const Contact = require("../models/contactModel");

//desc get all contacts
//route GEt /api/contacts
//access public

const getContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.find({user_id: req.user.id});
    res.status(200).json(contact);
});

const createContact = asyncHandler(async(req, res)=>{
    console.log("The requested body is: ", req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory...");        
    }
    const contact = await Contact.create({
        name, email, phone, user_id:req.user.id
    });
    res.status(201).json(contact);
});

const getIndividualContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

const updateContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User do not have access to update other contacts")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );
    res.status(200).json(updatedContact);
    // res.status(200).json({message: `Update contacts ${req.params.id}`});
});

const deleteContact = asyncHandler(async(req, res)=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User do not have access to delete other contacts")
    }

    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContact, createContact, getIndividualContact, updateContact, deleteContact};