fs = require('fs')
path = require('path')
process = require('process')


function sort(db) {
    var result = {}
    for (var name of Object.keys(db).sort()) {
        result[name] = db[name]
    }
    return result
}

function filter(db) {
    var result = {}, 
        date = new Date();
    date.setDate(date.getDate() - 7);

    for (var name of Object.keys(db)) {
        // Skip products not advertiesed for at least a week
        if (db[name].last_broadcast > date.toISOString().substring(0, 10)) {
            result[name] = db[name]
        }
    }
    return result    
}

function parseBroadcastLogs(db) {
    for (var file of fs.readdirSync('./db')) {
        var m = file.match(/(\d\d\d\d-\d\d-\d\d)T?(\d\d)?:?(\d\d)?/)
        if (m) {
            var prods = fs.readFileSync(path.join('./db', file)).toString().split(/[\n\r]/)
            for (var p of prods) {
                if (p.trim().length == 0) continue

                if (db[p]) {
                    if (db[p].last_broadcast < m[1]) db[p].last_broadcast = m[1]
                } else {
                    db[p] = {last_broadcast: m[1]}
                }
                db[p].url = db[p].url || ""
            }
            console.log('Parsed ', file)
        } else {
            console.log('Ignoring file not matching pattern ', file)
        }
    }
}

function generateHtml(db) {
    var tpl = fs.readFileSync('./template.html').toString(), 
        rows = ''

    for (var name in db) {
        var comp = db[name].company ? ` (${db[name].company})` : '',
            nameTd = db[name].url ? `<a href="${db[name].url}">${name + comp}</a>` : name + comp
        rows += `<tr id="${name}">` + 
                   `<td>${nameTd}</td>` + 
                   `<td class="c">${db[name].last_broadcast}</td>` + 
                   `<td class="c">${db[name].email || ''}</td></tr>`
    }

    var html = tpl
            .replace('{{script}}', fs.readFileSync('./browser.js').toString())
            .replace('{{products}}', rows)

    fs.writeFileSync('index.html', html)
}


var db = JSON.parse(fs.readFileSync('./db.json').toString())
parseBroadcastLogs(db)
console.log('Done Parsing...')

var sorted = sort(db)
fs.writeFileSync('./db.json', JSON.stringify(sorted, null, 4))
console.log('Wrote db.json')

generateHtml(filter(sorted))
console.log('Generated new html. Finished!')
