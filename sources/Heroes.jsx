import {
  default as React,
  Component,
} from 'react';
import {heros} from './repo';

export default class Heros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: undefined,
      page: 0,
      offset: 10,
    }
  }

  refreshData() {
    heros(this.state.page).then((results) => this.setState({characters: results}));
  }

  componentWillMount() {
    this.refreshData();
  }

  renderCharacters() {
    return (
      <div>
        <div>
          {this.state.characters.map(character => {
            return (<div key={character.id}>
                {character.image && <img src={character.image.tiny_url}/>}
                {character.name}
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    document.title = `Comic Vine : Heros`;
    return (<div>{this.state.characters ? this.renderCharacters() : <div>loading</div>}</div>)
  }
}