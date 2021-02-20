import React from "react";
import Tile from './Tile/Tile';
import './Grid.css';

class Grid extends React.Component {

    constructor(props) {
        super(props);

        this.handleCallback = (tileData) =>{
            this.updateSelected(tileData);
            this.render();
        }

        this.tiles = [];
        this.selected = new Set();
        this.unSelected = new Set();
        this.generateTiles();
        this.reset();
    }

    generateTiles() {
        console.log('selected ', this.selected);
        this.tiles = this.props.data.map(villager => (
            <Tile parentCallback = {this.handleCallback} onClick={this.updateSelected} key={villager.name}
             name={villager.name} imagesrc={villager.url} isSelected={this.selected.has(villager.name)}/>
          ))
    }

    reset() {
        this.selected = new Set();
        this.unSelected = new Set(this.props.data.map(o => o.name));
    }

    updateSelected(tile) {
        const isSelected = this.selected.has(tile.name);
        if (isSelected) {
            this.selected.delete(tile.name);
            this.unSelected.add(tile.name);
        } else {
            this.selected.add(tile.name);
            this.unSelected.delete(tile.name);
        }
    }

    pick = (event) => {
        const return__data = {"selected": Array.from(this.selected), "unselected": Array.from(this.unSelected)}
        this.props.parentCallback(return__data);
        event.preventDefault();
    }

    componentDidUpdate(prevProps) {
        console.log('Grid Update');
        this.generateTiles();
        if(this.props.data != prevProps.data)
        {
          this.reset();
        }
    } 

    render() {
        console.log('Grid Rendering');
        console.log('Grid Data', this.props.data);
        this.generateTiles();
        console.log('Grid Tiles', this.tiles);
        return (
            <div className="grid">
                <div className="gridTiles">
                    {this.tiles}
                </div>
                <div className="controls">
                    <button className="pick" onClick={this.pick}>Pick</button>
                    <button className="undo">Undo</button>
                    {/* <button className="reset">Reset</button> */}
                </div>
            </div>
        );
    }
}

export default Grid;
