const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  city: String,
});

/*
	validation only runs when you use save/create!
*/
const userSchema = new mongoose.Schema({
	name: String,
	age: { 
		type: Number,
		min: 1,
		max: 100,
		//validate: {
		//	validator: v => v % 2 === 0,
		//	message: props => `${props.value} is not an even number`
		//},
	},
	email: { 
		type: String, 
		required: true, 
		lowercase: true, //uppercase
		minLength: 5,//maxLength (?)
	},
	createdAt: { 
		type: Date, 
		default: () => {
			//return new Date()
			return Date.now()
		}, 
		immutable: true,
	},
	updatedAt: { 
		type: Date, 
		default: () => {
			//return new Date() //this will also work
			return Date.now()
		}, 
	},
	bestFriend: {
		type: mongoose.SchemaTypes.ObjectId,
		ref: "User",
	},
	hobbies: [String],
	address: addressSchema,
});

userSchema.methods.sayHi = function(){ //can't use arrow function here, so to speak!
	console.log(`Hi, my name is ${ this.name }`);
}

userSchema.statics.findByName = function(name){
	//return this.where({ name: new RegExp(name, 'i')})
	return this.find({ name: new RegExp(name, 'i')})
} //can't be used on queries!

userSchema.query.byName = function(name){ //where, so chainable with a query (?)
	return this.where({ name: new RegExp(name, 'i')})
} //byName can only be used on (returned) queries!

userSchema.virtual("namedEmail").get(function(){
	return `${this.name} <${this.email}>`;
}) //the virtual namedEmail property is not saved to the database, but can be used in your code, so to speak :)

//middleware for save, validate, remove ...and updateOne.  remove for before/after you delete something

userSchema.pre('save', function(next){
	this.updatedAt = Date.now();
	next();
	//throw new Error("fail save")
});

//passes the doc that's been saved
userSchema.post('save', function(doc, next){ 
	doc.sayHi();
	next();
})

module.exports = mongoose.model("User", userSchema); //"User" refers to the collection.

