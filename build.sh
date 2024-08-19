node template.js 'sub=Home Page'                contents=@index.inc template.src  > index.html
node template.js 'sub=Dance Classes'            contents=@classes.inc template.src > classes.html
node template.js 'sub=What to Wear'             contents=@costumes.inc template.src > costumes.html
node template.js 'sub=Location and Map'         contents=@location.inc template.src > location.html
node template.js 'sub=Congress of Vienna Waltz' contents=@congress.inc jumbotron="" template.src > congress.html
node template.js 'sub=Next Ball'                contents=@upcomingevents.inc template.src > upcomingevents.html
node template.js 'sub=Press Info'               contents=@press.inc template.src > press.html
node template.js 'sub=Formal Events'            contents=@formal.inc template.src > formal.html
