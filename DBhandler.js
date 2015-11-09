var AWS = require('aws-sdk');
var ejs = require("ejs");
var mysql = require('mysql');
var moment = require('moment');
moment().format();

var connection = mysql.createConnection({
	host : '',
	user : 'ProjectDemo',
	password : '',
	port : '3306',
	database : 'ProjectDemo'
});

// Login
exports.LogInUser = LogInUser;
// Property
exports.add_property = add_property;
exports.ajax_get_specific_property_details = ajax_get_specific_property_details;
exports.edit_property = edit_property;
exports.delete_specific_property_details = delete_specific_property_details;
exports.reports = reports;

exports.guard_list = guard_list;
exports.add_guard = add_guard;
exports.ajax_get_specific_guard_details = ajax_get_specific_guard_details;
exports.edit_guard = edit_guard;
exports.delete_specific_guard_details = delete_specific_guard_details;


exports.get_property_list = get_property_list;


exports.report_info = report_info;
exports.get_particular_report_info = get_particular_report_info;

AWS.config.update({
	accessKeyId : 'AKIAJHSN45HZQ4PJ52MA',
	secretAccessKey : '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',
	region : 'us-west-1'
});

var dynamodb = new AWS.DynamoDB();

function LogInUser(callback, email, password) {
	var mysql = require('mysql');
	var sendEmail = "";
	var sendUserType = "";
	var sendUserNo = "";
	var information = "";

	var flag = false;
	var sql1 = "select * from USER_CREDENTIALS where EMAIL='" + email
			+ "' and PASSWORD='" + password + "'";

	connection.query(sql1, function(err, rows, fields) {

		if (rows.length >= 1) {
			flag = true;

			sendEmail = rows[0].EMAIL;
			sendUserType = rows[0].USER_TYPE;
			sendUserNo = rows[0].USER_NO;

			dynamodb.scan({
				"TableName" : "PROPERTY_DETAILS",
				"Limit" : 100
			}, function(err, data) {
				if (err) {
					console.log(err, err.stack); // an error occurred
				} else {

					information = data;
					console.log(JSON.stringify(information));

					callback(flag, sendEmail, sendUserType, sendUserNo,
							information);
				}
			});

		} else {
			flag = false;
			sendEmail = "";
			sendUserType = "";
			sendUserNo = "";
			information = "";
			callback(flag, sendEmail, sendUserType, sendUserNo, information);
		}

	});
}

function add_property(callback, property_name, contact_name, contact_number,
		address, comments, property_details, client_id, user_type) {
	var date = new Date().toJSON().slice(0, 10);
	var property_id_unique = moment.utc().format("YYYYMMDDHHmmssS");
	var information;

	var item = {
		"PROPERTY_ID" : {
			"N" : "" + property_id_unique
		}, // Auto Increment
		"CLIENT_ID" : {
			"N" : "" + client_id
		},
		"ADDRESS" : {
			"S" : address
		},
		"COMMENT" : {
			"S" : comments
		},
		"CONTACT_NUMBER" : {
			"N" : contact_number
		},
		"GUARD_COUNT" : {
			"N" : "1"
		},
		"MANAGER_ID" : {
			"N" : "1"
		},
		"PROPERTY_DETAILS" : {
			"S" : property_details
		},
		"PROPERTY_NAME" : {
			"S" : property_name
		},
		"UPDATE_DATE" : {
			"S" : date
		}
	};

	dynamodb.putItem({
		"TableName" : "PROPERTY_DETAILS",
		"Item" : item
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {

			dynamodb.scan({
				"TableName" : "PROPERTY_DETAILS",
				"Limit" : 100
			}, function(err, data) {
				if (err) {
					console.log(err, err.stack); // an error occurred
				} else {
					information = data;
					callback(information);
				}
			});
		}
	});
}

function ajax_get_specific_property_details(callback, property_no) {

	console.log('property_no: ' + property_no);

	dynamodb.scan({
		"TableName" : "PROPERTY_DETAILS",
		"Limit" : 100
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {

			information = data;

			callback(information);
		}
	});

};

function edit_property(callback, property_name, property_no, contact_number,
		address, comments, property_details, client_id) {

	var date = new Date().toJSON().slice(0, 10);
	var information;

	var item = {
		"PROPERTY_ID" : {
			"N" : "" + property_no
		}, // Auto Increment
		"CLIENT_ID" : {
			"N" : "" + client_id
		},
		"ADDRESS" : {
			"S" : address
		},
		"COMMENT" : {
			"S" : comments
		},
		"CONTACT_NUMBER" : {
			"N" : "" + contact_number
		},
		"PROPERTY_DETAILS" : {
			"S" : property_details
		},
		"PROPERTY_NAME" : {
			"S" : property_name
		},
		"UPDATE_DATE" : {
			"S" : date
		}
	};

	dynamodb.putItem({
		"TableName" : "PROPERTY_DETAILS",
		"Item" : item
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {

			dynamodb.scan({
				"TableName" : "PROPERTY_DETAILS",
				"Limit" : 100
			}, function(err, data) {
				if (err) {
					console.log(err, err.stack); // an error occurred
				} else {
					information = data;
					callback(information);
				}
			});
		}
	});
}

