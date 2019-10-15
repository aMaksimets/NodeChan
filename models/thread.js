let mongoose = require('mongoose');

//Thread schema
let threadSchema = mongoose.Schema({
	name:{
		type: String,
		required: false
	},
	pname:{
		type: String,
		required: false
	},
	body:{
		type: String,
		required: true
	},
	board:{
		type: String,
		required: true
	}
});

let Thread = module.exports = mongoose.model('Thread', threadSchema);
