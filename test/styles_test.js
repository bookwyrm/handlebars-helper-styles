/* global require, describe, before, it */

var chai = require('chai');
var expect = chai.expect;
var Handlebars = require('handlebars');

describe('{{#styles styles}}{{/styles}}', function() {
  before(function() {
    require('../index.js').register(Handlebars, {});
  });

  it ('handles simple styles', function() {
    var source = '{{#styles styles}}{{/styles}}';
    var template = Handlebars.compile(source);
    var context = {
      styles: {
        'background-image': 'http://example.org/image.jpg'
      }
    };
    expect(template(context)).to.equal(' style="background-image:url(http://example.org/image.jpg);"');
  });
});
