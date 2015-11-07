var mysql = require("../DBhandler");

exports.add_property = function(req, res) {
	console.log(req.param("property_name"), req.param("contact_name"), req.param("contact_number"),
			req.param("address"), req.param("comments"), req.param("property_details"));
	console.log(req.session.userNo);
	mysql.add_property(function(information){    
		var count = 0;
		
		var info_send = {
		    Items: []
		};

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].CLIENT_ID.N == req.session.userNo){
		    	
		    	++count;
		    	
		    	info_send.Items.push({			    		
		    		"PROPERTY_DETAILS": information['Items'][i].PROPERTY_DETAILS.S,
		    	    "COMMENT": information['Items'][i].COMMENT.S,
		    	    "CONTACT_NUMBER": information['Items'][i].CONTACT_NUMBER.N,
		    	    "PROPERTY_ID": information['Items'][i].PROPERTY_ID.N,
		    	    "UPDATE_DATE": information['Items'][i].UPDATE_DATE.S,
		    	    "ADDRESS": information['Items'][i].ADDRESS.S,
		    	    "PROPERTY_NAME": information['Items'][i].PROPERTY_NAME.S,
			    });
		    }
		}
		info_send['Count'] = count;
	
//		console.log("info_send: "+JSON.stringify(info_send));
//		console.log("Flag: "+flag);
		
						
		res.render('property_list.ejs', {
			email : req.session.email,
			property : info_send				
		});
		
	}, req.param("property_name"), req.param("contact_name"), req.param("contact_number"),
	req.param("address"), req.param("comments"), req.param("property_details"),req.session.userNo,req.session.userType);
};

exports.ajax_get_specific_property_details = function(req,res){
	console.log("PropertyNo: " + req.param("property_no"));
	mysql.ajax_get_specific_property_details(function(information){
		console.log("specific_property_details: "+JSON.stringify(information));
		
		var info_send = []
		
		for(var i =0; i< information['Count'];i++) {
		    if(information['Items'][i].PROPERTY_ID.N == req.param("property_no")){		    	
		    	info_send.push({			    		
		    		"PROPERTY_DETAILS": information['Items'][i].PROPERTY_DETAILS.S,
		    	    "CLIENT_ID": information['Items'][i].CLIENT_ID.N,
		    	    "MANAGER_ID": information['Items'][i].MANAGER_ID.N,
		    	    "COMMENT": information['Items'][i].COMMENT.S,
		    	    "CONTACT_NUMBER": information['Items'][i].CONTACT_NUMBER.N,
		    	    "PROPERTY_ID": information['Items'][i].PROPERTY_ID.N,
		    	    "UPDATE_DATE": information['Items'][i].UPDATE_DATE.S,
		    	    "ADDRESS": information['Items'][i].ADDRESS.S,
		    	    "PROPERTY_NAME": information['Items'][i].PROPERTY_NAME.S,
		    	    "GUARD_COUNT": information['Items'][i].GUARD_COUNT.N
			    });
		    }
		}
		
		res.send({ specific_property_details : info_send});	
	},req.param("property_no"));
};


exports.edit_property = function(req, res) {
	console.log(req.param("edit_property_name"), req.param("edit_property_no"), req.param("edit_contact_number"),
			req.param("edit_address"), req.param("edit_comments"), req.param("edit_property_details"));
	
	mysql.edit_property(function(information){    
		var count = 0;
		
		var info_send = {
		    Items: []
		};
		
		console.log("information: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].CLIENT_ID.N == req.session.userNo){
		    	
		    	++count;
		    	
		    	info_send.Items.push({			    		
		    		"PROPERTY_DETAILS": information['Items'][i].PROPERTY_DETAILS.S,
		    	    "CLIENT_ID": information['Items'][i].CLIENT_ID.N,
		    	    "COMMENT": information['Items'][i].COMMENT.S,
		    	    "CONTACT_NUMBER": information['Items'][i].CONTACT_NUMBER.N,
		    	    "PROPERTY_ID": information['Items'][i].PROPERTY_ID.N,
		    	    "UPDATE_DATE": information['Items'][i].UPDATE_DATE.S,
		    	    "ADDRESS": information['Items'][i].ADDRESS.S,
		    	    "PROPERTY_NAME": information['Items'][i].PROPERTY_NAME.S
			    });
		    }
		}
		info_send['Count'] = count;
	
		res.render('property_list.ejs', {
			email : req.session.email,
			property : info_send				
		});
		
	}, req.param("edit_property_name"), req.param("edit_property_no"), req.param("edit_contact_number"),
	req.param("edit_address"), req.param("edit_comments"), req.param("edit_property_details"),req.session.userNo);
};


exports.delete_specific_property_details = function(req,res){
	console.log("delete_property_no: " + req.param("delete_property_no"));
	console.log("req.session.userNo:" + req.session.userNo);
	
	mysql.delete_specific_property_details(function(information){
		var count = 0;
		
		var info_send = {
		    Items: []
		};
		
		console.log("information: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].CLIENT_ID.N == req.session.userNo){
		    	
		    	++count;
		    	
		    	info_send.Items.push({			    		
		    		"PROPERTY_DETAILS": information['Items'][i].PROPERTY_DETAILS.S,
		    	    "CLIENT_ID": information['Items'][i].CLIENT_ID.N,
		    	    "COMMENT": information['Items'][i].COMMENT.S,
		    	    "CONTACT_NUMBER": information['Items'][i].CONTACT_NUMBER.N,
		    	    "PROPERTY_ID": information['Items'][i].PROPERTY_ID.N,
		    	    "UPDATE_DATE": information['Items'][i].UPDATE_DATE.S,
		    	    "ADDRESS": information['Items'][i].ADDRESS.S,
		    	    "PROPERTY_NAME": information['Items'][i].PROPERTY_NAME.S
			    });
		    }
		}
		info_send['Count'] = count;
	
		res.render('property_list.ejs', {
			email : req.session.email,
			property : info_send				
		});	
	},req.param("delete_property_no"),req.session.userNo);
};


exports.property_list = function(req, res) {	
	mysql.get_property_list(function(information){
		
		var count = 0;
		
		var info_send = {
		    Items: []
		};
		
		console.log("information: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].CLIENT_ID.N == req.session.userNo){
		    	
		    	++count;
		    	
		    	info_send.Items.push({			    		
		    		"PROPERTY_DETAILS": information['Items'][i].PROPERTY_DETAILS.S,
		    	    "CLIENT_ID": information['Items'][i].CLIENT_ID.N,		    	    
		    	    "COMMENT": information['Items'][i].COMMENT.S,
		    	    "CONTACT_NUMBER": information['Items'][i].CONTACT_NUMBER.N,
		    	    "PROPERTY_ID": information['Items'][i].PROPERTY_ID.N,
		    	    "UPDATE_DATE": information['Items'][i].UPDATE_DATE.S,
		    	    "ADDRESS": information['Items'][i].ADDRESS.S,
		    	    "PROPERTY_NAME": information['Items'][i].PROPERTY_NAME.S
			    });
		    }
		}
		info_send['Count'] = count;
	
						
		res.render('property_list.ejs', {
			email : req.session.email,
			property : info_send				
		});
		
	});

};