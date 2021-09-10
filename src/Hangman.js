import React, { Component } from "react";
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
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    maxGuesses: 0,
  };

  constructor(props) {
    super(props);
    this.state = {
      nWrong: 0,
      guessed: new Set(),
      answer: "apple",
    };

    /** handlers */
    this.handleGuess = this.handleGuess.bind(this);
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
      guessed: st.guessed.add(letter),
      // if state.answer.includes(letter) evaluates to true and add 0 to nWrong, else add 1
      nWrong: st.nWrong + (st.answer.includes(letter) ? 0 : 1),
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

  /** render: render game */
  render() {
    /** display number of wrong guesses */
    const wrongMsg = this.state.nWrong ? (
      <p className="Hangman-wrongCount">Wrong guesses: {this.state.nWrong}</p>
    ) : (
      ""
    );

    return (
      <div className="Hangman">
        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} />
        {wrongMsg}
        <p className="Hangman-word">{this.guessedWord()}</p>
        <p className="Hangman-btns">{this.generateButtons()}</p>
      </div>
    );
  }
}

export default Hangman;
