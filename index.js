#!/usr/bin/env node

const inquirer          = require('inquirer');
const program           = require("commander");
const clear             = require("clear");
const figlet            = require("figlet");
const chalk             = require("chalk");
const fs                = require("fs-extra");
const logSymbols        = require("log-symbols");

program.version("0.0.2").parse(process.argv);

const [, , ...args] = process.argv;
let mainStyle = {
    hasMixins: false,
    hasFonts: false
}
clear();
console.log(
  chalk.blue(figlet.textSync(`C5 installer`, { horizontalLayout: "full" }))
);
console.log(chalk.red("If you want to exit, please CTRL + C\n"));

const questions = [
    { type: 'input', name: 'container', message: 'Enter the container and gutter: (1150 15)'},
    { type: 'input', name: 'colors', message: 'Enter the main and secondary color, sepparated by space (#000 #fff)'},
    { type: 'confirm', name: 'defaultMixins', message: 'Use the default Boostrap breakpoints mixins?'},
    { type: 'input', name: 'fonts', message: 'Enter fonts name, separated by space:'},    
    { type: 'confirm', name: 'useMixins', message: 'Use the predefined mixins?'},
    // { type: 'list', name: 'servedIn', message: 'MEssage 1', choices: types },
];


inquirer.prompt(questions).then(res => {
    !res.container ?  res.container = '1170 15' : '';
    !res.colors     ?  res.colors = '#000 #fff' : '';
    let fontResult = '';
    let mainPath = `${args[0]}/web/application/themes/${args[0]}/css`;

    fs.readFile('./predefined/mixins.less', 'utf8', (err,mixins) => {
        if(res.useMixins){
            fs.outputFile(`${mainPath}/mixins/mixins.less`,
            mixins
            )
            mainStyle.hasMixins = true;
        }
    });

    // Check if has fonts
    res.fonts.split(' ').length ? mainStyle.hasFonts = true : '';

    res.fonts.split(' ').forEach(element => {
        fontResult += `
        @font-face {
            font-family: '${element}';
            src: url('@{font-path}/files/${element}.eot');
            src: url('@{font-path}/files/${element}.eot#iefix') format('embedded-opentype'),
                 url('@{font-path}/files/${element}.woff2') format('woff2'),
                 url('@{font-path}/files/${element}.woff') format('woff'),
                 url('@{font-path}/files/${element}.ttf') format('truetype'),
                 url('@{font-path}/files/${element}.svg#${element}') format('svg');
                font-weight: 400;
              font-style: normal;
              font-stretch: normal;
              unicode-range: U+0020-00FE;
          }
        `
    })
    fs.outputFile(`${mainPath}/style.less`,
        ''
    );
    fs.outputFile(`${mainPath}/fonts/fonts.less`,
        fontResult
    );
    // Check if fonts are available
    let firstFont = res.fonts.split(' ')[0] ? res.fonts.split(' ')[0] + ', ' : '';
    let secondFont = res.fonts.split(' ')[1] ? res.fonts.split(' ')[1] + ', ': '';
    let alternativeFont = res.fonts.split(' ')[2] ? res.fonts.split(' ')[2] + ', ' : ''
    fs.outputFile(
        `${mainPath}/variables.less`,
    
        `
          // Main Information
          @theme-name                   : ${args[0]};
          @image-path                   : "application/themes/@{theme-name}/images";
          @font-path                    : "application/themes/@{theme-name}/css/fonts/files";
          
          // Fonts
          @font-main                    : '${firstFont}sans-serif';
          @font-secondary               : '${secondFont}sans-serif';
          @font-alternative             : '${alternativeFont}sans-serif';
          @font-icon           	        : "FontAwesome";
    
          // Colors
          @theme-color                  : ${res.colors.split(" ")[0]};
          @theme-secondary-color        : ${res.colors.split(" ")[1]};

          // Body
          @body-background              : #fff;
          @body-font-size               : 15px;
          @body-line-height             : 30px;
          @body-text-color              : #666;
          @body-heading-color           : #000;

          // Menus
          @main-menu-color              : #000;
          @main-menu-color-hover        : @theme-color;
          @secondary-menu-color         : #999;
          @secondary-menu-color-hover   : @theme-color;

          // Buttons
          @btn-radius                   : 5px;
          @btn-padding                  : 15px 40px;
          @btn-font-size                : 16px;
          
          @btn-default-color            : #fff;
          @btn-default-bg               : @theme-color;
          @btn-default-color-hover      : @theme-color;
          @btn-default-bg-hover         : #fff;
          
          @btn-secondary-color          : @theme-color;
          @btn-secondary-bg             : #fff;
          @btn-secondary-color-hover    : #fff;
          @btn-secondary-bg-hover       : @theme-color;

          // Cookiebar
          @cookiebar-color              : @body-background;
          @cookiebar-bg                 : #333;
          @cookiebar-btn-color          : @btn-default-color;
          @cookiebar-btn-bg             : @btn-default-bg;

          // Others
          @border-color:#ebebeb;
          @facebook-color: #3b5a9a;
          @twitter-color: #56adf2;
          
          @checkbox-border: #9e9e9e;
          @checkbox-color: #9e9e9e;
          @radio-border: #9e9e9e;
          @radio-color: #9e9e9e;

          // Bootstrap changes
          @container-width              :${res.container.split(" ")[0]}px;
          @gutter                       :${res.container.split(" ")[1]}px;
          ${res.defaultMixins ? `
          @screen-xxs-max               : 320px;
          @screen-xs-max                : 767px;
          @screen-sm-max                : 991px;
          @screen-md-max                : 1199px;
          @screen-lg-max                : 1399px;

          // Media-Up
          @screen-sm-min                : 768px;
          @screen-md-min                : 992px;
          @screen-lg-min                : 1200px;
          @screen-xlg-min               : @container-width;`
            : ` `
          }`,
          
        () => {
            // Import default files
            fs.copy('./predefined/header.less', `${mainPath}/blocks/header.less`)
                .then(() => 
                fs.copy('./predefined/footer.less', `${mainPath}/blocks/footer.less`)
                    .then(() => 
                    fs.copy('./predefined/general-style.less', `${mainPath}/general-style.less`)
                        .then(() => 
                        fs.copy('./predefined/slider.less', `${mainPath}/blocks/slider.less`)
                            .then(() => '')
                    )
                )
            )
            let styles = fs.createWriteStream(
                `${mainPath}/style.less`, {
                flags: 'a' 
            })

            styles.write(`
                //  Modules and Variables
                @import "variables.less";
            `);

            mainStyle.hasFonts  ? styles.write(`
                @import "fonts/fonts.less";
            `) : '';
            mainStyle.hasMixins ? styles.write(`
                @import "mixins/mixins.less";
            `) : '';
          
            console.log(
                chalk.green.bold(
                `${
                    logSymbols.success
                } Done! ${args[0]} theme is now ready to use.`
                )
            );
        }
      );
    
}).catch(err => {
    if(err) throw err;
});
