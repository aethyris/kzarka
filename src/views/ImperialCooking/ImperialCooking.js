import React from 'react';
import './ImperialCooking.css';
import getImperialBonus from './masteryIncrease';

const commaNumber = require('comma-number');
const source = "https://kzarka-api.herokuapp.com";

class ImperialCooking extends React.Component {
  constructor(props) {
    super(props)

    const mastery = localStorage.getItem("mastery");
    const masteryValue = (mastery === null) ? 0 : mastery

    const contribution = localStorage.getItem("contribution");
    const contributionValue = (contribution === null) ? 100 : contribution

    const lowStockString = localStorage.getItem("lowStock");
    const lowStockValue = (lowStockString === 'true');

    const crateLevelsString = localStorage.getItem('crateLevels');
    let crateLevelsValue = {
      'guru': true,
      'master': true,
      'artisan': false,
      'professional': false,
      'skilled': false,
      'apprentice': false
    };
    if (crateLevelsString != null) crateLevelsValue = JSON.parse(crateLevelsString);
    
    this.state = {
      mastery: masteryValue,
      contribution: contributionValue,
      search: '',
      lowStock: lowStockValue,
      crateLevels: crateLevelsValue
    }
  }

  searchChange(event) {
    this.setState({
      search: event.target.value
    });
  }

  masteryChange(event) {
    this.setState({
      mastery: event.target.value
    })
    localStorage.setItem("mastery", event.target.value)
  }

  contributionChange(event) {
    this.setState({
      contribution: event.target.value
    })
    localStorage.setItem("contribution", event.target.value)
  }

  lowStockChange(event) {
    this.setState({
      lowStock: event.target.checked
    })
    localStorage.setItem("lowStock", event.target.checked);
  }

  crateLevelsChange(event) {
    let crateLevels = this.state.crateLevels
    crateLevels[event.target.name] = event.target.checked
    this.setState({
      crateLevels: crateLevels
    });
    localStorage.setItem("crateLevels", JSON.stringify(crateLevels));
  }

  render() {
    return (
      <div className='imperialcooking'>
        <div className="imperialcooking-right">
          <LevelInput
            mastery={this.state.mastery}
            contribution={this.state.contribution}
            masteryChange={this.masteryChange.bind(this)}
            contributionChange={this.contributionChange.bind(this)}
            />
          <StockInput
            lowStock={this.state.lowStock}
            lowStockChange={this.lowStockChange.bind(this)}
            />
          <CrateLevelInput
            crateLevels = {this.state.crateLevels}
            crateLevelsChange = {this.crateLevelsChange.bind(this)}
          />
        </div>
        <div className='imperialcooking-left'>
          <CrateSearch 
            input={this.state.search}
            searchChange={this.searchChange.bind(this)}
            />
          <CrateList
            mastery={this.state.mastery}
            contribution={this.state.contribution}
            lowStock={this.state.lowStock}
            search={this.state.search}
            crateLevels={this.state.crateLevels}
            />
        </div>
      </div>
    );
  }
}

class LevelInput extends React.Component {
  render() {
    return (
      <div className="levelinput">
        <div className="mastery">
          <label htmlFor="mastery-input">Cooking Mastery: </label>
          <input className="custom-input" id="mastery-input" value={this.props.mastery} onChange={this.props.masteryChange} placeholder="Cooking Mastery" type="number"/>
        </div>
        <div className="contribution">
          <label htmlFor="contribution-input">Contribution Points: </label>
          <input className="custom-input" id="contribution-input" value={this.props.contribution} onChange={this.props.contributionChange} placeholder="Contribution Points" type="number"/>
        </div>
      </div>
    )
  }
}

class StockInput extends React.Component {
  render() {
    return(
      <div className="stockinput">
        <input type="checkbox" name="stock-checkbox" id="stock-checkbox" checked={this.props.lowStock} onChange={this.props.lowStockChange} />
        <label htmlFor="stock-checkbox">Hide low stock</label>
      </div>
    )
  }
}

class CrateSearch extends React.Component {
  render() {
    return (
      <div className="cratesearch">
        <input className="custom-input" value={this.props.input} onChange={this.props.searchChange} placeholder="Search"/>
      </div>
    );
  }
}

