import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder.js';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', ()=>{
	let wrapper = null;

	beforeEach(()=>{
		wrapper = shallow(<BurgerBuilder toInitIngredients={()=>{}} />);
	});

	it('Should render <BuildControls /> when receiving ingredients', ()=>{
		wrapper.setProps({ingredients: {salad: 1}, totalPrice: 4.0});

		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});


