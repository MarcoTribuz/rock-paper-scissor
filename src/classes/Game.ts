import IGuess from "../interfaces/IGuess";
import EMove from "../enums/EMove";

/**
 * @class
 * @classdesc Game Class for Rock-paper-scissor
 */

class Game {
  userScore: number
  computerScore: number
  counter: number
  startButton: HTMLButtonElement
  gameButtons: HTMLDivElement
  output: HTMLDivElement
  rock: HTMLDivElement
  paper: HTMLDivElement
  scissor: HTMLDivElement
  computerName: string = 'Avaloq'
  userName: string = 'Marco'
  
  constructor() {
    this.userScore = 0
    this.computerScore = 0
    this.counter = 0
    this.startButton = document.querySelector("#start-button")
    this.gameButtons = document.querySelector("#game-buttons")
    this.output = document.querySelector(".output")
    this.rock = document.querySelector('#rock')
    this.paper = document.querySelector('#paper')
    this.scissor = document.querySelector('#scissor')

    this.rock.addEventListener('click', (e: Event) => {
      e.preventDefault();
      this.handleUserChoice(0)
    })

    this.paper.addEventListener('click', (e: Event) => {
      e.preventDefault();
      this.handleUserChoice(1)
    })

    this.scissor.addEventListener('click', (e: Event) => {
      e.preventDefault();
      this.handleUserChoice(2)
    })

    this.startButton.addEventListener('click', (e: Event) => {
      e.preventDefault();
      this.startGame()
    })

    this.showStartButton()
  }
  startGame(): void {
    this.userScore = 0
    this.computerScore = 0
    this.counter = 0
    this.clearOutput()
    this.hideStartButton()
  }
  clearOutput(): void {
    this.output.innerHTML = ''
  }
  outputMessage(message: string): void {
    this.output.innerHTML += `<p>${message}</p>`
  }
  hideStartButton(): void {
    this.startButton.style.display = "none"
    this.gameButtons.style.display = "block"
  }
  showStartButton(): void {
    this.startButton.style.display = "inline-block"
    this.gameButtons.style.display = "none"
  }
  getComputerMove(): IGuess {
    let move = Math.floor(Math.random() * 3)
    return {
      move: move,
      player: this.computerName
    }
  }
  handleUserChoice(choice: number): void {
    let userGuess: IGuess = {
      move: choice,
      player: this.userName
    }
    let computerGuess: IGuess = this.getComputerMove()
    let winner: IGuess = this.calculateWinner(userGuess, computerGuess)
    if (winner.player === this.userName) this.userScore++
    if (winner.player === this.computerName) this.computerScore++
    this.outputMessage(`${winner.player} wins with ${EMove[winner.move]}`)
    this.checkRoundProgress()
  }
  checkRoundProgress(): void {
    this.counter++
    if (this.userScore === 2 || this.computerScore === 2 || this.counter === 3) {
      this.showStartButton()

      this.counter = 0
      if (this.userScore > this.computerScore) this.outputMessage("You won that round!")
      else if (this.userScore === this.computerScore) this.outputMessage("You drew that round")
      else this.outputMessage("You lost that round!")
    }
  }
  calculateWinner(guessOne: IGuess, guessTwo: IGuess): IGuess {
    if (guessOne.move == guessTwo.move)
      return { player: "Neither", move: guessOne.move }

    switch (guessOne.move) {
      case EMove.Rock:
        if (guessTwo.move === EMove.Paper) return guessTwo
        break
      case EMove.Paper:
        if (guessTwo.move === EMove.Scissors) return guessTwo
        break
      case EMove.Scissors:
        if (guessTwo.move === EMove.Rock) return guessTwo
        break
      default:
        return guessOne
    }
    return guessOne
  }
}

export default Game
