let chalk = require('chalk')
let templates = require('../templates')

module.exports = function() {
    templates.list.forEach((templ, index) => {
        console.log(
            '   ' + chalk.green('*') + 
            '   ' + chalk.green(templ.name) + 
            '   ' + chalk.green(templ.desc)
        )
    })

    if(!templates.list || templates.list.length === 0) {
        console.log(chalk.yellow('当前无可用模版'))
    }
}