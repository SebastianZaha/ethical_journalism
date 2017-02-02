fs = require('fs')
path = require('path')
process = require('process')


function sortAndFilter(db) {
    var result = {}

    for (var name of Object.keys(db).sort()) {
        /*
        Some companies do not have either url nor email, perhaps we should just ignore that?

        if (!db[name].url) {
            console.log('\t!', name, 'missing contact url')
        }
        if (!db[name].email) {
            console.log('\t!', name, 'missing email')
        }
        */
        result[name] = db[name]
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

var sorted = sortAndFilter(db)
fs.writeFileSync('./db.json', JSON.stringify(sorted, null, 4))
console.log('Wrote db.json')

generateHtml(sorted)
console.log('Generated new html. Finished!')
