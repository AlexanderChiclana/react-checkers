import React, { Component } from 'react'
import Space from './Space.js'

class Board extends Component {
  state = {
    spaces: [[], [], [], [], [], [], [], []],
    pieceSize: 100,
    activeIndex: [],
    lastRow: null,
    lastCol: null,
    turnMoves: [],
    player1Color: 'green',
    player2Color: 'purple',
    square1Color: 'black',
    square2Color: 'white',
    playerTurn: 'player1',
    skipOptions: 0,
    gameWinner: null
  }

  initializeBoard = () => {
    this.setState(prevState => {
      let spaces = [...prevState.spaces]
      let { square1Color, square2Color } = prevState
      spaces.forEach((row, rowIndex) => {
        let col = 0
        while (col < 8) {
          let owner
          let evenCol = col % 2 === 0
          let evenRow = rowIndex % 2 === 0
          let spaceColor =
            (evenCol && evenRow) || (!evenCol && !evenRow) ? square1Color : square2Color

          if (evenCol && evenRow) {
            owner = null
          } else if (!evenCol && !evenRow) {
            owner = null
          } else if (rowIndex < 2) {
            owner = 'player1'
          } else if (rowIndex >= 6) {
            owner = 'player2'
          } else {
            owner = null
          }

          row.push({
            owner: owner,
            spaceColor: spaceColor,
            isKing: false,
            selected: false
          })
          col++
        }
      })
      return spaces
    })
  }

  selectPiece = (row, col, owner) => {
    if (this.state.playerTurn === owner) {
      this.setState({
        activeIndex: [row, col]
      })
    }
  }

  unselectPiece = () => {
    this.setState({
      activeIndex: []
    })
  }

  movePiece = (endingRow, endingCol) => {

    this.setState(prevState => {
      let spaces = [...prevState.spaces]
      let activeIndex = [...prevState.activeIndex]
      let skipOptions = prevState.skipOptions
      let turnMoves = prevState.turnMoves
      let playerTurn = prevState.playerTurn

      let startingRow = prevState.activeIndex[0]
      let startingCol = prevState.activeIndex[1]

      let activeOwner = spaces[startingRow][startingCol].owner
      let activePiece = spaces[startingRow][startingCol]

      let isVacant = spaces[endingRow][endingCol].owner === null

      let confirmPlacement = didJump => {
        let finalRowIndex = activeOwner === 'player1' ? spaces.length - 1 : 0
        let nextPlayer = playerTurn === 'player1' ? 'player2' : 'player1'
        // sets the owner after sucessful move, preserves king status
        spaces[endingRow][endingCol].owner = activeOwner
        spaces[endingRow][endingCol].isKing =
          spaces[startingRow][startingCol].isKing

        spaces[startingRow][startingCol].owner = null
        spaces[startingRow][startingCol].isKing = false

        // converts to king when reaches last row
        if (endingRow === finalRowIndex) {
          spaces[endingRow][endingCol].isKing = true
        }
        turnMoves.push([endingRow, endingCol])

        activeIndex = []
        console.log(this.validateSkips(spaces, endingRow, endingCol))

        if (!skipOptions) {
          playerTurn = nextPlayer
        } // if the ending position returns FALSE when validate skips is run, change sides
        else if (didJump && !this.validateSkips(spaces, endingRow, endingCol)) {
          console.log('keep going')
          playerTurn = nextPlayer
        } else if (!didJump) {
          playerTurn = nextPlayer
        } else {
          return
        }

        // dont change sides when above conditionsa are false
      }

      let removePiece = (row, col) => {
        spaces[row][col].owner = null
      }

      let forwardOne = prevState.playerTurn === 'player1' ? 1 : -1
      let forwardTwo = prevState.playerTurn === 'player1' ? 2 : -2

      let skippedSpotOwner = null
      let skippedRowIndex = (endingRow + startingRow) / 2
      let skippedColIndex = (endingCol + startingCol) / 2

      let rowDifference = endingRow - startingRow
      let colDifference = endingCol - startingCol

      //valid skip => checks if diagonal piece is owned by enemy
      if (
        (rowDifference === 2 || rowDifference === -2) &&
        (colDifference === 2 || colDifference === -2)
      ) {
        skippedSpotOwner = spaces[skippedRowIndex][skippedColIndex].owner
      }

      let validSkip =
        skippedSpotOwner !== null && skippedSpotOwner !== activeOwner

      // movement for regular pieces, no skip
      if (
        rowDifference === forwardOne &&
        Math.abs(colDifference) === 1 &&
        isVacant &&
        !skipOptions
      ) {
        // if last item in turn moves array matches active index dont allow
        console.log(activeIndex, turnMoves)
        confirmPlacement()
      }
      // movement for king pieces, no skip
      else if (
        activePiece.isKing &&
        Math.abs(rowDifference) === 1 &&
        Math.abs(colDifference) &&
        isVacant &&
        !skipOptions
      ) {
        confirmPlacement()
      }
      // movemnet for regular pieces skipping
      else if (
        rowDifference === forwardTwo &&
        Math.abs(colDifference) === 2 &&
        isVacant &&
        validSkip
      ) {
        removePiece(skippedRowIndex, skippedColIndex)
        confirmPlacement(true)
      }
      // movement for kings, skip
      else if (
        activePiece.isKing &&
        Math.abs(rowDifference) === 2 &&
        Math.abs(colDifference) === 2 &&
        isVacant &&
        validSkip
      ) {
        removePiece(skippedRowIndex, skippedColIndex)
        confirmPlacement(true)
      } else {
        // console.log('idk whats up')
      }

      return { spaces, activeIndex, turnMoves, playerTurn }
    })
  }

