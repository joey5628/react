/**
	Comment
		CommentList
			Comment
		CommentForm
*/	

/*var data = [
	{author: "zhangyi", text: "-This is one comment"},
	{author: "jiangli", text: "-This- is *author* comment"}
];
*/
var converter = new Showdown.converter();// makedown

var Comment = React.createClass({	//dangerouslySetInnerHTML 避免XSS攻击
	render: function(){
		var rawMarkup = converter.makeHtml(this.props.children.toString());
		return (
			<div className="comment">
				<h2 className="commentAuthor">
					{this.props.author}
				</h2>
				<span dangerouslySetInnerHTML={{__html: rawMarkup}}></span> 
			</div>
		);
	}
});

var CommentList = React.createClass({
	render: function(){
		var commentNodes = this.props.data.map(function(comment){
			return (
				<Comment author={comment.author}>
					{comment.text}
				</Comment>
			)
		});	
		return (
			<div className="commentList">
				{commentNodes}
			</div>
		);	
	}
});

var CommentForm = React.createClass({
	handleSubmit: function(e){
		e.preventDefault();
		var author = this.refs.author.getDOMNode().value.trim(),
			text = this.refs.text.getDOMNode().value.trim();

		if(!author || !text){
			return;
		}

		this.props.onCommentSubmit({author: author, text: text});
		this.refs.author.getDOMNode().value = '';
		this.refs.text.getDOMNode().value = '';
		return;
	},
	render: function(){
		return (
			<form className="commentForm" onSubmit={this.handleSubmit}>
				<input type="text" placeholder="Your name" ref="author"/>
				<input type="text" placeholder="Say something" ref="text"/>
				<input type="submit" value="Post"/>
			</form>
		);
	}
});


var CommentBox = React.createClass({
	loadCommentsFromServer: function(){
		$.ajax({
			url: this.props.url,
			dataType: 'json',
			success: function(data){
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err){
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	handleCommentSubmit: function(comment){
		var comments = this.state.data;
			newComments = comments.concat([comment]);
		this.setState({data: newComments});
	},
	getInitialState: function(){
		return {data: []}
	},
	componentWillMount: function(){
		console.log('componentWillMount----------'+this.isMounted());
	},
	componentDidMount: function(){
		console.log('componentDidMount----------'+this.isMounted());
		if(this.isMounted()){
			this.loadCommentsFromServer();
		}
		//setInterval(this.loadCommentsFromServer, this.props.pollInterval)
	},
	render: function(){
		return (
			<div className="commentBox">
				<h1>Comments</h1>
				<CommentList data={this.state.data}></CommentList>
				<CommentForm onCommentSubmit={this.handleCommentSubmit}></CommentForm>
			</div>
		);	
	}
});

React.render(
	<CommentBox url="src/comments.json" pollInterval={2000}/>,
	document.getElementById('container')
);/*


var TestInput = React.createClass({
	render: function(){
		return (
			<input type="text" value="111" placeholder="Your name"/>
		);
	}
});

React.render(
	<TestInput></TestInput>,
	document.getElementById('container2')
);*/