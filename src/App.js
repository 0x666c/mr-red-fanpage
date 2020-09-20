import React, { Component } from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AboutPage from "./AboutPage";
import "./App.css";
import ComicPage from "./ComicPage";
import TitlePage from "./TitlePage";

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			direction: "Left",
			pages: [],
			hideOverflow: false,
		};

		this.setDirection = this.setDirection.bind(this);
	}

	async componentDidMount() {
		const json = await fetch("https://www.reddit.com/r/HelloMrRed/search.json?restrict_sr=true&q=flair_name%3A%22Official%20Hello%20Mr%20Red%20Post%22").then((r) => r.json());
		if (json.error) {
			console.error("Request error", json);
			return;
		}
		// 1600224216 - date of the first post, we don't need it
		const postArray = json.data.children
			.filter((post) => post.data.created_utc !== 1600224216)
			.map((post) => {
				return {score: post.data.score, image: post.data.thumbnail, date: post.data.created_utc, title: post.data.title, link: `https://reddit.com${post.data.permalink}`};
			})
			.sort((a, b) => a.date - b.date);

		this.setState({pages: postArray});
	}

	setDirection(dir, callback = () => {}) {
		this.setState({direction: dir}, callback);
	}

	render() {
		return (
			<>
				<div id="page-shadow"></div>
				<HashRouter>
					<Route
						render={({location}) => {
							return (
								<TransitionGroup>
									<CSSTransition
										key={location.pathname}
										timeout={500}
										onEntered={() => {
											console.log("enter");
											this.setState({hideOverflow: false});
										}}
										onExiting={() => {
											console.log("exit");
											this.setState({hideOverflow: true});
										}}
										classNames={`pageSlider${this.state.direction}`}
										mountOnEnter={true}
										unmountOnExit={true}
									>
										<Switch location={location}>
											<Switch>
												<Route exact path="/">
													<TitlePage setDirection={this.setDirection}></TitlePage>
												</Route>
												<Route exact path="/comic">
													<ComicPage hideOverflow={this.state.hideOverflow} pages={this.state.pages} setDirection={this.setDirection}></ComicPage>
												</Route>
												<Route exact path="/about">
													<AboutPage entered={!this.state.hideOverflow} setDirection={this.setDirection}></AboutPage>
												</Route>
												<Route path="/*">
													<Redirect to="/"></Redirect>
												</Route>
											</Switch>
										</Switch>
									</CSSTransition>
								</TransitionGroup>
							);
						}}
					/>
				</HashRouter>
			</>
		);
	}
}
