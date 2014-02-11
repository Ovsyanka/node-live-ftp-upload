## Скрипт для синхронизации локальной директории с ftp ##

### Основные возможности:

* Синхронизация по требованию
* Слежение за локальными изменениями и автоматическая загрузка на фтп
* Указание фильтров исключения
* Указание нескольких папок для слежения

### config:

```
{
    "localDir": ".",
    "remoteDir": "/test/",
    "exclude": ".git",
    "persistant": true,
    "ftpSettings": {
        "host" : "127.0.0.1",
        "port": 21,
        "secure": true,
        "user" : "",
        "password" : ""
    }
}
```

## Using

```
    var ftpSync = require('live-ftp-sync');
    var conf = <config>;
    var cb = function(err) {
      console.log(err || "done");
    }
    ftpSync.start(conf, cb);
```

----------------------

# Live FTP Upload

Watch a directory and upload any changed files via FTP.

Useful for developing against a remote instance.

## Installing

```
npm install live-ftp-upload
```

## Using

```
require('live-ftp-upload')({
    dir : './path/to/watch',
    remoteDir : '/where/to/upload',
    connect : {
        host : 'remote-env.example.com',
        user : 'ftp-user',
        password : 'ftp-password'
    }
});

console.log('FTP uploader is watching...');
```

Uses [node-ftp](https://github.com/mscdex/node-ftp) under the hood. The `connect` property of your options is passed verbatim to `ftpClient.connect(opts)`, so any properties [node-ftp](https://github.com/mscdex/node-ftp) accepts will work.

## Release History

- 0.1.1 - really works for me - support changing dir contents.
- 0.1.0 - works for me
