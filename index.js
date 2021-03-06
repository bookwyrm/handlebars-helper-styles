/* globals module, require */

var _ = require('lodash');

module.exports.register = function(Handlebars, options) {
  'use strict';

  var opts = options || {};

  Handlebars.registerHelper('styles', function(context) {
    context = context || {};
    if ( invalidContext(context) ) {
      return '';
    }
    var styles_map = _.map(context, function(value, key) {
      var css_property = safeCSSProperty(key);
      if (!css_property) {
        return "";
      }
      var css_value = safeCSSValue(value, css_property);
      if (css_property && css_value) {
        return css_property + ':' + css_value + ';'
      }
      return "";
    });
    var styles = _.filter(styles_map, function(style) { return style.length > 0; });
    if (styles.length > 0) {
      return ' style="' + styles.join('') + '"';
    }
    return '';
  });

  function safeCSSProperty(key) {
    // TODO Add checking for save properties...
    return key;
  }

  function safeCSSValue(value, css_property) {
    if (css_property === 'background-image' && isUrlValue(value)) {
      return urlWrap(value);
    }
    return value;
  }

  function isUrlValue(value) {
    // TODO Check for actual valid URL here
    return true;
  }

  function urlWrap(value) {
    // TODO Check to see if value is already wrapped in url()
    return 'url(' + value + ')';
  }

  function invalidContext(context) {
    // Check to see if no "real" context was passed in.
    //
    // If there is no "real" context, this should be the styles helper
    return (
      context &&
      context['name'] === 'styles' &&
      typeof(context['fn']) === "function"
    );
  }
};
