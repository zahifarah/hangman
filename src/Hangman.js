import React, { Component } from "react";
import { randomWord } from "./words";
import "./Hangman.css";
import img0 from "./images/0.jpg";
import img1 from "./images/1.jpg";
import img2 from "./images/2.jpg";
import img3 from "./images/3.jpg";
import img4 from "./images/4.jpg";
import img5 from "./images/5.jpg";
import img6 from "./images/6.jpg";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 2,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    };
    /** handlers */
    this.handleGuess = this.handleGuess.bind(this);
    this.restart = this.restart.bind(this);
  }

  /** restart game */
  restart() {
    this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord(),
    });
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(letter => (this.state.guessed.has(letter) ? letter : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let letter = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(letter), // add guessed letter to guessed Set
      nWrong: st.nWrong + (st.answer.includes(letter) ? 0 : 1), // wrong answer means +1 to nWrong
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(letter => (
      <button
        key={letter}
        value={letter}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(letter)}>
        {letter}
      </button>
    ));
  }

  /** render: render-game */
  render() {
    const gameOver = this.state.nWrong >= this.props.maxWrong;
    const wrongOverMaxWrong = `${this.state.nWrong}/${this.props.maxWrong}`;

    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${wrongOverMaxWrong} guesses`}
        />

        <p className="Hangman-wrongCount">Wrong guesses: {wrongOverMaxWrong}</p>

        <p className="Hangman-word">
          {!gameOver ? this.guessedWord() : this.state.answer}
        </p>

        <p className="Hangman-btns">
          {!gameOver ? this.generateButtons() : `You lose!`}
        </p>

        <button id="reset" onClick={this.restart}>
          Restart
        </button>
      </div>
    );
  }
}

export default Hangman;
