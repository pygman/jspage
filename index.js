var http = require('http');
var path = require('path');
var ejs = require('ejs');
var url = require('url');
var fs = require('fs');

var sys_path_sep = path.sep;
var sys_arg_length = process.argv.length;
var web_base = __dirname + sys_path_sep + 'web';
if (sys_arg_length > 2) {
    web_base = process.argv[2];
}

console.log(web_base);

// var sys_scope = {
//     'version': '0.0.1'
// };

http.createServer(function (request, response) {

    request.setEncoding("utf8");
    var pathname = url.parse(request.url).pathname;

    //TODO request params

    var stat_result = fs.stat(web_base + pathname, function (err, stat) {
        if (stat && stat.isFile()) {
            console.log('文件存在');
            response.writeHead(200, {'Content-Type': 'text/plain'});
            var render_resp = ejs.renderFile(web_base + pathname, {
                'title': 'Hello EJS'
            }, function (err, result) {
                console.log(err);
                console.log(result);
                response.end(result);
            });
            console.log(render_resp);
        } else {
            response.writeHead(404, {'Content-Type': 'text/plain'});
            response.end('404');
            console.log('文件不存在或不是标准文件');
        }
    });
    console.log(stat_result);

    console.log(pathname);

}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');