  validateSkips = (spaces, rowIndex, colIndex) => {

    let piece = this.state.spaces[rowIndex][colIndex]
    let canSkip = false

    let normalSkippedVectors =
      piece.owner === 'player1'
        ? [
            [1, 1],
            [1, -1]
          ]
        : [
            [-1, 1],
            [-1, -1]
          ]
    let normalDestinationVectors =
      piece.owner === 'player1'
        ? [
            [2, 2],
            [2, -2]
          ]
        : [
            [-2, 2],
            [-2, -2]
          ]
    // requi        to distinguish the directionality between players

    let destinationVectors = piece.isKing
      ? [
          [2, 2],
          [2, -2],
          [-2, -2],
          [-2, 2]
        ]
      : normalDestinationVectors
    let skippedVectors = piece.isKing
      ? [
          [1, 1],
          [1, -1],
          [-1, -1],
          [-1, 1]
        ]
      : normalSkippedVectors
    // apply a check in all directions if the piece is a king, else use the regular vectors

    for (let i = 0; i < destinationVectors.length; i++) {
      try {
        let twoAwayOwner =
          spaces[rowIndex + destinationVectors[i][0]][
            colIndex + destinationVectors[i][1]
          ].owner
        let oneAwayOwner =
          spaces[rowIndex + skippedVectors[i][0]][
            colIndex + skippedVectors[i][1]
          ].owner

        if (
          twoAwayOwner === null &&
          oneAwayOwner !== piece.owner &&
          oneAwayOwner !== null
        ) {
          canSkip = true
        }
      } catch {
      }
    }

    return canSkip
  }

