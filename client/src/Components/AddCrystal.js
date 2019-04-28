import React, { Component } from 'react';
import AddCrystalCard from './AddCrystalCard';

class CreateCrystal extends Component {
		state = {
			name: "",
			region: "",
			colour: "",
			chakra: "",
			crystals: [],

		}

		handleChange = (event) => {
			this.setState({
				[event.target.name]: event.target.value
			});
		}
		// if you want to use await you must state async
		// user action not like Component did mount ()
		// POST --> include body
		// GET --> include query string

		createCrystal = () => {
			const newCrystal = {
					name: this.state.name,
			 		region: this.state.region,
			 		colour: this.state.colour,
					chakra: this.state.chakra
			 };
			fetch('/api/crystals', {
				method: 'POST',
				body: JSON.stringify(newCrystal),
				headers: {
					'content-type': 'application/json',
				}
			}).then((res) => {
				console.log(res);
				//crystalAdded()
				//getCrystals()
			})

		}

		render() {
				return (
					<>

						<form action="">
							<input type="text" name="name" placeholder="name" value={this.state.name} onChange={this.handleChange}/>
  						<input type="text" name="region" placeholder="region" value={this.state.region} onChange={this.handleChange}/>
							<input type="text" name="colour" placeholder="colour" value={this.state.colour} onChange={this.handleChange}/>
							<select name="chakra" placeholder="chakra" value={this.state.chakra} onChange={this.handleChange}>
								<option value="root">root</option>
								<option value="sacral">sacral</option>
								<option value="heart">heart</option>
								<option value="throat">throat</option>
								<option value="thirdeye">third eye</option>
								<option value="crown">crown</option>
							</select>
						</form>
						<button onClick={this.createCrystal}>Create Crystal</button>
					</>
				);
		}
}

export default CreateCrystal;
