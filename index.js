var ejs = require('ejs');
var fs = require('fs');

index_ejs_str = fs.readFileSync(__dirname + '/web/index.ejs', 'utf8');

var ret = ejs.render(index_ejs_str, {
    'title': 'Hello EJS'
});

console.log(ret);