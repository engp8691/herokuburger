import * as actions from '../actions/actionTypes';
import * as utilities from '../utility';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	loading: false,
	error: false,
	building: false
};

const INGREDIENT_PRICES={
	bacon: 0.6,
	cheese: 0.3,
	meat: 0.8,
	salad: 0.5
}

const burgerBuilder = (state=initialState, action) => {
	switch (action.type){
		case actions.ADD_INGREDIENT:
			let updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName]+1 };
			let updatedIngredients = utilities.updateObject( state.ingredients, updatedIngredient );
			let newState = {
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			};
			return {...state, ...newState, building: true};

		case actions.REMOVE_INGREDIENT:
			updatedIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName]-1 };
			updatedIngredients = utilities.updateObject( state.ingredients, updatedIngredient );
			newState = {
				ingredients: updatedIngredients,
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			};
			return {...state, ...newState, building: true};

		case actions.INIT_INGREDIENTS:
			let initPrice = 4.0;
			for (let ingr in action.ingredients) {
				if (action.ingredients.hasOwnProperty(ingr)) {
					initPrice += INGREDIENT_PRICES[ingr]*action.ingredients[ingr];
				}
			}

			return {
				...state,
				ingredients: action.ingredients,
				totalPrice: initPrice,
				building: false
			}
		case actions.FETCH_INGREDIENTS_STATUS:
			return {
				...state,
				loading: action.loading
			}
		case actions.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: action.error,
				building: false
			}
		default:
			return state;
	}
};

export default burgerBuilder;

