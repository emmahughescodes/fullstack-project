import React, { Component } from "react";
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class AddCrystalCard extends Component {

		render() {
				return (
					<>
						<button className="crystalCard">
							 <FontAwesomeIcon icon={faPlusSquare} />
							 <h3>Add a crystal to your collection</h3>
						</button>
					</>
				);
		}
}

export default AddCrystalCard;
