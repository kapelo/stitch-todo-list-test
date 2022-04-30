/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)

/**
 * @type {Cypress.PluginConfig}
 */

import browserify = require('@cypress/browserify-preprocessor');
const cucumber = require('cypress-cucumber-preprocessor').default;
import path = require('path');

// eslint-disable-next-line no-unused-vars
module.exports = async (on: (arg0: string, arg1: any) => void, _config: any) => {
  const options = {
    ...browserify.defaultOptions,
    typescript: path.join(path.resolve('./'), '/node_modules/typescript'),
  };

  on('file:preprocessor', cucumber(options));
};
