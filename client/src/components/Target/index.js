import React, { PureComponent } from "react";
import { DropTarget } from "react-dnd";
import PropTypes from 'prop-types';
import Item from "../Item";

const Types = {
    ITEM: "portion"
};

const dropTarget = {
    drop(props, monitor) {
        const item = monitor.getItem().id;
        const meal = props.meal;
        return props.handleDrop(item, meal)
    }
}

function collect(connect) {
    return {
        connectDropTarget: connect.dropTarget(),
    }
}

class Target extends PureComponent {

    constructor(props) {
        super(props);
        this.handleClick = this.props.handleClick.bind(this);
    }

    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        // isOver: PropTypes.bool.isRequired,
        // canDrop: PropTypes.bool.isRequired,
    }

    render() {

        const { connectDropTarget } = this.props;

        const portions = this.props.portions.map((portion, index) => {
            return <Item
                src={portion.src}
                showDelete={true}
                size={portion.size}
                type={portion.type}
                id={portion.id}
                meal={this.props.meal}
                key={"item-" + portion.id}
                handleClick={this.handleClick}
            />
        });

        return connectDropTarget(
            <div key={"meal-" + this.props.meal} style={{ "height": "100px", "width": "400px", "border": "1px solid lightgrey", "borderRadius": "7px", "margin": "5px" }}>
                <div style={{ "borderBottom": "1px solid lightgrey", "color": "grey" }}>
                    {this.props.meal}
                </div>
                {portions}
            </div>

        )
    }
}

export default DropTarget(Types.ITEM, dropTarget, collect)(Target);