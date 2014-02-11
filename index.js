var async = require('async');
var ftp = require('ftp');
var fs = require('fs');
var path = require('path');

function FtpSync(conf) {
	this.init(conf);
};

/**
 * Выставляю различные внутренние настройки. Обрабатываю опции запуска.
 * Хочу сделать проверку на формальную корректность настроек, но, наверное, не сейчас.
 * @param  {Object} conf [description]
 * @return {[type]}      [description]
 */
FtpSync.prototype.init = function(conf) {
	this.ftpConf = conf.ftpSettings;
	this.confOk = true; //Если установится в false - значит что-то в настройках не так.
};

FtpSync.prototype.connect = function(cb) {
	this.ftpClient = new ftp();
	this.ftpClient.on('ready', function(){
		cb(null);
	});
	this.ftpClient.on('error', function(){
		cb('Can\'t connect to ftp');
	})
	this.ftpClient.connect(this.ftpConf);
};

/**
 * Устанавливает слежение за директорией и вложенными директориями.
 * @param  {[type]}   dir      директория, которую надо отслеживать
 * @param  {[type]}   opts     опции для fs.watch
 * @param  {[type]}   onchange функция, вызываемая при изменении
 * @param  {Function} cb       коллбэк, вызываемый по окончанию установки следителей
 */
function watchRecursive(dir, opts, onchange, cb) {
    
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
}

//Вынести из класса
FtpSync.prototype.initWatcher = function(cb) {
	var dir = this.localDir;

	if (!exclude.test(dir))
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

FtpSync.prototype.start = function(cb) {
	async.parallel([
		this.connect, //.bind(this)
		this.initWatcher
	], function cb(err, results){
		if (!err) console.log('start is ok');
	});
	
};

//Перечисляю экспортируемые функции

var x = module.exports = function start(conf, cb) {
	var ftpSync = new FtpSync(conf);
	
	//Проверка на корректность конфига.
	if (!ftpSync.confOk) {
		cb(ftpSync.err || "unknown error while create instance of FtpSync");
		return;
	};

	//Запуск синхронизатора
	ftpSync.start(function startCb(err){
		if (err) {
			cb(err);
			return;
		}

		cb(null, ftpSync);
	});
};


var conf = JSON.parse(fs.readFileSync('./conf.json').toString());
x(
	conf, 
	function(err, ftpClient){
		console.log('ftpStart err: ', err);
	}
);
