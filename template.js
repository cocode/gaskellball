/*
    Very Simple Templating System

    Variables are of the form @@xxyyzz
    Note that the variable ends at the first non [A-Za-z0-9]

    Variables are replaced by command line arguments, if given, or
    they are replaced by the contents of a file named xxyyzz.inc

    Usage: node template.js v1=value v2 = value ... template_file_name > output_file

    This is not currently recursive, @@ in values or ".inc" files are passed through.
*/
"use strict";

var fs = require('fs')
var controlFile
var key = "@@"
var output = ""
var variables = {}

var argIndex = 2
for (var i=argIndex; i < process.argv.length; i++) {
    var arg  = process.argv[i]
    var eq = arg.indexOf("=")
    if (eq !== -1) {
        argIndex++
        var a1 = arg.substring(0,eq)
        var a2 = arg.substring(eq+1)
        if (a2.charAt(0) === '@') {
            a2 = fs.readFileSync(a2.substring(1), "utf8")
        }
        variables[a1] = a2
    } else {
        break;
    }
}

for (var i=argIndex; i < process.argv.length; i++) {
    var src  = process.argv[i]
    var contents = fs.readFileSync(src, 'utf8')
    var nn = contents.search(key)
    while (nn !== -1) {
        var keyStart = nn
        output = output.concat(contents.substring(0,keyStart))
        var part = contents.substring(keyStart + key.length)
        var mm = part.search(/\W/)
        var ref = part.substring(0,mm)
        var filename;
        if (ref in variables) {
            //console.error("variable ref " + ref + "=>" +  variables[ref])
            output = output.concat(variables[ref])
        }
        else {
            filename = ref + ".inc"
            var fileContents = fs.readFileSync(filename, "utf8")
            output = output.concat(fileContents)
            //console.error("file ref " + ref + "=>" +  filename)
        }
        contents = part.substring(mm)
        nn = contents.search(key)
        if (nn === -1) {
            output = output.concat(contents)
        }
    }
}
console.log(output)
