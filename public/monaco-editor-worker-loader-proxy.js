/**
 * Monaco Editor Worker Loader Proxy Script
 * This file helps to load Monaco Editor workers properly in development environment
 */
self.MonacoEnvironment = {
  baseUrl: './',
  getWorkerUrl: function (_, label) {
    if (label === 'json') {
      return '/static/json.worker.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return '/static/css.worker.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return '/static/html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return '/static/ts.worker.js';
    }
    return '/static/editor.worker.js';
  }
};
