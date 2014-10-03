var fs = require('fs');
var async = require('async');
var path = require('path');

/*

    ASC("A") = 65
    CHR(65) = "A"
    ASC("ਔ") = 2580
    CHR(2580) = "ਔ"

String.fromCharCode(64)

and

String.charCodeAt(0)

hexString = yourNumber.toString(16);
and reverse the process with:
yourNumber = parseInt(hexString, 16);


г - 1075 - 433
P - 1056 - 420
i - 105 - 69

hex_common.py
hex_common.py

Ч - 1063 - 0427
letter - hex - bin - utf-8 bin|hex
427 - 0000 0100 0010 0111 - (110)1 0000 (10)10 0111 | D0 A7
И  - 418 - 0100 0001 1000 - (110)1 0000 (10)01 1000 | D0 98

a7  - 			1010 0111
420 - 0000 0100 0010 0000
 */

var code = 152;
console.log((code).toString(16), String.fromCharCode(code));
console.log("Ч");
console.log(parseInt("98", 16));
console.log("Р", "Р§".charCodeAt(0), "Р§".charCodeAt(0).toString(16));
console.log("§", "§".charCodeAt(0), "§".charCodeAt(0).toString(16));
console.log("Ч".charCodeAt(0), "Ч".charCodeAt(0).toString(16));
console.log("И".charCodeAt(0), "И".charCodeAt(0).toString(16), "И".charCodeAt(0).toString(2));
return;

/*function watchRecursive(dir, opts, onchange, cb) {
	console.log('add to watch:', dir);
	fs.watch(dir, opts, function(event, filename) {
		onchange(event, filename, path.join(dir, filename));
	});
	fs.readdir(dir, function(err, files) {
		function recurse(file, cb) {
			file = path.join(dir, file);
			fs.stat(file, function(err, stat) {
				if (err) return cb(err);

				if (stat.isDirectory()) {
					return watchRecursive(file, opts, onchange, cb);
				}
				return cb();
			});
		}
		async.each(files, recurse, cb);
	});
};

watchRecursive(".", {},
	function(){
		console.log('onchange arguments:',arguments);
	},
	function(){console.log('wat ch register complete')}
);*/  

fs.watch(".", {persistent: true},function(event, filename) {
	console.log('event:', event, 'filename:', filename);
	//TODO: обработка ошибок
	//fs.createReadStream(filename).pipe(fs.createWriteStream('1'+filename));
	//console.log('file Data:', fs.readFileSync(filename))
});

var ftpSync = require('./live-ftp-sync.js');
var ftpSyncConfig = JSON.parse(fs.readFileSync('./conf.json').toString());

ftpSync.start(ftpSyncConfig, function(err) {
	if (err) console.log('error');
});

return;

console.log('FTP uploader is watching...');

//D:\work\node\ftp_sync>node ftp_sync.js D:/work/git/vtb 172.23.0.227 <login> <password> /resolute/or/vtb
//node ftp_sync.js D:/work/git/vtb <ip> <login> "<password>" /resolute/or/vtb
//d:\work\node\ftp_sync>node ftp_sync.js D:/work/node/ftp_sync <ip> <login> <password> /resolute/or/test_sync