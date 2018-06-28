#!/usr/bin/env node

const inquirer          = require('inquirer');
const program           = require("commander");
const clear             = require("clear");
const {textSync}        = require("figlet")
const chalk             = require("chalk");
const { outputFile, createWriteStream } = require("fs-extra");

// Local requires
const { questions }         = require("./data/questions");
const { slider, header, generalStyles, mixins, fontInit, webpackConfig, webpackJSON, sampleScript, sampleComponent, stylingAux } = require("./data/predefined");

//AOS
const { aosCSS, aosJS }  = require("./data/aos/aosJS");

// Utilities
const { getCurrentTime, buildInfo, showTitle, showSuccess, showWarning, showInfo, contains } = require("./data/util");

program.version("1.1.0").parse(process.argv);
const [, , ...args] = process.argv;





if(args[0] === 'add-block'){
    outputFile(`./css/blocks/${args[1]}.less`, `
.section-${args[1]}{
    // CSS goes here
}
    `).then( () => {
        createWriteStream(
            `./css/style.less`, {
            flags: 'a' 
        }).write(`
\n@import "blocks/${args[1]};`);
        readFile('./c5.json','utf8', (err, data) => {
            let c5JSON = JSON.parse(data);
            c5JSON.lastUpdated = getCurrentTime;
            outputFile('./c5.json', JSON.stringify(c5JSON, null, 4));
        });
        showSuccess(`Done! ${args[1]} block added.`)
    });
}else{
    let mainStyle = {}

    clear();
    showTitle();
    showWarning("If you want to exit, please CTRL + C\n");
    
    inquirer.prompt(questions).then(res => {
        !res.container ?  res.container = '1170 15' : '';
        !res.colors     ?  res.colors = '#000 #fff' : '';
        let fontResult = '';
        
        let path = `${args[0]}/web/application/themes/${args[0]}`;
        let CSSPath = `${path}/css`;
        let JSPath = `${path}/js`;
        mainStyle.useMixins = res.useMixins;
        
        // Check if has fonts
        res.fonts.split(' ').length ? mainStyle.hasFonts = true : '';
        res.fonts.split(' ').forEach(element => {
            fontResult += fontInit(element);
        });

        outputFile(`${JSPath}/custom.js`, 'console.log("here goes the script");');
        outputFile(`${CSSPath}/style.less`, '');
        outputFile(`${CSSPath}/fonts/fonts.less`, fontResult);
        outputFile(`${CSSPath}/fonts/files/readme.txt`,`
Import fonts using Fontie web-font generator
URL: https://fontie.pixelsvsbytes.com/webfont-generator
Keep the name as you configured in the installer.
`
        );
        // Check if fonts are available
        let firstFont = res.fonts.split(' ')[0] ? res.fonts.split(' ')[0] + ', ' : '';
        let secondFont = res.fonts.split(' ')[1] ? res.fonts.split(' ')[1] + ', ': '';
        let alternativeFont = res.fonts.split(' ')[2] ? res.fonts.split(' ')[2] + ', ' : ''
        outputFile(
            `${CSSPath}/variables.less`,`
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

${stylingAux}

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
                let styles = createWriteStream(
                    `${CSSPath}/style.less`, {
                    flags: 'a' 
                })
                
                if(contains.call(res.selectedScripts, 'Webpack')){
                    outputFile(`${JSPath}/webpack/webpack.config.js`, webpackConfig);
                    outputFile(`${JSPath}/webpack/package.json`, webpackJSON);
                    outputFile(`${JSPath}/webpack/index.js`, sampleScript);
                    outputFile(`${JSPath}/webpack/comp.js`, sampleComponent);
                }
                if(contains.call(res.selectedScripts, 'AOS')){
                    outputFile(`${CSSPath}/vendor/aos.less`, aosCSS).then( () => styles.write(`
@import "vendor/aos.less";`))
                    outputFile(`${JSPath}/vendors/aos.js`, aosJS).then( () => {})
                }
                outputFile(`${CSSPath}/blocks/header.less`, header).then( () => styles.write(`
@import "blocks/header.less";`)); // Import header
    
                outputFile(`${CSSPath}/mixins/mixins.less`, mixins).then( () => styles.write(`
@import "mixins/mixins.less";`)); // Import header
                outputFile(`${CSSPath}/general-styles.less`, generalStyles).then( () => styles.write(`
@import "general-styles.less";`)); // Import general-styles
                outputFile(`${CSSPath}/blocks/footer.less`, '//Footer less will go here').then( () => styles.write(`
@import "blocks/footer.less";`)); // Import footer
                outputFile(`${CSSPath}/vendor/slider.less`, slider).then( () => styles.write(`
@import "vendor/slider.less";`)); // Import slider 

                
    
                styles.write(`
@import "variables.less";`);
                mainStyle.hasFonts  ? styles.write(`
@import "fonts/fonts.less";`) : '';
                mainStyle.hasMixins ? styles.write(`
@import "mixins/mixins.less";`) : '';
              
                showSuccess(`Done! ${args[0]} theme is now ready to use.`);
                
                if(contains.call(res.selectedScripts, 'Webpack')){
                showInfo(`Please run: cd ${args[0]}/web/application/themes/${args[0]}/js/webpack/ && npm install && npm run watch`)
                }

            }
          );
        
        // Write info about installation
        outputFile(`${path}/c5.json`, JSON.stringify(buildInfo(args[0]), null, 4));

    }).catch(err => {
        if(err) throw err;
    });
}
