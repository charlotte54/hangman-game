import React, { useState } from 'react';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { wordList } from './words';
import state1 from './images/state1.GIF';
import state2 from './images/state2.GIF';
import state3 from './images/state3.GIF';
import state4 from './images/state4.GIF';
import state5 from './images/state5.GIF';
import state6 from './images/state6.GIF';
import state7 from './images/state7.GIF';
import state8 from './images/state8.GIF';
import state9 from './images/state9.GIF';
import state10 from './images/state10.gif';
import state11 from './images/state11.GIF';

// Select a random word from the word list
const randomWord = wordList[Math.floor(Math.random() * wordList.length)];

const Hangman = () => {
  const [word, setWord] = useState(randomWord);
  const [incorrectGuesses, setIncorrectGuesses] = useState([]);
  const [correctGuesses, setCorrectGuesses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  console.log(word);

  // Handle letter guessed by the user
  const handleGuess = (e) => {
    // Check if the guessed letter is in the word
    const letter = e.target.value;
    if (word.includes(letter)) {
      // Add the letter to correct guesses
      setCorrectGuesses((prevGuesses) => [...prevGuesses, letter]);
    } else {
      // Add the letter to incorrect guesses
      setIncorrectGuesses((prevGuesses) => [...prevGuesses, letter]);
    }
    // Check if the number of incorrect guesses is greater than or equal to 6
    setGameOver(incorrectGuesses.length >= 9);
  };

  // Check if the user has won the game
  React.useEffect(() => {
    setGameWon(
      // Check if every letter in the word is included in the correct guesses
      word.split('').every((letter) => correctGuesses.includes(letter))
    );
  }, [word, correctGuesses]);

  // Reset the game
  const handleRestart = () => {
    setWord(randomWord);
    setIncorrectGuesses([]);
    setCorrectGuesses([]);
    setGameOver(false);
    setGameWon(false);
  };

  // Hangman Image
  const hangmanImage = () => {
    if (incorrectGuesses.length <= 9) {
      switch (incorrectGuesses.length) {
        case 1:
          return state2;
        case 2:
          return state3;
        case 3:
          return state4;
        case 4:
          return state5;
        case 5:
          return state6;
        case 6:
          return state7;
        case 7:
          return state8;
        case 8:
          return state9;
        case 9:
          return state10;
        case 10:
          return state11;
        default:
          return state1;
      }
    } else {
      return state11;
    }
  };

  return (
    <Container className="mt-5">
      <h1>Handman Game</h1>
      <Row>
        <Col xs={12}>
          <img src={hangmanImage()} alt="Hangman" width="200" height="200" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          {word
            .split('')
            .map((letter) => (correctGuesses.includes(letter) ? letter : '_ '))}
        </Col>
      </Row>
      <Row>
        <Col xs={12} className="mt-2">
          {Array.from(Array(26).keys()).map((letter) => (
            <Button
              key={letter}
              value={String.fromCharCode(letter + 97)}
              onClick={handleGuess}
              disabled={
                //   Disable clicked letteres
                incorrectGuesses.includes(String.fromCharCode(letter + 97)) ||
                correctGuesses.includes(String.fromCharCode(letter + 97)) ||
                // Disable after game over
                incorrectGuesses.length > 9
              }
            >
              {String.fromCharCode(letter + 65)}
            </Button>
          ))}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs={12}>Incorrect Guesses: {incorrectGuesses.join(', ')}</Col>
      </Row>
      <Row className="mt-2">
        <Col xs={12}>
          {gameOver && (
            <Alert variant="danger">You Lost! The word was "{word}"</Alert>
          )}
          {gameWon && (
            <Alert variant="success">You Won! The word was "{word}"</Alert>
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <Col xs={12}>
          <Button onClick={handleRestart}>Restart Game</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Hangman;
