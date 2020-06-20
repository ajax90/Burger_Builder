import React from 'react';
import classes from './BuildContols.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    { label : 'Salad', type : 'salad'},
    { label : 'Bacon', type : 'bacon'},
    { label : 'Meet', type : 'meet'},
    { label : 'Cheese', type : 'cheese'}
]

const buildControls = ( props ) => {

    return(
        <div className = {classes.BuildControls}>
            <p> Current Price : <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => (
                <BuildControl 
                    key = {ctrl.label} 
                    label = {ctrl.label} 
                    added = {() => props.ingredientAdded(ctrl.type)}
                    removed = {() => props.ingredientDeducted(ctrl.type)}
                    disabled = {props.disable[ctrl.type]}
                />
            ))}
            <button 
                className = {classes.OrderButton}
                disabled = {!props.purchasable}
                onClick = {props.clicked}
            > 
            ORDER NOW 
            </button>
        </div>
    );
}

export default buildControls;