import {default as React, Component} from 'react';

import {hero} from './repo';

function genderNum2String(gender) {
  try {
    return {1: "♂", 2: "♀"}[gender]
  } catch (e) {
    return "☄";
  }
}

export default class Hero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      character: undefined
    };
  }

  componentWillMount() {
    hero(this.props.args[1]).then((results) => {
      this.setState({character: results})
    })
  }

  static renderPowers(powers) {
    return (<div> <ol>{powers.map(power => {
      return (<li key={power.id}>{power.name}</li>)
    })} </ol></div>)
  }

  static renderHero(hero) {
    document.title = `Comic Vine : Hero : ${hero.name}`;
    return (<div>
      <div>{hero.real_name} also known as {hero.name}</div>
      <div style={{fontSize: "2em"}}>{genderNum2String(hero.gender)}</div>
      <div>From : {hero.origin.name}</div>
      <div>{hero.image && <img src={hero.image.screen_url}/>}</div>
      <div>{Hero.renderPowers(hero.powers)}</div>
    </div>)
  }

  render() {
    document.title = `Comic Vine : Hero : Loading`;
    return (<div><a href="#">Home</a>
      {this.state.character ? Hero.renderHero(this.state.character) : <div>loading</div>}
    </div>)
  }
}