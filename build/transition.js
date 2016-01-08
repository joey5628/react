var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({displayName: "TodoList",
	getInitialState: function(){
		return {items: ['aaa', 'bbb', 'ccc']}
	},
	handleAdd: function(){
		var newItems = this.state.items.concat([prompt('Enter some text')]);
		this.setState({items: newItems});
	},
	handleRemove: function(i){
		var newItems = this.state.items;
		newItems.splice(i, 1);
		this.setState({items: newItems});
	},
	render: function(){
		var items = this.state.items.map(function(item, i){
			return (
				React.createElement("li", {key: item, onClick: this.handleRemove.bind(this, i)}, 
					item
				)
			);
		}.bind(this));

		var cs = React.addons.classSet,
			classes = cs('list', 'list-ul');
		return (
			React.createElement("div", null, 
        		React.createElement("button", {onClick: this.handleAdd}, "Add Item"), 
        		React.createElement("br", null), 
				React.createElement(ReactCSSTransitionGroup, {transitionName: "example", component: "ul", className: classes}, 
					items
				)
			)
		);
	}
});

React.render(
	React.createElement(TodoList, null),
	document.body
);