import React, {Component} from "react";
import {Link} from "react-router-dom";
import "./AboutPage.css";

export default class AboutPage extends Component {
	constructor() {
		super();

		const baseX = window.innerWidth / 1000;
		const baseY = window.innerHeight / 1000;

		this.state = {
			redCoords: {x: baseX, y: baseY * 150, scale: Math.random() / 4 + 1.8, rotation: Math.random() * 360},
			whiteCoords: {x: baseX * 320, y: baseY * 340, scale: Math.random() / 4 + 1.8, rotation: Math.random() * 360},
			cyanCoords: {x: baseX, y: baseY * 540, scale: Math.random() / 4 + 1.8, rotation: Math.random() * 360},
			blackCoords: {x: baseX * 320, y: baseY * 750, scale: Math.random() / 4 + 1.8, rotation: Math.random() * 360},

			popup: false,
			popupFor: "",
		};

		this.openPopup = this.openPopup.bind(this);
		this.closePopup = this.closePopup.bind(this);
		this.infoContent = this.infoContent.bind(this);
	}

	crewmate({onClick, name, coords}) {
		return (
			<img
				onClick={onClick}
				name={name}
				src={`${name}.png`}
				alt={name}
				style={{top: coords.y, left: coords.x, transform: `scale(${coords.scale}) rotate(${coords.rotation}deg)`}}
			></img>
		);
	}

	openPopup(ev) {
		if (!this.state.popup) this.setState({popup: true, popupFor: ev.target.name});
	}

	closePopup(ev) {
		console.log(123);
		if (this.state.popup) this.setState({popup: false, popupFor: ""});
	}

	infoContent({to, children, color, header}) {
		if (!this.state.popup || this.state.popupFor !== to) return null;
		return (
			<div className="info-panel-container">
				<div onClick={this.closePopup} className="close-button">
					x
				</div>
				<div className="info-panel-image-wrapper" style={{backgroundColor: color}}>
					<div className="info-panel-image">
						<img src={`${to}.png`} alt={to}></img>
					</div>
				</div>
				<div className="info-panel-text">
					<div className="info-panel-text-container">
						<div className="header">{header}</div>
						<div className="paragraph">{children}</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		const {redCoords, whiteCoords, cyanCoords, blackCoords} = this.state;
		return (
			<div id="about-page" className="page-container">
				<div id="flying-crewmates">
					<this.crewmate onClick={this.openPopup} name="mr_red" coords={redCoords}></this.crewmate>
					<this.crewmate onClick={this.openPopup} name="little_white" coords={whiteCoords}></this.crewmate>
					<this.crewmate onClick={this.openPopup} name="cy" coords={cyanCoords}></this.crewmate>
					<this.crewmate onClick={this.openPopup} name="onyx" coords={blackCoords}></this.crewmate>
				</div>
				<div id={`info-panel`} className={this.state.popup ? "active" : ""}>
					<this.infoContent color="red" to="mr_red" header="Mr. Red">
						¯\_(ツ)_/¯
					</this.infoContent>
					<this.infoContent color="#3011ba" to="little_white" header="Little White">
						<span>
							Little White is seen as nothing more than cute and naive. Even though that maybe mostlytrue, White has a fear that everyone you love will leave.
							Classmates were jerks, Mr White hadleft, and his mother is now a starin the sky.
						</span>
						<span>All vanished from existence without Little White saying goodbye.</span>
					</this.infoContent>
					<this.infoContent color="#ff9a1f" to="cy" header="Cy">
						<span>
							This is Cy, often confused for her siblings, Teal and Light Blue. She wants to win her parents' approval. but what's the point if your siblings are
							better than you?
						</span>
						<span>No one ever noticed her, it's like she's not even there. th Always getting the short end ofthe stick, because life is unfair.</span>
						<span>One day she sat alone, starting to cry, but Little White came up to her and said this to Cy:</span>
						<span>"You are one of a kind, a diamond in the rough. I know it'must really hard trying to prove you are enough.</span>
						<span>I like you for who you are, that's a guarantee. We'll become the greatest friends in all the galaxy.</span>
					</this.infoContent>
					<this.infoContent color="#831608" to="onyx" header="Onyx">
						<span>This is Onyx, a chaotic little bean. He says what's on his mind, but he's not trying to be mean.</span>
						<span>Onyx saw White being pushed around. Onyx shoved the people to the ground. And made sure Little White was safe and sound.</span>
						<span>Onyx is known for unintentionally scaring people away. When he sat with White at lunch that day, he was surprised White had decided to stay.</span>
					</this.infoContent>
				</div>
				<Link style={{display: !this.props.entered || this.state.popup ? "none" : "block"}} id="about-back" to="/">
					<button>Back</button>
				</Link>
			</div>
		);
	}
}
