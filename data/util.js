
const chalk             = require("chalk");
const {textSync}            = require("figlet")
const success        = require("log-symbols").success;


const getCurrentTime = new Date().getDate() + "/"
+ (new Date().getMonth()+1)  + "/" 
+ new Date().getFullYear() + " @ "  
+ new Date().getHours() + ":"  
+ new Date().getMinutes() + ":" 
+ new Date().getSeconds();

function buildInfo(arg){
    return {
        author: process.env.USERNAME,
        themeName: arg,
        description: `A theme for ${arg} website`,
        createdAt: getCurrentTime
    }
}

function showTitle(){
    console.log(chalk.blue(textSync(`C5 installer`, { horizontalLayout: "full" })));
}

function showSuccess(arg){
    console.log(
        chalk.green.bold(
        `${success} ${arg}`
        )
    );
}

function showWarning(arg){
    console.log(chalk.red(arg));
}
function showInfo(arg){
    console.log(chalk.yellow.bold(arg));
}

const contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

module.exports = {
    getCurrentTime,
    buildInfo,

    showTitle,
    showSuccess,
    showWarning,
    showInfo,
    
    contains
}