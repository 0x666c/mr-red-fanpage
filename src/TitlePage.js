import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./TitlePage.css";

class TitlePage extends Component {
	render() {
		return (
			<div id="title-page" className="page-container">
				<img id="mr-red" src="cover.png" alt="cover"></img>
				<div id="title_buttons">
					<button
						onClick={(ev) => {
							ev.preventDefault();
							this.props.setDirection("Left", () => this.props.history.push("/comic"));
						}}
					>
						Comic
					</button>
					<button
						onClick={(ev) => {
							ev.preventDefault();
							this.props.setDirection("Down", () => {
								this.props.history.push("/about");
							});
						}}
					>
						About
					</button>
				</div>
			</div>
		);
	}
}

export default withRouter(TitlePage);
