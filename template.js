"use strict";

var fs = require('fs')
var controlFile
var key = "@@"

for (var i=2; i < process.argv.length; i++) {
    var src  = process.argv[i]
    console.log(src)
    var contents = fs.readFileSync(src, 'utf8')
    var nn = contents.search(key)
    console.log("nn = " + nn)
    var part = contents.substring(nn+key.length)
    var mm = part.search(/\W/)
    console.log("mm = " + mm)
    var ref = part.substring(0,mm)
    console.log(ref)
}
