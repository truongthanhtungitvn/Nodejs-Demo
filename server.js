import express from 'express';
import router from './routes/index';
const compress = require('compression')
var http = require('http');
var proxy = require('express-http-proxy');
var url = require('url');

let app = express();
app.use(compress())

app.use('/bin', express.static('./bin'));
app.use('/stylesheets', express.static('./public/stylesheets'));

app.use('/', router);

app.use('/lazadaproxy/*',function(req, response, next){
		let temp = req.originalUrl;
		temp = temp.replace('/lazadaproxy/', '');
		var urlObj = url.parse(temp);
		var options = {
			host: urlObj.host,
			path: urlObj.pathname
		};
		http.get(options, function(res) {
		 	var str = '';
		  	res.on('data', function (chunk) {
		  		str += chunk;
			});
		   	res.on('end', function () {
				console.log('done')
				response.json(str)
		   	});
		}).on('error', function(e) {

		});
	},
	proxy({
		//  	target: 'http://www.lazada.sg',
	  	changeOrigin: true,
  		logLevel: 'debug',
		router: function (req) {
			let temp = req.originalUrl;
			temp = temp.replace('/lazadaproxy/', '');
			var urlObj = url.parse(temp);
			var options = {
				host: urlObj.host,
				path: urlObj.pathname
			};
			return urlObj.protocol + '//' + urlObj.host
  		}
	}));


app.listen(3000, function () {
	console.log('Hello World listening on port 3000!');
});
