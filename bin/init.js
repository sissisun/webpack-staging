var co = require('co');
var inquirer = require('inquirer');
let chalk = require('chalk')
let templates = require('../templates')
let download = require('download-git-repo')
let ora = require('ora')
let fs = require('fs')
var ncp = require('ncp').ncp;
let util = require('../util.js')

module.exports = function(name) {
    co(generator(name))
}

let generator = function *(name) {
    let tempName = name
    let targetTempl = templates.list.find((templ => templ.name === name))
    let path = targetTempl ? targetTempl.path : ''

    if(!name || typeof(name) !== 'string') {
        console.log('   可用模版列表：')
        templates.list.forEach(templ => {
            console.log(
                '   ' + chalk.green(templ.name) + 
                '   :   ' + chalk.green(templ.desc)
            )
        })
        yield inquirer.prompt([{type: 'input', name: 'name', message: '请选择模版类型'}]).then(answers => {
            tempName = answers.name
            let targetTempl = templates.list.find((templ => templ.name === tempName))
            path = targetTempl ? targetTempl.path : ''
        })
    }

    if(!tempName || !path) {
        console.log(chalk.red(`模版${tempName}不存在`))
        process.exit(0)
    } else {
        let projectName = ''
        if(!projectName) {
            inquirer.prompt([{type: 'input', name:'projectName', message: '请输入项目名称（demo）'}]).then(answers => {
                projectName = answers.projectName || 'demo'
                downloadTemplate(path, projectName)
            })
        }
        
        
    }
}

function downloadTemplate(path, projectName) {
    let spanner = ora(' 正在构建.............')
    spanner.start()
    if(fs.existsSync('download')) {
        util.rmdirSync('download')
    }

    download(path, __dirname + '/download', function(err) {
        if(err) {
            util.rmdirSync(__dirname + '/download')
            panner.fail('构建失败')
            spanner.stop()
        }
        let targetPath = process.cwd() + '/' + projectName
      
        ncp(__dirname+'/download', targetPath, function(err) {
            if(!err) {
                util.rmdirSync(__dirname + '/download')
                spanner.succeed('构建成功')
                spanner.stop()
                process.exit(0)
            }
        })
        
    })
}