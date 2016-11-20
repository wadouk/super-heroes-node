import {
  default as React,
  Component,
} from 'react';
import {heroes} from './repo';

export default class Heros extends Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: undefined,
      page: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      page: nextProps.args && parseInt(nextProps.args[2], 10) || 0,
      characters : undefined
    }, this.refreshData.bind(this))
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (this.state.page !== nextState.page) || !(this.state.page === nextState.page === 0);
  }

  refreshData() {
    heroes(this.state.page).then((results) => this.setState({characters: results}));
  }

  componentWillMount() {
    this.refreshData();
  }

  renderCharacters() {
    return (
      <div>
        <div>
          {this.state.page == 0 ? null : <a href={`##?page=${this.state.page - 1}`}>❰</a>}
          Page {this.state.page}
          <a href={`##?page=${this.state.page + 1}` }>❱</a>
        </div>
        <div>
          {this.state.characters.map(character => {
            return (<div key={character.id}>
                {character.image && <img src={character.image.tiny_url}/>}
                <a href={`##hero/${character.id}`}>{character.name} </a>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  render() {
    document.title = `Comic Vine : Heroes - page ${this.state.page}`;
    return (<div>{this.state.characters ? this.renderCharacters() : <div>loading</div>}</div>)
  }
}