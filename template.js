"use strict";

var fs = require('fs')
var controlFile
var key = "@@"
var output = ""

for (var i=2; i < process.argv.length; i++) {
    var src  = process.argv[i]
    //console.log(src)
    var contents = fs.readFileSync(src, 'utf8')
    var nn = contents.search(key)
    while (nn !== -1) {
        var keyStart = nn
        output = output.concat(contents.substring(0,keyStart))
        var part = contents.substring(keyStart + key.length)
        var mm = part.search(/\W/)
        var ref = part.substring(0,mm)
        output = output.concat(ref.toUpperCase())
        //console.log(ref)
        contents = part.substring(mm)
        nn = contents.search(key)
        if (nn === -1) {
            output = output.concat(part)
        }
    }
}
console.log(output)
