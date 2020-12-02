var fs = require('fs');
var net = require('net');
var moment = require('moment');
var counter = 1;

var ip = '127.0.0.1'
var port = 2021
var log = fs.createWriteStream('server.log')
var server = net.createServer(function(socket) {
	socket.write('Server Terhubung!');
	socket.pipe(socket).on('data', function(data) {
		log.write(`[${moment().format()}] Success : POST http://${ip}/ ${data} `, function(err, result) {
			if(err) console.log('error',err);
		});
	});
});

server.listen(port, ip);

function xrandom(length) {
	var result           = '';
	var karakter       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var karakterlength = karakter.length;
	for ( var i = 0; i < length; i++ ) {
	   result += karakter.charAt(Math.floor(Math.random() * karakterlength));
	}
	return result;
 }
 
var client = new net.Socket();
client.connect(2021, '127.0.0.1', function() {
	console.log('Membuat Koneksi, mohon tunggu beberapa detik');
	var myVar = setInterval(myTimer, 3000);
	function myTimer() {
		client.write(`{"counter": ${counter}, "X-RANDOM": "${xrandom(8)}"} \n`);
		counter++;
	}
	setTimeout( function() {
		clearInterval(myVar);
	}, 3000 * 4)
});

setTimeout( function() {
	client.on('data', function(data) {
 		console.log('Received: ' + data);
	 	client.destroy();
	});
}, 3000 * 5);

client.on('close', function() {
	console.log('Selesai, Koneksi Terputus!');
});
 