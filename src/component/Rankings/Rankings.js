import React from "react";
import Ranking from "./Ranking/Ranking"
import './Rankings.css';

class Rankings extends React.Component {

    constructor(props) {
        super(props);
        this.data = this.props.data;
        this.state = {
            rankings: []
        }
    }

    render() {
        var position = 1;
        var ranking__data = this.data.map(item => (
            <Ranking text={'#' + position++ + ': ' + item.name} imagesrc={item.imagesrc}/>
        ))

        return (
            <div className="rankings">
                {ranking__data}
            </div>
        );
    }
}

export default Rankings;
