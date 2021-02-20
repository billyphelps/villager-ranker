import React from "react";
import './Ranking.css';

class Ranking extends React.Component {

    constructor(props) {
        super(props);
        this.imagesrc = this.props.imagesrc;
        this.text = this.props.text;
    }

    render() {
        return (
            <div className="ranking">
                <div className="ranking__image">
                    <img src={this.imagesrc}></img>
                </div>
                <div class="ranking__text">{this.text}</div>
            </div>
        )
    }
}

export default Ranking;
