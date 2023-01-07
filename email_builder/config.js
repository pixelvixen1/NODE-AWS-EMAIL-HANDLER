/*
|-------------------------------------------------------------------------------
| Local development and Node config for Production - used for both
| https://maizzle.com/docs/environments/#local
|-------------------------------------------------------------------------------
| The exported object contains the default Maizzle settings for development.
| This is used when you run the `maizzle build` or `maizzle serve` and it
| has the fastest build time, since most transformations are disabled.
|
*/
const fs = require('fs');

console.log('---****BASE CONFIG MAIZZLE****---');

module.exports = {
  replaceStrings: {
    '\\s?{{#if logo.SHOW}}': '',
    '\\s?{{#if logo.HIDE}}': '',
    '\\s?{{#if logoDark.SHOW}}': '',
    '\\s?{{#if logoDark.HIDE}}': '',
    '\\s?{{#if emailImage.SHOW}}': '',
    '\\s?{{#if emailImageDark.SHOW}}': '',
    '\\s?{{#if emailImageDark.HIDE}}': '',
    '\\s?{{#if text.FOOTER_LINK_URL_1}}': '',
    '\\s?{{#if text.FOOTER_LINK_URL_2}}': '',
    '\\s?{{#if text.FOOTER_LINK_URL_3}}': '',
    '\\s?{{/if}}': '',
  },
  events: {
    beforeRender(html, config) {
      console.log('cmsFile = ', config.cmsFile);
      const model = require('../email_sender/model/model');
      const text = fs.readFileSync(`./cms/en-GB/email_${config.cmsFile}.json`).toString('utf8');
      const images = fs.readFileSync('./cms/en-GB/email_images.json').toString('utf8');

      const emailImages = Object.values(JSON.parse(images)).map((img) => {
        img.hide = !img.show;
        return img;
      });

      model.text = JSON.parse(text);
      model.logo = emailImages.find((img) => img.id === 'LOGO');
      model.logoDark = emailImages.find((img) => img.id === 'LOGO_DARK');
      const emailImage = emailImages.find((img) => img.id === `${config.cmsFile.toUpperCase()}_IMAGE`);
      const emailImageDark = emailImages.find((img) => img.id === `${config.cmsFile.toUpperCase()}_IMAGE_DARK`);

      if (emailImage) {
        model.emailImage = emailImage;
      } else {
        model.emailImage.show = false;
        model.emailImage.hide = true;
      }

      if (emailImageDark) {
        model.emailImageDark = emailImageDark;
      } else {
        model.emailImageDark.show = false;
        model.emailImageDark.hide = true;
      }

      config.locals = model;
      return html;
    },
  },
  locals: {},
  build: {
    templates: {
      source: 'src/templates',
      destination: {
        path: '../dist/templates',
      },
    },
    tailwind: {
      css: 'src/css/tailwind.css',
      config: 'src/themes/tailwind.config.js',
    },
  },
  inlineCSS: {
    mergeLonghand: false,
    styleToAttribute: {
      'background-color': 'bgcolor',
      'vertical-align': 'valign'
    },
    attributeToStyle: false,
  },
  prettify: {
    ocd: true,
  },
  extraAttributes: {
    table: {
      border: 0,
      cellpadding: 0,
      cellspacing: 0,
      role: 'presentation',
    },
  },
  plaintext: {
    ignoreTags: [],
    onlyStripTags: [],
    stripTogetherWithTheirContents: ['script', 'style', 'xml', 'hiddenspace', 'raw'],
    skipHtmlDecoding: false,
    trimOnlySpaces: false,
    dumpLinkHrefsNearby: {
      enabled: true,
      putOnNewLine: true,
      wrapHeads: '',
      wrapTails: ''
    },
    cb: null
  },

};
