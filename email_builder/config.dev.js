/*
|-------------------------------------------------------------------------------
| Dev and staging config     https://maizzle.com/docs/environments/#production
|-------------------------------------------------------------------------------
|
| This is where you define settings that optimize your emails for production.
| These will be merged on top of the base config.js, so you only need to
| specify the options that are changing.
|
*/
const fs = require('fs');
const S3Service = require('../email_sender/aws/services/S3Service');
require('./utils/RemoveString');

console.log('---DEV CONFIG MAIZZLE---');

module.exports = {
  // env: 'development',
  replaceStrings: null,
  events: {
    beforeRender(html, config) {
      const model = require('../email_sender/model/model');
      /* it is very important we use two different vars for each element for this setup to work with Maizzle PostHTML and Handlebars.js
      * rather than an if/else structure or a true/false on the same element as this will not work for both systems simultaneously
      * Before rendering for production, all vars need to be changed to TRUE so Maizzle will populate them in the handlebars template,
      * then handlebars will set those conditions depending on the users preferences in Directus.
      * This allows testing to work on all environments dynamically.
      * Only SHOW needs to be set by user - the app will apply the rest.
      */
      model.logo.show = true;
      model.logo.hide = true;
      model.logoDark.show = true;
      model.logoDark.hide = true;
      model.emailImage.show = true;
      model.emailImageDark.show = true;
      model.emailImageDark.hide = true;
      config.locals = model;
      return html;
    },
    afterBuild(files) {
      files.forEach((file) => {
        try {
          const fileName = file.slice(8);
          let template = fs.readFileSync(`./${file}`).toString('utf8');
          // console.log('-- fileName :', fileName);

          const upload = async (data, fileNamePath) => {
            await S3Service.write(data, fileNamePath);
            console.log('-- UPLOAD COMPLETE FOR :', fileNamePath);
          };

          if (file.slice(-4) === '.txt') {
            template = JSON.parse(JSON.stringify(template))
              .replace(/({{)|,/g, '{{{').replace(/(}})|,/g, '}}}')
              .replace(/({{{#if +)([a-zA-Z]+).([a-zA-Z]+)(}}}+)/g, '')
              .replace(/({{{#if +)([a-zA-Z]+).([a-zA-Z]+)_([a-zA-Z]+)_([a-zA-Z]+)_([0-9]+)(}}}+)/g, '')
              .replace(/({{{\/if}}})/g, '')
              .removeStr('{{{text.HEADER}}}', 2)
              .removeStr('{{{logo.link}}}', 2)
              .removeStr('{{{logoDark.link}}}', 1)
              .removeStr('{{{user.link}}}', 3)
              .replace(/^\s*|\s*$|\s*(\r?\n)\s*|(\s)\s+/g, '\n\n') // remove extra lines and spaces
              .trim();

            fs.writeFileSync(`./${file}`, template);
          }

          upload(template, fileName);
        } catch (err) {
          console.error('error while modifying and uploading emails after build', err);
        }
      });
    }
  },
  build: {
    posthtml: {
      expressions: {
        delimiters: ['[[', ']]'], // Array containing beginning and ending delimiters for escaped locals
        // unescapeDelimiters: ['[[[', ']]]'] // Array containing beginning and ending delimiters for unescaped locals
      }
    },
    templates: {
      destination: {
        path: '../dist/templates_hbs',
      },
    },
  },
  inlineCSS: {
    mergeLonghand: false,
  },
  prettify: true,
  removeUnusedCSS: true,
};
