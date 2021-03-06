import React, {Component} from 'react';

import Aux from '../../hoc/Auxiliarily/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  purchaseHandler = () => {                       // If tied to an event, this will not be bound to a class
    this.setState({purchasing: true});
  };

  purchaseCancelHandler = () => {
    this.setState({purchasing: false});
  };

  purchaseContinueHandler = () => {

  };

  updatePurchasable (ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        console.log('[BurgerBuilder.js]', igKey);
        console.log('[BurgerBuilder.js]', ingredients[igKey]);
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        console.log('[BurgerBuilder.js]', sum + el);
        return sum + el;
      }, 0);
    this.setState({purchasable: sum > 0});
    console.log('[BurgerBuilder.js]', this.state.purchasable);
  };

  addIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };

    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
    this.updatePurchasable(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const oldCount = this.state.ingredients[type];
    if(oldCount >= 0) {
      const updatedCount = oldCount - 1;
      const updatedIngredients = {
          ...this.state.ingredients
      };

      updatedIngredients[type] = updatedCount;
      const priceAddition = INGREDIENT_PRICES[type] * (-1);
      const oldPrice = this.state.totalPrice;
      const newPrice = oldPrice + priceAddition;
      this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
      this.updatePurchasable(updatedIngredients);
    }
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
      console.log(disabledInfo[key]);
    }

    return (
      <Aux>
        <Modal show={this.state.purchasing}
               modalClosed={this.purchaseCancelHandler}
        >
          <OrderSummary
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              purchaseCancelled={this.purchaseCancelHandler}
              purchaseContinued={this.purchaseContinueHandler}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls disabled={disabledInfo}
                       ingredientAdded={this.addIngredientHandler}
                       ingredientRemoved={this.removeIngredientHandler}
                       ordered={this.purchaseHandler}
                       purchasable={this.state.purchasable}
                       price={this.state.totalPrice}
        />
      </Aux>
    );
  }
}

export default BurgerBuilder;
