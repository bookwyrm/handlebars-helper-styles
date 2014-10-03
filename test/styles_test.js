/* global require, describe, before, it */

var chai = require('chai');
var expect = chai.expect;
var Handlebars = require('handlebars');

describe('{{#styles styles}}{{/styles}}', function() {
  var source = '{{#styles styles}}{{/styles}}';
  var template = Handlebars.compile(source);

  before(function() {
    require('../index.js').register(Handlebars, {});
  });

  it ('handles simple styles', function() {
    var context = {
      styles: {
        'background-image': 'http://example.org/image.jpg'
      }
    };
    expect(template(context)).to.equal(' style="background-image:url(http://example.org/image.jpg);"');
  });

  it ('handles empty context', function() {
    var context = {};
    expect(template(context)).to.equal('');
  });
});
