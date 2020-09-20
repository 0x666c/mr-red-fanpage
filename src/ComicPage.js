import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./ComicPage.css";

export default class ComicPage extends Component {
	constructor() {
		super();
		this.state = {
			reachedBottom: false,
		};
		this.comicPageRef = React.createRef();

		this.scrollHandler = this.scrollHandler.bind(this);
	}

	tile({image, link, children, score}) {
		return (
			<a href={link} className="comic-tile">
				<img alt={children} src={image}></img>
				<div className="image-label">{children}</div>
				<div className="upvote-container">
					<img className="upvote-arrow" src="upvote.svg" alt="up"></img>
					<span className="upvotes">{score}</span>
				</div>
			</a>
		);
	}
	row({children}) {
		return <div className="comic-row">{children.filter((v, i) => i < 2)}</div>;
	}

	renderTiles() {
		const pages = this.props.pages;
		const final = [];
		for (let i = 0; i < pages.length; i += 2) {
			final.push(
				<this.row key={i}>
					<this.tile {...pages[i]}>{pages[i].title}</this.tile>
					{pages[i + 1] && <this.tile {...pages[i + 1]}>{pages[i + 1].title}</this.tile>}
				</this.row>
			);
		}
		return final;
	}

	scrollHandler() {
		const cp = this.comicPageRef.current;
		const threshold = 240;
		// console.log(cp.scrollTop + threshold, cp.scrollHeight - window.screen.height);
		if (cp.scrollTop + threshold >= cp.scrollHeight - window.screen.height && !this.state.reachedBottom) {
			this.setState({reachedBottom: true});
		} else if (!(cp.scrollTop + threshold >= cp.scrollHeight - window.screen.height) && this.state.reachedBottom) {
			// Prevent unnecessary setState
			this.setState({reachedBottom: false});
		}
	}

	componentDidMount() {
		this.scrollHandler();
	}

	render() {
		return (
			// style={{display: this.props.hideOverflow ? "none" : "block"}}
			<div ref={this.comicPageRef} onScroll={this.scrollHandler} id="comic-page" className="page-container">
				<div className="comic-page-center">{this.renderTiles()}</div>
				<Link style={{display: this.props.hideOverflow ? "none" : "block"}} id="comic-back" to="/">
					<button>Back</button>
				</Link>
				<div
					style={{opacity: this.props.hideOverflow || this.state.reachedBottom ? "0" : "1", pointerEvents: this.props.hideOverflow || this.state.reachedBottom ? "none" : "auto"}}
					id="comic-more"
				>
					<img onClick={() => {
						this.comicPageRef.current.scrollTo({top: this.comicPageRef.current.scrollHeight, left: 0, behavior: "smooth"});
					}} src="arrow_down.svg" alt="more below"></img>
				</div>
			</div>
		);
	}
}