  checkForMoves = () => {
    let { spaces } = this.state
    let skipOptions = 0

    spaces.forEach((row, rowIndex) => {
      row.forEach((space, colIndex) => {
        if (space.owner === this.state.playerTurn) {
          // goes through each piece that belongs to the player whose turn it is, checks the status of adjacent pieces
          // to see if there are potential moves that can be made.

          let normalSkippedVectors =
            space.owner === 'player1'
              ? [
                  [1, 1],
                  [1, -1]
                ]
              : [
                  [-1, 1],
                  [-1, -1]
                ]
          let normalDestinationVectors =
            space.owner === 'player1'
              ? [
                  [2, 2],
                  [2, -2]
                ]
              : [
                  [-2, 2],
                  [-2, -2]
                ]
          // required to distinguish the directionality between players

          let destinationVectors = space.isKing
            ? [
                [2, 2],
                [2, -2],
                [-2, -2],
                [-2, 2]
              ]
            : normalDestinationVectors
          let skippedVectors = space.isKing
            ? [
                [1, 1],
                [1, -1],
                [-1, -1],
                [-1, 1]
              ]
            : normalSkippedVectors
          // apply a check in all directions if the piece is a king, else use the regular vectors

          for (let i = 0; i < destinationVectors.length; i++) {
            try {
              let twoAwayOwner =
                spaces[rowIndex + destinationVectors[i][0]][
                  colIndex + destinationVectors[i][1]
                ].owner
              let oneAwayOwner =
                spaces[rowIndex + skippedVectors[i][0]][
                  colIndex + skippedVectors[i][1]
                ].owner

              if (
                twoAwayOwner === null &&
                oneAwayOwner !== space.owner &&
                oneAwayOwner !== null
              ) {
                skipOptions++
              }
            } catch {
            }
          }
        }
      })
    })
    this.setState({
      skipOptions: skipOptions
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.playerTurn !== prevState.playerTurn) {
      this.checkForMoves()
      this.checkForWin()
    }
  }

  checkForWin = () => {
     let { spaces } = this.state
     let status = null
     spaces.forEach((row) => {
        if (row.some(space => space.owner !== 'player1')){
            status = 'player1 lost'
        } else if (row.some(space => space.owner !== 'player2')){
            status = 'player2 lost'
        } else {
            status = null
        }
     })
     this.setState({
         gameWinner: status
     })
  }

  componentDidMount() {
    this.initializeBoard()
  }

  changeSides = () => {
    this.setState(prevState => {
      let player = prevState.playerTurn === 'player1' ? 'player2' : 'player1'

      return { playerTurn: player }
    })
  }

  triggerHover = event => {
    this.setState({
      mouseX: event.pageX,
      mouseY: event.pageY
    })
  }

  render() {
    let {
      spaces,
      activeIndex,
      playerTurn,
      pieceSize,
      mouseX,
      mouseY,
      player1Color,
      player2Color
    } = this.state

    const checkerBoard = spaces.map((row, rowIndex) => {
      return row.map((spaceData, columnIndex) => {
        return (
          <Space
            key={`${rowIndex} ${columnIndex}`}
            {...spaceData}
            playerTurn={playerTurn}
            selectPiece={() =>
              this.selectPiece(rowIndex, columnIndex, spaceData.owner)
            }
            unselectPiece={() => this.unselectPiece()}
            movePiece={() => this.movePiece(rowIndex, columnIndex)}
            checkForMoves={this.checkForMoves}
            player1Color={player1Color}
            player2Color={player2Color}
            row={rowIndex}
            col={columnIndex}
            activeIndex={activeIndex}
          />
        )
      })
    })

    return (
      <React.Fragment>
        {activeIndex.length !== 0 && (
          <div
            style={{
              width: `${pieceSize}px`,
              height: `${pieceSize}px`,
              borderRadius: '50%',
              backgroundColor:
                playerTurn === 'player1' ? player1Color : player2Color,
              position: 'absolute',
              pointerEvents: 'none',
              left: `calc(${mouseX}px - (${pieceSize}px / 2)`,
              top: `calc(${mouseY}px - (${pieceSize}px / 2)`
            }}
          />
        )}
        <div
          onMouseMove={event => this.triggerHover(event)}
          style={{
            display: 'grid',
            gridTemplateRows: `repeat(8, 100px)`,
            cursor: activeIndex.length !== 0 && 'grabbing',
            gridTemplateColumns: `repeat(8, 100px)`
          }}
        >
          {checkerBoard}
        </div>

      </React.Fragment>
    )
  }
}

export default Board