class CrateLevelInput extends React.Component {
  render() {
    return (
      <div className="cratelevelinput">
        <div className="cratelevel">
          <input type="checkbox" name="guru" id="guru-level" checked={this.props.crateLevels['guru']} onChange={this.props.crateLevelsChange}/>
          <label htmlFor="guru-level" className="guru">Guru</label>
        </div>
        <div className="cratelevel">
          <input type="checkbox" name="master" id="master-level" checked={this.props.crateLevels['master']} onChange={this.props.crateLevelsChange} />
          <label htmlFor="master-level" className="master">Master</label>
        </div>
        <div className="cratelevel">
          <input type="checkbox" name="artisan" id="artisan-level" checked={this.props.crateLevels['artisan']} onChange={this.props.crateLevelsChange} />
          <label htmlFor="artisan-level" className="guru">Artisan</label>
        </div>
        <div className="cratelevel">
          <input type="checkbox" name="professional" id="professional-level" checked={this.props.crateLevels['professional']} onChange={this.props.crateLevelsChange} />
          <label htmlFor="professional-level" className="professional">Professional</label>
        </div>
        <div className="cratelevel">
          <input type="checkbox" name="skilled" id="skilled-level" checked={this.props.crateLevels['skilled']} onChange={this.props.crateLevelsChange} />
          <label htmlFor="skilled-level" className="skilled">Skilled</label>
        </div>
        <div className="cratelevel">
          <input type="checkbox" name="apprentice" id="apprentice-level" checked={this.props.crateLevels['apprentice']} onChange={this.props.crateLevelsChange} />
          <label htmlFor="apprentice-level" className="apprentice">Apprentice</label>
        </div>
      </div>
    )
  }
}

class CrateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crateData: [],
      currentOrder: true
    }
  }

  async componentDidMount() {
    const region = 'na' // can technically be anything
    const response = await fetch(`${source}/${region}/imperialcooking`);
    let json = await response.json();
    this.setState({ crateData: json });
  }

  updateCrateValues() {
    const boxes = Math.floor(this.props.contribution / 2);
    const masteryIncrease = getImperialBonus(this.props.mastery);

    const data = [...this.state.crateData];
    data.forEach(crate => {
      const requiredMaterials = crate.required * boxes; 
      const boxProfit = (crate.profit/2.5*masteryIncrease + crate.profit) - (crate.required * crate.cost); // profit per imperial crate
      const totalProfit = Math.round(boxProfit * boxes); // profit from turning in all crates
      const profitColor = (totalProfit > 0) ? 'green' : 'red'; // changes profit number color
      crate.materials = requiredMaterials;
      crate.profitColor = profitColor;
      crate.totalProfit = totalProfit;
    })
    return data;
  }

  compare(key, order) {
    let reverse = order ? 1: -1;
    return function (a, b) {
      if (a[key] < b[key]) return -1 * reverse;
      if (a[key] > b[key]) return 1 * reverse;
      return 0;
    };
  }

  sortBy(key) {
    let order = this.state.currentOrder
    const data = [...this.state.crateData]
    data.sort(this.compare(key, order));
    this.setState({ crateData: data, currentOrder: !order });
  }

  render() {
    let crates = this.updateCrateValues();
    const search = this.props.search.toLowerCase()
    if (search !== '') {
      crates = crates.filter(crate => crate.name.toLowerCase().includes(search))
    }
    if (this.props.lowStock) {
      crates = crates.filter(crate => crate.stock > crate.materials);
    }

    const crateLevelsToShow = Object.keys(this.props.crateLevels).filter(level => this.props.crateLevels[level]);
    crates = crates.filter(crate => crateLevelsToShow.includes(crate.cratelevel))

    return (
      <div className="cratelist">
        <table className="cratetable custom-table">
          <thead>
            <tr>
              <th onClick={() => this.sortBy('cratelevel')}>Level</th>
              <th onClick={() => this.sortBy('name')}>Name</th>
              <th onClick={() => this.sortBy('materials')}>Meals</th>
              <th onClick={() => this.sortBy('cost')}>Price</th>
              <th onClick={() => this.sortBy('stock')}>Stock</th>
              <th onClick={() => this.sortBy('totalProfit')}>Profit</th>
            </tr>
          </thead>
          <tbody>
            {crates.map(crate => (
              <tr id={crate.id} key={crate.id}>
                <td className={crate.cratelevel} style={{textTransform: "capitalize"}}>{crate.cratelevel}</td>
                <td><span className={crate.rarity}>{crate.name}</span> x{crate.required}</td>
                <td>{commaNumber(crate.materials)}</td>
                <td>{commaNumber(crate.cost)}</td>
                <td>{commaNumber(crate.stock)}</td>
                <td style={{color: crate.profitColor}}>{commaNumber(crate.totalProfit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default ImperialCooking;