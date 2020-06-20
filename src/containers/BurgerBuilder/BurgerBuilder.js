import React, { Component } from 'react';
import Aux from '../../hoc/Auxiliary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axious-orders';
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meet : 1.3,
    bacon : 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad : 0,
            bacon : 0,  
            cheese : 0,
            meet : 0
        },
        totalPrice : 4,
        purchasable : false,
        order : false,
        loading : false
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;        
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients })
        this.updatePurchaseStateHandler(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        }
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;        
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients})
        this.updatePurchaseStateHandler(updatedIngredients);
    }

    updatePurchaseStateHandler = (ingredients) => {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);

        this.setState({purchasable : sum > 0});
    }

    purchaseHandler = () => {
        this.setState({order : true})
    }

    purchaseCancelHandler = () => {
        this.setState({order : false})
    }

    purchaseContinueHandler = () => {

        this.setState({loading : true})

        const order = {
            ingredient : this.state.ingredients,
            price : this.state.totalPrice,
            customer : {
                name : 'Chaitanya Deshpande',
                address: {
                    address : 'UTD',
                zipcode : '28262',
                country : 'USA',
                },
                email : 'cdeshpa2@gmail.com'
            },
            dileveryMethod : 'InHouse PickUp'
        }

        // user firebase here and axios
        axios.post('/orders.json', order)
                    .then(response => {
                        this.setState({loading : false, order : false})
                    })
                    .catch(error => {
                        this.setState({loading : false, order : false})
                    })
        
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients    
        }

        for(let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0;
        }

        // [salad : true, meat : false] kind of info
        let orderSummary = <OrderSummary 
                                ingredients = {this.state.ingredients} 
                                purchaseCanceledEvent = {this.purchaseCancelHandler}
                                purchaseContinueEvent = {this.purchaseContinueHandler}
                                price = {this.state.totalPrice} 
                            />

        if(this.state.loading){
            orderSummary = <Spinner />
        }

        return(
            <Aux>
                <Modal show = {this.state.order} modalClosed = {this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients = {this.state.ingredients} />
                <BuildControls 
                    ingredientAdded = {this.addIngredientsHandler}
                    ingredientDeducted = {this.removeIngredientsHandler}
                    purchasable = {this.state.purchasable}
                    disable = {disableInfo}
                    price = {this.state.totalPrice}
                    clicked = {this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;