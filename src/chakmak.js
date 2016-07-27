/**
 * **************************************************
 * **************************************************
 * **************************************************
 * ******************** CHAKMAK  *********************
 * **************************************************
 * **************************************************
 */

/**
 * @author Upendra Dev Singh
 * @description A small pubsub utility 
 *
 * MIT Licence
 */

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

;(function(definition){
	var	hasDefine = typeof define === 'function' && define.amd,			// AMD
		hasExports = typeof module !== 'undefined' && module.exports;	// Commonjs


	// Setup the root object, `window` (`self`) in the browser, or `global` in the node.js server.
    // We use `self` instead of `window` for `WebWorker` support.
    
    var root = (typeof self == 'object' && self.self === self && self) || (typeof global == 'object' && global.global === global && global);

	if(hasDefine){
		define(['exports'], function(exports) {
		    // Export global even in AMD case
			// Avoid duplicate bu default

		    root.Chakmak = definition(exports);
		});
	// node.js or commonjs 
	}else if(hasExports){
		definition(exports);
	// Finally, as browser global
	}else{
		definition(root);
	}
}(function(root){

	var Chakmak = {};

	root.Chakmak = Chakmak;

	Chakmak.version = '0.0.2';

	/**
	 * Creates an object with given properties and methods
	 *  
	 * 
	 * @param  {Object} staticProps Properties to be added to newly constructed object
	 * @param  {Object} methods Functions to be added to newly constructed object prototype
	 * @return {Object} Return an new object           
	 */
	function create(staticProps, methods){
		var Parent = this;	// Publisher or Subscriber Object
		var child;			// New Object to be created

		// A child class constructor inheritted from Parent class
		function Child(){
			return Parent.call(this);
		}
		
		// Inherit Child Class from current parent class
		Child.prototype = Object.create(Parent.prototype);
		Child.prototype.constructor = Child;

		// Copy all the custom method to Child class prototype
		if(typeof methods === 'object'){
			for(var key in methods){
				Child.prototype[key] = methods[key];
			}
		}

		// maintain a copy of parent class into new child class
		Child.__super__ = Parent.prototype;

		child = new Child();

		if(typeof staticProps === 'object'){
			for(var key in staticProps){
				add.call(child, key, staticProps[key]);
			}
		}

		return child;
	}
	/**
	 * Add a property to current object
	 * @param {string} key   
	 * @param {object|string} value 
	 */
	function add(key, value){
		this.private[key] = value;
		
		Object.defineProperty(this, key, {
			get: function(){return this.private[key];},
			set: function(newVal){
				var event = new Event(key + ':change');
				console.log('The value has been changed from ' + this.private[key] + ' to ' +newVal);
				this.private[key] = newVal;
				document.dispatchEvent(event);
			},
			enumerable: true,
  			configurable: true
		})
	}

	/**
	 * Publisher Class
	 * Publisher is a data model.
	 * When Publisher detect a change in state it notify it all the Subscriber with Custom Javascript Event
	 */

	var pub = Chakmak.Publisher = function Publisher(){
		Object.defineProperty(this, 'private', {
			value: {},
			writable: true,
			enumerable: false,
			configurable: true
		})
	};

	// Publisher public method
	// Publisher prototype definition

	pub.prototype.addProperty = add;

	/**
	 * Subscriber Class
	 * Subscriber is a View Object.
	 * Subscriber will be subscribed to one or many Publisher.
	 * When an publisher notify a change in state subcriber will execute its render method to update the view
	 * 
	 */
	var sub = Chakmak.Subscriber = function Subscriber(){
		Object.defineProperty(this, 'private', {
			value: {},
			writable: true,
			enumerable: false,
			configurable: true
		})
	};

	// Subscriber public method
	// Subscriber prototype definition

	sub.prototype.subscribe = function(publisher, event){
		var _this = this;
		this.publisher = publisher;
		this.render();
		document.addEventListener(event, _this.render.bind(_this));
	}

	// Adding a static method to Pub and Sub classes
	// This will create a new instance of a class without calling end user new explicitly 
	Chakmak.Publisher.create = Chakmak.Subscriber.create = create;

}));
