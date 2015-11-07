var mysql = require("../DBhandler");

exports.guard_list = function(req, res){	
	mysql.guard_list(function(information){
		var info_send = {
		    Items: []
		};
		
		var count = 0;
		
		console.log("information: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    console.log("Item: "+JSON.stringify(item));
		    
		    if(information['Items'][i].PROPERTY_ID.N == req.session.property_id){
		    	
		    	++count;
		    	
		    	info_send.Items.push({			    		
		    		"NAME": information['Items'][i].NAME.S,
		    	    "ADDRESS_1": information['Items'][i].ADDRESS_1.S,		    	    
		    	    "SHIFT": information['Items'][i].SHIFT.S,
		    	    "PHONE_NUMBER": information['Items'][i].PHONE_NUMBER.N,
		    	    "EMPLOYEE_ID": information['Items'][i].EMPLOYEE_ID.N
			    });
		    }
		}
		info_send['Count'] = count;
		
		console.log("info_send: "+JSON.stringify(info_send));
		
		res.render('guard_list.ejs', {
			email : req.session.email,
			guard_list : info_send				
		});
		
	},req.session.property_id);
};


exports.add_guard = function(req, res) {
	console.log(req.param("contact_name"), req.param("contact_number"),
			req.param("address1"),req.param("address2"), req.param("shift"), req.param("ssn"));
	console.log(req.session.userNo);
	mysql.add_guard(function(information){    
		var info_send = {
		    Items: []
		};
		
		var count = 0;
		
		console.log("information: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].PROPERTY_ID.N == req.session.property_id){
		    	
		    	++count;
		    	
		    	info_send.Items.push({			    		
		    		"NAME": information['Items'][i].NAME.S,
		    	    "ADDRESS_1": information['Items'][i].ADDRESS_1.S,		    	    
		    	    "SHIFT": information['Items'][i].SHIFT.S,
		    	    "PHONE_NUMBER": information['Items'][i].PHONE_NUMBER.N,
		    	    "EMPLOYEE_ID": information['Items'][i].EMPLOYEE_ID.N
			    });
		    }
		}
		info_send['Count'] = count;
		
		console.log("info_send: "+JSON.stringify(info_send));
		
		res.render('guard_list.ejs', {
			email : req.session.email,
			guard_list : info_send				
		});
		
	}, req.param("contact_name"), req.param("contact_number"),
	req.param("address1"),req.param("address2"), req.param("shift"), req.param("ssn"),req.session.userNo,req.session.property_id);
};


exports.ajax_get_specific_guard_details = function(req,res){
	console.log("EMployee Id: " + req.param("employee_id"));
	mysql.ajax_get_specific_guard_details(function(information){
		console.log("specific_property_details: "+JSON.stringify(information));
		
		var info_send = []
		
		for(var i =0; i< information['Count'];i++) {
			if(information['Items'][i].PROPERTY_ID.N == req.session.property_id){		    	
		    	info_send.push({			    		
		    		"NAME": information['Items'][i].NAME.S,
		    	    "ADDRESS_1": information['Items'][i].ADDRESS_1.S,		    	    
		    	    "SHIFT": information['Items'][i].SHIFT.S,
		    	    "PHONE_NUMBER": information['Items'][i].PHONE_NUMBER.N,
		    	    "EMPLOYEE_ID": information['Items'][i].EMPLOYEE_ID.N
			    });
		    }
		}
		
		res.send({ specific_guard_details : info_send});	
	},req.param("employee_id"));
};

exports.edit_guard = function(req, res) {
	console.log(req.param("edit_guard_name"), req.param("edit_employee_id"), req.param("edit_contact_number"),
			req.param("edit_address"), req.param("edit_shift"));
	
	mysql.edit_guard(function(information){    
		var info_send = {
		    Items: []
		};
		
		var count = 0;
		
		console.log("New: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].PROPERTY_ID.N == req.session.property_id){
		    	
		    	++count;
		    	
		    	info_send.Items.push({			    		
		    		"NAME": information['Items'][i].NAME.S,
		    	    "ADDRESS_1": information['Items'][i].ADDRESS_1.S,		    	    
		    	    "SHIFT": information['Items'][i].SHIFT.S,
		    	    "PHONE_NUMBER": information['Items'][i].PHONE_NUMBER.N,
		    	    "EMPLOYEE_ID": information['Items'][i].EMPLOYEE_ID.N
			    });
		    }
		}
		info_send['Count'] = count;
		
		console.log("info_send: "+JSON.stringify(info_send));
		
		res.render('guard_list.ejs', {
			email : req.session.email,
			guard_list : info_send				
		});
		
	}, req.param("edit_guard_name"), req.param("edit_employee_id"), req.param("edit_contact_number"),
	req.param("edit_address"), req.param("edit_shift"),req.session.userNo);
};


exports.delete_specific_guard_details = function(req,res){
	console.log("delete_employee: " + req.param("delete_employee"));	
	
	mysql.delete_specific_guard_details(function(information){
		
		var info_send = {
		    Items: []
		};
		
		var count = 0;
		
		console.log("information: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].PROPERTY_ID.N == req.session.property_id){
		    	
		    	++count;
		    	
		    	info_send.Items.push({			    		
		    		"NAME": information['Items'][i].NAME.S,
		    	    "ADDRESS_1": information['Items'][i].ADDRESS_1.S,		    	    
		    	    "SHIFT": information['Items'][i].SHIFT.S,
		    	    "PHONE_NUMBER": information['Items'][i].PHONE_NUMBER.N,
		    	    "EMPLOYEE_ID": information['Items'][i].EMPLOYEE_ID.N
			    });
		    }
		}
		info_send['Count'] = count;
		
		console.log("info_send: "+JSON.stringify(info_send));
		
		res.render('guard_list.ejs', {
			email : req.session.email,
			guard_list : info_send				
		});
	},req.param("delete_employee"),req.session.userNo);
};