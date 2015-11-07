var mysql = require("../DBhandler");

exports.report_info = function(req, res) {
	
	mysql.report_info(function(information){
		var info_send = {
		    Items: [],
		    Parking_Violation: [],
		    Maintenance: [],
		    Tresspassing: [],
		    Other: []
		};
		
		console.log("information: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].propertyid.N == req.session.property_id && information['Items'][i].type.S == "Parking Violation"){
		    	
		    	info_send.Parking_Violation.push({
		    		"ReportId": information['Items'][i].REPORT_ID.N,
		    		"Date": information['Items'][i].date.S,
		    	    "Description": information['Items'][i].description.S,		    	    
		    	    "Location": information['Items'][i].location.S,
		    	    "Status": information['Items'][i].status.S,
			    });
		    }
		    if(information['Items'][i].propertyid.N == req.session.property_id && information['Items'][i].type.S == "Maintenance"){
		    	
		    	info_send.Maintenance.push({			    		
		    		"ReportId": information['Items'][i].REPORT_ID.N,
		    		"Date": information['Items'][i].date.S,
		    	    "Description": information['Items'][i].description.S,		    	    
		    	    "Location": information['Items'][i].location.S,
		    	    "Status": information['Items'][i].status.S,
			    });
		    }
		    if(information['Items'][i].propertyid.N == req.session.property_id && information['Items'][i].type.S == "Tresspassing"){
		    	
		    	info_send.Tresspassing.push({			    		
		    		"ReportId": information['Items'][i].REPORT_ID.N,
		    		"Date": information['Items'][i].date.S,
		    	    "Description": information['Items'][i].description.S,		    	    
		    	    "Location": information['Items'][i].location.S,
		    	    "Status": information['Items'][i].status.S,
			    });
		    }
		    if(information['Items'][i].propertyid.N == req.session.property_id && information['Items'][i].type.S == "Other"){
		    	
		    	info_send.Other.push({			    		
		    		"ReportId": information['Items'][i].REPORT_ID.N,
		    		"Date": information['Items'][i].date.S,
		    	    "Description": information['Items'][i].description.S,		    	    
		    	    "Location": information['Items'][i].location.S,
		    	    "Status": information['Items'][i].status.S,
			    });
		    }
		}
		console.log("info_send: "+JSON.stringify(info_send));
		
		res.render('report.ejs', {
			email : req.session.email,
			reports : info_send				
		});
		
	},req.session.property_id);
};

exports.get_particular_report_info = function(req, res) {
	
	mysql.get_particular_report_info(function(information){
		var info_send = {
		    Items: [],
		    Parking_Violation: [],
		    Maintenance: [],
		    Tresspassing: [],
		    Other: []
		};
		var photo_url = "No Photo";
		var video_url = "No Video";
		
		console.log("information: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].REPORT_ID.N == req.param("report_no")){
		    	
		    	if(item.hasOwnProperty("photourl")){
		    		photo_url = information['Items'][i].photourl.S;
	    	    }
		    	
		    	if(item.hasOwnProperty("video")){
		    		video_url = information['Items'][i].video.S;
	    	    }
		    	
		    	info_send.Items.push({
		    		"ReportId": information['Items'][i].REPORT_ID.N,
		    		"Date": information['Items'][i].date.S,
		    	    "Description": information['Items'][i].description.S,		    	    
		    	    "Location": information['Items'][i].location.S,
		    	    "Status": information['Items'][i].status.S,
		    	    "Type": information['Items'][i].type.S,
		    	    "Photo": photo_url,
		    		"Video": video_url
			    });
		    }		    
		}
		console.log("info_send: "+JSON.stringify(info_send));
		
		res.send({ specific_report_details : info_send});
		
	});
};

exports.ajax_report_info = function(req, res) {	
	mysql.report_info(function(information){
		var info_send = {
		    Items: [],
		    Parking_Violation: [],
		    Maintenance: [],
		    Tresspassing: [],
		    Other: [],		    
		};
		
		var pCount= 0, mCount= 0,tCount= 0,oCount= 0;
		var openCount = 0, closeCount = 0, inProCount = 0;
		console.log("information: "+JSON.stringify(information));

		for(var i =0; i< information['Count'];i++) {

		    var item = information['Items'][i];
		    
		    if(information['Items'][i].type.S == "Parking Violation"){
		    	
		    	info_send.Parking_Violation.push({
		    		"ReportId": information['Items'][i].REPORT_ID.N,
		    		"Date": information['Items'][i].date.S,
		    	    "Description": information['Items'][i].description.S,		    	    
		    	    "Location": information['Items'][i].location.S,
		    	    "Status": information['Items'][i].status.S,
			    });
		    	pCount++;
		    }
		    if(information['Items'][i].type.S == "Maintenance"){
		    	
		    	info_send.Maintenance.push({			    		
		    		"ReportId": information['Items'][i].REPORT_ID.N,
		    		"Date": information['Items'][i].date.S,
		    	    "Description": information['Items'][i].description.S,		    	    
		    	    "Location": information['Items'][i].location.S,
		    	    "Status": information['Items'][i].status.S,
			    });
		    	mCount++;
		    }
		    if(information['Items'][i].type.S == "Tresspassing"){
		    	
		    	info_send.Tresspassing.push({			    		
		    		"ReportId": information['Items'][i].REPORT_ID.N,
		    		"Date": information['Items'][i].date.S,
		    	    "Description": information['Items'][i].description.S,		    	    
		    	    "Location": information['Items'][i].location.S,
		    	    "Status": information['Items'][i].status.S,
			    });
		    	tCount++;
		    }
		    if(information['Items'][i].type.S == "Other"){
		    	
		    	info_send.Other.push({			    		
		    		"ReportId": information['Items'][i].REPORT_ID.N,
		    		"Date": information['Items'][i].date.S,
		    	    "Description": information['Items'][i].description.S,		    	    
		    	    "Location": information['Items'][i].location.S,
		    	    "Status": information['Items'][i].status.S,
			    });
		    	oCount++;
		    }
		    if(information['Items'][i].status.S == "Close")
		    {
		    	closeCount++;
		    }
		    if(information['Items'][i].status.S == "OPEN")
	    	{
		    	openCount++;
	    	}
		    if(information['Items'][i].status.S == "In Progress")
	    	{
		    	inProCount++;
	    	}
		}
		info_send['pCount'] = pCount;
		info_send['mCount'] = mCount;
		info_send['tCount'] = tCount;
		info_send['oCount'] = oCount;
		
		info_send['closeCount'] = closeCount;
		info_send['openCount'] = openCount;
		info_send['inProCount'] = inProCount;
		console.log("info_send: "+JSON.stringify(info_send));
		
		res.send({ reports : info_send});
		
	},req.session.property_id);
};
