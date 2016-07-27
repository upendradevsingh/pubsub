# pubsub
A small JavaScript PubSub Framework.

##Usage

### AMD

define(['Chakmak'], function(Chakmak){
	
});


### commonjs

var Chakmak = require('chakmak').Chakmak;

### Browser default

<script type="text/javascript" src="chakmak.min.js"></script>


## Create a Publisher 

var pub1 = Chakmak.Publisher.create();

var pub2 = Chakmak.Publisher.create(
	{
		name: 'foo'
	},
	{
		displayName: function(){
			return this.name;
		}
	}
);

Add a new property to Publisher

pub2.addProperty('cart', [
	{
		name: 'item1',
		price: 100
	},
	{
		name: 'item2',
		price: 200
	}
]);

## Create a Subscriber

var sub1 = Chakmak.Publisher.create(
	{
		template: document.getElementById('content')
	},
	{
		render: function(){

			this.template.innerHTML = this.publisher.name || '';
		}
	}
); 
// Subscribing to the publisher and an its change event
sub1.subscribe(pub1, 'name:change')