function delete_specific_property_details(callback, property_no, client_id) {
	console.log("DB: " + property_no);

	client_id = client_id.toString();
	var item = {
		"PROPERTY_ID" : {
			"N" : property_no
		},
		"CLIENT_ID" : {
			"N" : client_id
		}
	};
	console.log(item);
	dynamodb.deleteItem({
		"TableName" : "PROPERTY_DETAILS",
		"Key" : item,

	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {
			console.log("Vishal: " + JSON.stringify(data));
			dynamodb.scan({
				"TableName" : "PROPERTY_DETAILS",
				"Limit" : 100
			}, function(err, data) {
				if (err) {
					console.log(err, err.stack); // an error occurred
				} else {
					information = data;
					callback(information);
				}
			});
		}
	});
};

function guard_list(callback, property_id) {

	dynamodb.scan({
		"TableName" : "EMPLOYEE_DETAILS",
		"Limit" : 100
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {
			information = data;
			callback(information);
		}
	});
};

function reports(callback, property_id) {

	dynamodb.query({
		"TableName" : "REPORT_STATUS",
		"KeyConditions" : {
			"propertyid" : {
				"ComparisonOperator" : "EQ",
				"AttributeValueList" : [ {
					"N" : property_id
				} ]
			}
		},
		"Limit" : 100
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {
			callback(data);
		}
	});

};

function add_guard(callback, contact_name, contact_number,
		address1, address2, shift, ssn, client_id, property_id) {
	var date = new Date().toJSON().slice(0, 10);
	var guard_id_unique = moment.utc().format("YYYYMMDDHHmmssS");
	var information;

	
	client_id = client_id.toString();
	
	
	var item = {
		"EMPLOYEE_ID" : {
			"N" : "" + guard_id_unique
		}, // Auto Increment
		"CLIENT_ID" : {
			"N" : "" + client_id
		},
		"PROPERTY_ID" : {
			"N" : "" + property_id
		},
		"ADDRESS_1" : {
			"S" : address1
		},
		"ADDRESS_2" : {
			"S" : address2
		},
		"NAME" : {
			"S" : contact_name
		},
		"PHONE_NUMBER" : {
			"N" : contact_number
		},
		"SHIFT" : {
			"S" : shift
		},
		"SSN" : {
			"S" : ssn
		}
	};

	dynamodb.putItem({
		"TableName" : "EMPLOYEE_DETAILS",
		"Item" : item
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {

			dynamodb.scan({
				"TableName" : "EMPLOYEE_DETAILS",
				"Limit" : 100
			}, function(err, data) {
				if (err) {
					console.log(err, err.stack); // an error occurred
				} else {
					information = data;
					callback(information);
				}
			});
		}
	});
	
}


function ajax_get_specific_guard_details(callback, employee_id) {

	dynamodb.scan({
		"TableName" : "EMPLOYEE_DETAILS",
		"Limit" : 100
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {
			information = data;
			callback(information);
		}
	});

};


function edit_guard(callback, contact_name, employee_id, contact_number,
		address1, shift, client_id) {
	
	var information;

	
	client_id = client_id.toString();
	
	
	var item = {
		"EMPLOYEE_ID" : {
			"N" : "" + employee_id
		}, // Auto Increment
		"CLIENT_ID" : {
			"N" : "" + client_id
		},
		"ADDRESS_1" : {
			"S" : address1
		},
		"NAME" : {
			"S" : contact_name
		},
		"PHONE_NUMBER" : {
			"N" : contact_number
		},
		"SHIFT" : {
			"S" : shift
		}
	};

	dynamodb.putItem({
		"TableName" : "EMPLOYEE_DETAILS",
		"Item" : item
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {

			dynamodb.scan({
				"TableName" : "EMPLOYEE_DETAILS",
				"Limit" : 100
			}, function(err, data) {
				if (err) {
					console.log(err, err.stack); // an error occurred
				} else {
					information = data;
					callback(information);
				}
			});
		}
	});
	
}


function delete_specific_guard_details(callback, guard_no, client_id) {
	console.log("DB: " + guard_no);

	client_id = client_id.toString();
	var item = {
		"EMPLOYEE_ID" : {
			"N" : guard_no
		},
		"CLIENT_ID" : {
			"N" : client_id
		}
	};
	console.log(item);
	dynamodb.deleteItem({
		"TableName" : "EMPLOYEE_DETAILS",
		"Key" : item,

	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {
			
			dynamodb.scan({
				"TableName" : "EMPLOYEE_DETAILS",
				"Limit" : 100
			}, function(err, data) {
				if (err) {
					console.log(err, err.stack); // an error occurred
				} else {
					console.log("Vishal: " + JSON.stringify(data));
					information = data;
					callback(information);
				}
			});
		}
	});
};


function get_property_list(callback) {
	
	dynamodb.scan({
		"TableName" : "PROPERTY_DETAILS",
		"Limit" : 100
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {

			information = data;
			console.log(JSON.stringify(information));

			callback(information);
		}
	});
}


function report_info(callback, property_id) {

	dynamodb.scan({
		"TableName" : "REPORT_STATUS",
		"Limit" : 100
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {
			information = data;
			callback(information);
		}
	});
};

function get_particular_report_info(callback) {

	dynamodb.scan({
		"TableName" : "REPORT_STATUS",
		"Limit" : 100
	}, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		} else {
			information = data;
			callback(information);
		}
	});
};
