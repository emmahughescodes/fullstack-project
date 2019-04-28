import React, { Component } from "react";
import AddCrystalCard from './AddCrystalCard';
import { withRouter } from "react-router-dom";

class MyCrystals extends Component {
		constructor(props) {
				super(props);
				this.state = {}
		}

		async componentDidMount() {
			console.log("test", this.props.match.params.userId);
			try {
				const fetchOptions = {
					method: 'GET',
					headers: {
						'content-type': 'application/json',
						'Authorization': `${this.props.match.params.userId}`
					},
				}
				const fetchURL = '/api/crystals';
				const response = await fetch(fetchURL, fetchOptions);
				console.log(response, "resp!");
			}
			catch (e) {
				console.log(e);
			}
		}

		render() {
				return (
					<>
					{/* Retrieve all the crystals the user has created, if any. */}
					{ <AddCrystalCard /> }
					</>
				);
		}
}

export default MyCrystals;
