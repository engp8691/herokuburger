import * as actions from './actionTypes';
import axiosinstance from '../../axios-orders';

export const addIngredient = (name) => {
	return {
		type: actions.ADD_INGREDIENT,
		ingredientName: name
	}
}

export const removeIngredient = (name) => {
	return {
		type: actions.REMOVE_INGREDIENT,
		ingredientName: name
	}
};

export const setLoading = (loading)=>{
	return {
		type: actions.FETCH_INGREDIENTS_STATUS,
		loading: loading
	}
};

export const setError   = (error)=>{
	return {
		type: actions.FETCH_INGREDIENTS_FAILED,
		error: error 
	}
};

export const setIngredients = (ingredients) => {
	return {
		type: actions.INIT_INGREDIENTS,
		ingredients: ingredients
	}
};

export const initIngredient = () => {
	return (dispatch) => {
		dispatch(setLoading(true));

		axiosinstance.get('/ingredients.json').then(
			response=>{
				dispatch(setIngredients(response.data));
				dispatch(setLoading(false));
				dispatch(setError(false));
			}).catch(err=>{
				dispatch(setIngredients(null));
				dispatch(setLoading(false));
				dispatch(setError(err));
			});
	};
}

