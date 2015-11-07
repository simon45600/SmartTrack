/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , property = require('./routes/property')
  , guards = require('./routes/guards');



var app = express();

// all environments
app.set('port', process.env.PORT || 80);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: '295Project'}));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

app.get('/about_us', routes.about_us);
app.get('/services', routes.services);
app.get('/features', routes.features);
app.get('/contact', routes.contact);

app.get('/login', routes.login);
app.get('/create_account', routes.create_account);

//Property
app.post('/property_list',routes.property_list);
app.post('/add_property', property.add_property);
app.get('/ajax_get_specific_property_details',property.ajax_get_specific_property_details);
app.post('/edit_property',property.edit_property);
app.post('/delete_specific_property_details',property.delete_specific_property_details);

//Guards
app.get('/guard_list',guards.guard_list);
app.post('/add_guard', guards.add_guard);
app.get('/ajax_get_specific_guard_details',guards.ajax_get_specific_guard_details);
app.post('/edit_guard', guards.edit_guard);
app.post('/delete_specific_guard_details',guards.delete_specific_guard_details);

app.get('/dashboard_homepage/:property_id',routes.dashboard_homepage);

app.get('/reports',routes.reports);

app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});