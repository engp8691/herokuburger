import React, {Component} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		const thisConfigKeys = Object.keys(this.props.ingredients);
		const nextConfigKeys = Object.keys(nextProps.ingredients);

		let isEqual = true;

		if(thisConfigKeys.length !== nextConfigKeys.length){
			isEqual = false;
		}else{
			nextConfigKeys.forEach((key)=>{
				if(this.props.ingredients[key] !== nextProps.ingredients[key]){
					isEqual = false;
				}
			})
		}

		return !isEqual;
	}

	render(){
		const ingredientSummary = Object.keys(this.props.ingredients).map((igKey, index)=>{
			return (<li key={igKey+index}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}</li>);
		});

		return(
			<>
				<h3>Your Order</h3>
				<p>A burger with the following ingredients</p>
				<ul>
					{ingredientSummary}
				</ul>
				<p><strong>Total price:</strong> ${this.props.totalPrice.toFixed(2)}</p>
				<p>Continue to checkout?</p>
				<Button clickHandler={this.props.cancelHandler} btnType='Danger'>CANCEL</Button>
				<Button clickHandler={this.props.continueHandler} btnType='Success'>CONTINUE</Button>
			</>
		);
	}
}

export default OrderSummary;

