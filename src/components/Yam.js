import React from "react";
import { Button } from "react-bootstrap";

const min = 1;
const max = 6;

class Yam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      lancers: JSON.parse(localStorage.getItem("data")) || [],
      message: "",
      pageYam: true,
      pageStat: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClickStat = this.handleClickStat.bind(this);
    this.handleClickYam = this.handleClickYam.bind(this);
    this.reset = this.reset.bind(this);
  }

  lance_des = () => {
    const { lancers } = this.state;
    let lancer = [];
    for (let i = 0; i < 5; i++) {
      let des = Math.floor(Math.random() * (max - min + 1)) + min;
      lancer.push(des);
    }
    lancers.push(lancer);
    localStorage.setItem("data", JSON.stringify(lancers));
    this.setState({
      lancers: lancers,
    });
  };

  handleChange(event) {
    const { value } = event.target;

    this.setState({ value: parseInt(value), message: "" });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { value: nb_lance } = this.state;
    if (!isNaN(parseInt(nb_lance)) && parseInt(nb_lance) <= 0) {
      return this.setState({
        message: "Choisir un nombre positif différent de 0",
      });
    }
    for (let i = 0; i < parseInt(nb_lance); i++) {
      this.lance_des();
    }
  }

  handleClickYam() {
    this.setState({ pageYam: true });
  }

  handleClickStat() {
    this.setState({ pageYam: false });
  }

  reset() {
    localStorage.setItem("data", []);
    this.setState({
      lancers: [],
    });
  }

  render() {
    const { lancers, message, pageYam } = this.state;
    if (pageYam) {
      return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="input-group">
                <h1>Yam Game</h1>
                <Button onClick={this.handleClickStat}>Yam Stat</Button>
              </div>

              <div>{lancers.length > 0 && <Lancers lancers={lancers} />}</div>
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div className="mb-3 d-inline">
                    <label htmlFor="name" className="form-label">
                      Nombre de lancers
                    </label>
                    <div className="input-group">
                      <Button className="mr-2" type="submit">
                        Lancer
                      </Button>
                      <div className="form-outline">
                        <input
                          type="number"
                          className="form-control"
                          id="nb_lance"
                          min="1"
                          onChange={this.handleChange}
                        />
                      </div>
                      <button
                        className="btn btn-warning ml-2"
                        onClick={this.reset}
                        type="none"
                      >
                        Reset
                      </button>
                    </div>
                    {message !== "" && <p>{message}</p>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="container-fluid">
          <h1>Yam Stat</h1>
          <Button onClick={this.handleClickYam}>Yam Game</Button>
          <Stat />
        </div>
      );
    }
  }
}

class Lancers extends React.Component {
  render() {
    const { lancers } = this.props;
    const dices = {
      1: "one",
      2: "two",
      3: "three",
      4: "four",
      5: "five",
      6: "six",
    };
    return (
      <div className="row">
        <ul className="list-unstyled row">
          {lancers.map((numbers, index) => {
            numbers.sort();
            return (
              <li className="col-3" key={index}>
                {numbers.map((number, index) => {
                  return (
                    <i key={index} class={`fas fa-dice-${dices[number]}`}></i>
                  );
                })}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

class Stat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      brelan: 0,
      carre: 0,
      doubles: 0,
      yam: 0,
    };
  }

  componentDidMount() {
    this.checkPairs();
  }

  checkPairs() {
    const data = JSON.parse(localStorage.getItem("data"));
    let result = { brelan: 0, carre: 0, doubles: 0, yam: 0 };
    for (let array of data) {
      array.sort();
      let désdoubles = 1;
      let doubles = [];
      for (let i = 1; i < array.length + 1; i++) {
        if (array[i] === array[i - 1]) {
          désdoubles++;
          doubles.push(array[i]);
          doubles.push(array[i - 1]);
        }
      }
      if (désdoubles === 3) {
        if (doubles[1] === doubles[2]) {
          result.brelan++;
        } else {
          result.doubles++;
        }
      } else if (désdoubles === 4) {
        result.carre++;
      } else if (désdoubles === 5) {
        result.yam++;
      }
    }

    this.setState({
      brelan: result.brelan,
      carre: result.carre,
      doubles: result.doubles,
      yam: result.yam,
    });
  }

  render() {
    return (
      // eslint-disable-next-line react/style-prop-object
      <div>
        <ul className="list-unstyled">
          <li>Brelan : {this.state.brelan}</li>
          <li>Carré : {this.state.carre}</li>
          <li>Double paire : {this.state.doubles}</li>
          <li>Yam : {this.state.yam}</li>
        </ul>
      </div>
    );
  }
}

export default Yam;
