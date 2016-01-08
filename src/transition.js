var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var TodoList = React.createClass({
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
				<li key={item} onClick={this.handleRemove.bind(this, i)}>
					{item}
				</li>
			);
		}.bind(this));

		var cs = React.addons.classSet,
			classes = cs('list', 'list-ul');
		return (
			<div>
        		<button onClick={this.handleAdd}>Add Item</button>
        		<br/>
				<ReactCSSTransitionGroup transitionName="example" component="ul" className={classes}>
					{items}
				</ReactCSSTransitionGroup>
			</div>
		);
	}
});

React.render(
	<TodoList></TodoList>,
	document.body
);