var cpjax = require('cpjax');
var crel = require('crel');
var righto = require('righto');


window.addEventListener('load', function(){
    var data = righto(cpjax, {
            url: '/data.json',
            dataType: 'json'
    });

var table = data.get(function(data){
    return crel('table',
        crel('tr',
            crel('td', 'Name'),
            crel('td', 'Age')
        ),
        data.map(row => crel('tr',
            crel('td', row.name),
            crel('td', row.age)
        ))
    );
});

var ui = righto.handle(table, function(error, done){
    done(null, crel('h1', 'Error:', error.message));
});

ui(function(error, result){
        document.body.appendChild(result);
    });
});
