import React from "react";
import './Tile.css';

class Tile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.name,
            imagesrc: this.props.imagesrc,
            isSelected: this.props.isSelected
        };
    }

    onTrigger = (event) => {
        console.log('clicked ', this.props.name);
        this.props.parentCallback(this.props);
        event.preventDefault();
    }

    // shouldComponentUpdate(nextProps){
    //     console.log('update?', nextProps.isSelected !== this.state.isSelected);
    //     return nextProps.isSelected !== this.state.isSelected;
    // }

    // componentDidUpdate() {
    //     this.setState({
    //         name: this.props.name,
    //         imagesrc: this.props.imagesrc,
    //         isSelected: this.props.isSelected
    //     });
    // } 

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if(oldProps.isSelected !== newProps.isSelected) {
          this.setState({ isSelected: newProps.isSelected })
        }
    }

    // static getDerivedStateFromProps(props, current_state) {
    //     if (current_state.isSelected !== props.isSelected) {
    //       return {
    //         value: props.isSelected,
    //         computed_prop: heavy_computation(props.isSelected)
    //       }
    //     }
    //     return null
    // }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.isSelected !== this.state.isSelected) {
    //       this.setState({ isSelected: nextProps.isSelected });
    //     }
    // }

    render() {
        console.log('rendering ', this.props);
        return(
            <div className="tile__container">
                <div className="content" onClick={this.onTrigger}>
                    <img src={this.state.imagesrc}></img>
                    <div className={`tile__title ${(this.state.isSelected ? 'selected' : '')}`}>{this.state.name}</div>
                </div>
            </div>
        )
    }
}

export default Tile;
