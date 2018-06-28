const inquirer = require("inquirer");
let scripts = [
{
  name: 'Webpack'
},
{
  name: 'AOS'
},
// {
//   name: 'Ground Meat'
// },
// {
//   name: 'Bacon'
// }
];

const questions = [
    { type: 'input', name: 'container', message: 'Enter the container and gutter: (1170 15)'},
    { type: 'input', name: 'colors', message: 'Enter the main and secondary color, sepparated by space (#000 #fff)'},
    { type: 'confirm', name: 'defaultMixins', message: 'Use the default Boostrap breakpoints mixins?'},
    { type: 'input', name: 'fonts', message: 'Enter fonts name, separated by space:'},    
    { type: 'confirm', name: 'useMixins', message: 'Use the predefined mixins?'},
    { type: 'checkbox', name: 'selectedScripts', message: 'Select what would you like to include:', choices: scripts},
];

module.exports.questions = questions;