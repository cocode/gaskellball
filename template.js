/*
    Very Simple Templating System
    Variables are of the form @@xxyyzz
    They are replaced by the contents of a file named xxyyzz.inc

    Note that the variable ends at the first non [A-Za-z0-9]

    Usage: node template.js template_file_name > output_file

    This is not currently recursive, @@ in .inc files are passed through.
*/
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
        ref = fs.readFileSync(ref+".inc", "utf8")
        output = output.concat(ref)
        //console.log(ref)
        contents = part.substring(mm)
        nn = contents.search(key)
        if (nn === -1) {
            output = output.concat(contents)
        }
    }
}
console.log(output)
