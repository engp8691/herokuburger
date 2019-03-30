import * as actions from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	loading: false,
	error: false
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
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName]+1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			}
		case actions.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredientName]: state.ingredients[action.ingredientName]-1
				},
				totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
			}
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
				totalPrice: 4.0
			}
		case actions.FETCH_INGREDIENTS_STATUS:
			return {
				...state,
				loading: action.loading
			}
		case actions.FETCH_INGREDIENTS_FAILED:
			return {
				...state,
				error: action.error
			}
		default:
			return state;
	}
};

export default burgerBuilder;

