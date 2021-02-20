import React from "react";
import {VILLAGERS} from '../data/villagers'
import Grid from '../component/Grid/Grid';
import Rankings from "../component/Rankings/Rankings";
import './App.css';

class App extends React.Component {

  updateStateProperty(property, value) {
    const new__state = this.state;
    new__state[property] = value;
    this.setState(new__state);
  }

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      uneliminated: VILLAGERS,
      selection: [],
      rankedFavorites: [],
      eliminations: {},
      nodes: new Set(),
    }

    this.gridCallback = (selectionData) =>{
      this.processGridData(selectionData);
      this.generateNextSelection();
    }
  }

  generateNextSelection() {
    var selection = this.state.uneliminated;
    if (selection.length > 15) {
      selection = selection.slice(0,15)
    }

    console.log('Next Selection', selection);
    this.updateStateProperty('selection', selection);
    this.render();
  }

  processGridData(data) {
    var eliminations__update = this.state.eliminations;

    data.selected.forEach(function(name) {
      if (eliminations__update.hasOwnProperty(name)) {
        eliminations__update[name] = eliminations__update[name].concat(data.unselected);
      } else {
        eliminations__update[name] = data.unselected;
      }
    })

    // remove data.unselected from uneliminated
    var uneliminated = this.state.uneliminated;
    console.log('Tiles not selected', data.unselected);
    uneliminated = uneliminated.filter(function(item) {
      return !data.unselected.includes(item.name);
    });
    console.log('Eliminations', eliminations__update);
    console.log('Uneliminated', uneliminated);

    this.updateStateProperty('eliminations', eliminations__update);
    this.updateStateProperty('uneliminated', uneliminated);
  }

  componentDidMount() {
    this.generateNextSelection();
    this.setState({
      error: null,
      isLoaded: true,
      items: []
    });
  }

  render() {
    console.log('App Rendering');
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      if(this.state.selection) {
        this.rankings = <Rankings key={this.state.rankedFavorites} data={this.state.rankedFavorites}></Rankings>
      }
      console.log('Selection For Grid', this.state.selection);
      this.grid = <Grid parentCallback = {this.gridCallback} data={this.state.selection}></Grid>

      return (
        <div className="App">
            {this.grid}
            {this.rankings}            
        </div>
      );
    }
  }
}

export default App;