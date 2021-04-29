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
        <div>
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
                  <a className="btn btn-warning ml-2" onClick={this.reset}>
                    Reset
                  </a>
                </div>
                {message !== "" && <p>{message}</p>}
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Yam Stat</h1>
          <Button onClick={this.handleClickYam}>Yam Game</Button>
        </div>
      );
    }
  }
}

class Lancers extends React.Component {
  render() {
    const { lancers } = this.props;
    return (
      <ul>
        {lancers.map((lancer, i) => (
          <li key={i}>{lancer}</li>
        ))}
      </ul>
    );
  }
}

export default Yam;
