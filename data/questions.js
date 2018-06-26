const questions = [
    { type: 'input', name: 'container', message: 'Enter the container and gutter: (1170 15)'},
    { type: 'input', name: 'colors', message: 'Enter the main and secondary color, sepparated by space (#000 #fff)'},
    { type: 'confirm', name: 'defaultMixins', message: 'Use the default Boostrap breakpoints mixins?'},
    { type: 'input', name: 'fonts', message: 'Enter fonts name, separated by space:'},    
    { type: 'confirm', name: 'useMixins', message: 'Use the predefined mixins?'},
    { type: 'confirm', name: 'useAOS', message: 'Add AOS(Animate on scroll) library? Remember to use AOS JS as well.'},
    // { type: 'list', name: 'servedIn', message: 'MEssage 1', choices: types },
];

module.exports.questions = questions;