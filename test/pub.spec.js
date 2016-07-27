'use strict';

var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var Chakmak = require('../src/chakmak').Chakmak;

describe('Publisher', function(){
	var pub = new Chakmak.Publisher;
	describe('consutrctor', function(){
		it('should be a new Publish instance', function(){
			assert.equal(true, pub instanceof Chakmak.Publisher);
		});

		it('should be a JavaScript Object', function(){
			expect(pub).to.be.a('object');
		});
	});

	describe('prototype', function(){
		it('should be an object', function(){
			expect(Chakmak.Publisher.prototype).to.be.a('object');
		});
		it('should not be empty', function(){
			expect(Chakmak.Publisher.prototype).not.empty;
		});
		it('has method add property', function(){
			expect(pub.addProperty).is.a('function');
		});
	});

	describe('addProperty', function(){
		it('should add a given property to Publisher', function(){
			pub.addProperty('name', 'foo');
			assert.equal(pub.name, 'foo');
		});
	});

	describe('create', function(){
		'use strict'
		var pb = Chakmak.Publisher.create(
			{
				name: 'bar'
			},
			{
				displayName: function (){
					return this.name;
				}
			}
		);
		
		it('should be a static method', function(){
			expect(Chakmak.Publisher.create).is.a('function');
			expect(pub.create).is.a('undefined');
		});
		it('should a return a new Publisher instance', function(){
			assert.equal(true, pb instanceof Chakmak.Publisher);
			expect(pb.addProperty).is.a('function');
		});
		it('should add given properties', function(){
			assert.equal(pb.name, 'bar');
		});

		it('should add method in Publisher prototype', function(){
			expect(pb.displayName).is.a('function');
			expect(pb.__proto__.displayName).is.a('function');
			assert.equal(pb.displayName(), 'bar');
		});
	});
})