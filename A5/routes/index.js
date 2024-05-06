var url = require('url');
const { Script } = require('vm');
var sqlite3 = require('sqlite3').verbose(); 
var db = new sqlite3.Database('data/users2');

exports.authenticate = function (request, response, next){
    /*
	Middleware to do BASIC http 401 authentication
	*/
    var auth = request.headers.authorization;

	if(!auth){
 	 	//note here the setHeader must be before the writeHead
		response.setHeader('WWW-Authenticate', 'Basic realm="need to login"');
        response.writeHead(401, {'Content-Type': 'text/html'});
		console.log('No authorization found, send 401.');
 		response.end();
	}
	else{
	    console.log("Authorization Header: " + auth);

        var tmp = auth.split(' ');
        var buf = Buffer.from(tmp[1], 'base64');

		var plain_auth = buf.toString();
        console.log("Decoded Authorization ", plain_auth);

        var credentials = plain_auth.split(':');     
        var username = credentials[0];
        var password = credentials[1];
		let retrieved_user_role


        console.log("User: ", username);
        console.log("Password: ", password);

		var authorized = false;
		//check database users table for user
		db.all("SELECT userid, password, role FROM users", function(err, rows){
		for(var i=0; i<rows.length; i++){
		      if(rows[i].userid == username & rows[i].password == password) {
				authorized = true;
				retrieved_user_role = rows[i].role
			}
		}
		if(authorized == false){
 	 	   //we had an authorization header by the user:password is not valid
		   response.setHeader('WWW-Authenticate', 'Basic realm="need to login"');
           response.writeHead(401, {'Content-Type': 'text/html'});
		   console.log('No authorization found, send 401.');
 		   response.end();
		}
        else
			request.user_role = retrieved_user_role

		  	next();
		});
	}


}

exports.addUser = function (request ,response, next){
	response.render('addUsers', { title: 'COMP 2406 Final Assignment'});
	
    var auth = request.headers.authorization;

	if(!auth){
		console.log("Not working")
	}
	else {
		console.log("Authorization Header: " + auth);

		var tmp = auth.split(' ');
		var buf = Buffer.from(tmp[1], 'base64');
		var plain_auth = buf.toString();

		console.log("Decoded Authorization ", plain_auth);
		var credentials = plain_auth.split(':');      // split on a ':'

		var username = credentials[0];
		var password = credentials[1];
		var role = 'guest'

		console.log("User: ", username);
		console.log("Password: ", password);

		db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`, [username, password, role], function(err) {
			if(err){
				return console.log(err.message); 
			}
			console.log('New user was added!')

		});

		next();
	}
}

function addHeader(request, response){
	var title = 'COMP 2406:';
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.write('<!DOCTYPE html>');
	response.write('<html><head><title>About</title></head>' + '<body>');
	response.write('<h1>' +  title + '</h1>');
	response.write('<hr>');
}

function addFooter(request, response){
	response.write('<hr>');
	response.write('<h3>' +  'Carleton University' + '</h3>');
	response.write('<h3>' +  'School of Computer Science' + '</h3>');
	response.write('</body></html>');

}



exports.index = function (request, response){
	// index.html
	response.render('index', { title: 'COMP 2406 Final Assignment', login: 'Login Here', newGuest: 'New Guest (Not working)'});
}

function parseURL(request, response){
	var parseQuery = true; //parseQueryStringIfTrue
    var slashHost = true; //slashDenoteHostIfTrue
    var urlObj = url.parse(request.url, parseQuery , slashHost );
    console.log('path:');
    console.log(urlObj.path);
    console.log('query:');
    console.log(urlObj.query);
    //for(x in urlObj.query) console.log(x + ': ' + urlObj.query[x]);
	return urlObj;

}

exports.users = function(request, response){
  console.log("Users role: " + request.user_role)

  if(request.user_role == 'admin') {
    db.all("SELECT userid, password FROM users", function(err, rows) {
      send_users(request, response, rows)
    })
  }
  else {
    response.write('<h1>ERROR: Admin Privileges Required To See Users</h1>')
  }
}

function send_users(request, response, rows) {
	db.all("SELECT userid, password FROM users", function(err, rows){
		response.render('users', {title : 'Users:', userEntries: rows});
	})
  }
  

exports.find = function (request, response){ //uses 
		console.log("RUNNING FIND SONGS");

		var urlObj = parseURL(request, response);
		var sql = "SELECT id, title FROM songs";

    if (urlObj.query['title']) {
      let keywords = urlObj.query['title']
      keywords = keywords.replace(/\s/g, '%')
      console.log("finding title: " + keywords);
      sql = "SELECT id, title FROM songs WHERE title LIKE '%" +
        keywords + "%'"
    }

		db.all(sql, function(err, rows){
	       response.render('songs', {title: 'Songs:', songEntries: rows, admin: 'Admin Users Page'});
 		});
}
exports.songDetails = function(request, response){
        
	var urlObj = parseURL(request, response);
   var songID = urlObj.path;
   songID = songID.substring(songID.lastIndexOf("/")+1, songID.length);
		
	var sql = "SELECT id, title, composer, key, bars FROM songs WHERE id=" + songID;
   console.log("GET SONG DETAILS: " + songID );

   db.all(sql, function(err, rows){
	let song = rows[0];		  
	song.individualBars = []
	song.individualBars = song.bars.replace("||", "|").replace(" |]", " |").split("|")
	song.bars = song.bars.replace("||","|").replace(" |]", " |")

	var arr = [];
	while (song.individualBars.length > 0) {
		arr.push(song.individualBars.splice(0,4))
	}
	song.individualBars = arr

	console.log('Song Details');
	console.log(song);
	response.render('songDetails', {title: 'Songs Details:', song:  song});
 });
}

function addUser() {
	console.log("Works")
}