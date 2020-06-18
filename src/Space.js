import React, { Component } from 'react'

class Space extends Component {

    componentDidUpdate(prevProps) {
        if(this.props.owner !== prevProps.owner){
            this.props.checkForMoves()
          }
    }

  render() {
    let {
      spaceColor,
      player1Color,
      player2Color,
      activeIndex,
      selectPiece,
      isKing,
      playerTurn,
      unselectPiece,
      movePiece,
      owner,
      row,
      col
    } = this.props

    let pieceColor = owner === 'player1' ? player1Color : player2Color

    let isActive = activeIndex[0] === row && activeIndex[1] === col

    let isOwned = owner ===  playerTurn

    let handleMove = () => {
 
        // else 
        if (isActive) {
            return unselectPiece()
        } else if (isOwned){
            selectPiece()
        }
        // if the active index exists, move the piece from that index to this index 
        else if (activeIndex.length > 1){
            return movePiece()
        }
        else if (!isActive){
            return selectPiece()
        }
    }

    

    return (
      <div
        style={{ backgroundColor: spaceColor }}
        onClick={() => handleMove()}
      >
        {this.props.owner && (
          <div
            style={{
              width: '100%',
              height: '100%',
              fontSize: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              backgroundColor: pieceColor,
              opacity: isActive ? 0.3 : 1
            }}
          >
              {isKing && '👑'}
          </div>
        )}
      </div>
    )
  }
}

export default Space
