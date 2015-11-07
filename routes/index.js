var mysql = require("../DBhandler");


exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.about_us  = function(req, res){
  res.render('about_us');
};

exports.features  = function(req, res){
  res.render('features');
};
	
exports.services  = function(req, res){
  res.render('services');
};	

exports.contact  = function(req, res){
  res.render('contact');
};

exports.login = function(req, res){
	res.render('login.ejs', {
		error: ""
	});
};

exports.create_account = function(req, res){
  res.render('create_account');
};



// ============= Login =============

exports.property_list = function(req, res) {	
	mysql.LogInUser(function(flag,email,userType,userNo,information){
//		console.log("email: "+email);
//		console.log("userNo: "+userNo);
//		console.log("userType: "+userType);
//		console.log("Information: "+JSON.stringify(information));
		
		req.session.userNo = userNo;			// CLIENT_ID
		req.session.userType = userType;		
		req.session.email = email;
		
//		console.log("Information Value: "+information['Items'][0].PROPERTY_DETAILS.S);
		
		var count = 0;
		
		var info_send = {
		    Items: []
		};
		
		console.log("information: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].CLIENT_ID.N == userNo){
		    	
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
	
//		console.log("info_send: "+JSON.stringify(info_send));
//		console.log("Flag: "+flag);
		
		if (flag === true) {				
			res.render('property_list.ejs', {
				email : email,
				property : info_send				
			});
		} else {
			res.render('login.ejs', {
				error: "Wrong Credential"
			});
		}
	}, req.param("email"), req.param("password"));

};

exports.dashboard_homepage = function(req, res){
	console.log(req.param("property_id"));
	req.session.property_id = req.param("property_id");
	res.render('dashboard_homepage');
};

exports.dashboard_from_homepage = function(req, res){
	res.render('dashboard_homepage');
};

exports.reports = function(req,res){
	mysql.reports(function(information){
		console.log(JSON.stringify(information));
		res.send('dashboard.ejs', {
			information : information			
		});
	},req.session.property_id);
};

