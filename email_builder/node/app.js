/* eslint-disable no-underscore-dangle */
global.__basedir = __dirname;
require('custom-env').env(true);
const express = require('express');

const app = express();
const path = require('path');
const server = require('http').Server(app);
const serveIndex = require('serve-index');
const router = require('./routes/router');
const config = require('./config/config.json');

const PORT = config.server.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// const directusRouter = require('../directus/directusRouter');

// app.use('/directus', directusRouter);

// Image path - to preview images in email node output testing
// app.use('/images', express.static("email_sender/images"));

// view templates with serve index
const cms = '../cms/';
const templates = '../../dist/templates';
const hbsTemplates = '../../dist/templates_hbs';
const userTemplates = '../../dist/templates_sent';
const options = { icons: true, view: 'details' };

app.use('/templates', express.static(path.join(__dirname, templates)), serveIndex(path.join(__dirname, templates), options));
app.use('/templates-hbs', express.static(path.join(__dirname, hbsTemplates)), serveIndex(path.join(__dirname, hbsTemplates), options));
app.use('/templates-user', express.static(path.join(__dirname, userTemplates)), serveIndex(path.join(__dirname, userTemplates), options));
app.use('/cms', express.static(path.join(__dirname, cms)), serveIndex(path.join(__dirname, cms), options));

// AWS and Email routes
app.use(router);

server.listen(PORT, () => console.log(`-----Server started on port ${PORT}`));
