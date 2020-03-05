import React, { Component } from 'react';
import Space from './Space.js'

class Board extends Component {

    state={
        spaces: [
            [],
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ],
        activeIndex: [],
        playerTurn: 'player1',
        moveOptions: 0
    }

    initializeBoard = () => {
        this.setState(prevState => {
             let spaces = [...prevState.spaces]
             spaces.forEach((row, rowIndex) => {
                 
                 let col = 0
                 while ( col < 8){

                    let owner
                    let evenCol = col % 2 === 0
                    let evenRow = rowIndex % 2 ===0
                    let spaceColor = ((evenCol && evenRow) || (!evenCol && !evenRow)) ? 'black' : 'red' 

                
                    if ( evenCol && evenRow ){
                        owner = null
                    } else if (!evenCol && !evenRow){
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
             console.log(spaces)
             return spaces
        })
    }

    selectPiece = (row, col, owner) =>{
      console.log('selecting')

        if (this.state.playerTurn === owner){
            this.setState({
                activeIndex: [row, col]
            })
        }
    } 

    unselectPiece = () => {
        console.log('unselcting')
        this.setState({
            activeIndex: []
        })
    } 

    movePiece = (endingRow,endingCol) => {
        console.log('moving')
        // this.checkForMoves()

        this.setState(prevState => {
            let spaces = [...prevState.spaces]
            
            let startingRow = prevState.activeIndex[0]
            let startingCol = prevState.activeIndex[1]

            let activeOwner = spaces[startingRow][startingCol].owner
            let activePiece = spaces[startingRow][startingCol]


            let isVacant = spaces[endingRow][endingCol].owner === null


            let rowDifference = endingRow - startingRow
            let colDifference = endingCol - startingCol


            let confirmPlacement = () =>{
                let finalRowIndex = activeOwner === 'player1' ? spaces.length - 1 : 0 

                spaces[startingRow][startingCol].owner = null
                spaces[endingRow][endingCol].owner = activeOwner

                if (endingRow === finalRowIndex){
                    spaces[endingRow][endingCol].isKing = true
                }
            }

            let removePiece = (row, col) => {
                spaces[row][col].owner = null
            }

            let forwardOne = prevState.playerTurn === 'player1' ? 1 : -1
            let forwardTwo = prevState.playerTurn === 'player1' ? 2 : -2
     

            let skippedSpotOwner = null
            let skippedRowIndex = (endingRow + startingRow) / 2
            let skippedColIndex = (endingCol + startingCol) / 2
            //valid skip => checks if diagonal piece is owned by enemy 
            if ((rowDifference === 2 || rowDifference === -2) && (colDifference === 2 || colDifference === -2)) {
          
                skippedSpotOwner = spaces[skippedRowIndex][skippedColIndex].owner
            }

            let validSkip = skippedSpotOwner !== null && skippedSpotOwner !== activeOwner

            // movement for regular pieces, no skip
            if (rowDifference === forwardOne &&  Math.abs(colDifference) === 1 && isVacant){
                confirmPlacement()
            } 
                // movement for king pieces, no skip
           else if (activePiece.isKing && Math.abs(rowDifference) === 1 && Math.abs(colDifference) && isVacant){
              confirmPlacement()
          } 
            // movemnet for regular pieces skipping
            else if (rowDifference === forwardTwo && Math.abs(colDifference) === 2 && isVacant && validSkip){
                removePiece(skippedRowIndex, skippedColIndex)
                confirmPlacement()
            } 
            // movement for kings, skip 
            else if (activePiece.isKing && Math.abs(rowDifference) === 2 && Math.abs(colDifference) === 2 && isVacant && validSkip){
                removePiece(skippedRowIndex, skippedColIndex)
                confirmPlacement()
            }

            else {
                console.log('idk whats up')
            }
          

            return spaces
       })
    //    this.checkForMoves()
    }

    checkForMoves = () => {
        let { spaces } = this.state
        let moveOptions = 0

        spaces.forEach((row, rowIndex) => {
            row.forEach((space, colIndex) => {
                if (space.owner === this.state.playerTurn){
                    // goes through each piece that belongs to the player whose turn it is, checks the status of adjacent pieces 
                    // to see if there are potential moves that can be made.

                    let normalSkippedVectors = space.owner === 'player1' ? [[1, 1], [1, -1]] : [[-1, 1], [-1, -1]]
                    let normalDestinationVectors = space.owner === 'player1' ? [[2, 2], [2, -2]] : [[-2, 2], [-2, -2]]
                    // required to distinguish the directionality between players 

                    let destinationVectors = space.isKing ? [[2, 2], [2, -2], [-2, -2], [-2, 2]] : normalDestinationVectors
                    let skippedVectors = space.isKing ?  [[1, 1], [1, -1], [-1, -1], [-1, 1]] :  normalSkippedVectors
                    // apply a check in all directions if the piece is a king, else use the regular vectors  

                    for (let i = 0; i < destinationVectors.length ; i++){
                    try {
                        let twoAwayOwner = spaces[rowIndex + destinationVectors[i][0]][colIndex + destinationVectors[i][1]].owner
                        let oneAwayOwner = spaces[rowIndex + skippedVectors[i][0]][colIndex + skippedVectors[i][1]].owner

                        if(twoAwayOwner === null && oneAwayOwner !== space.owner && oneAwayOwner !== null ){
                            moveOptions++
                        } 
                    } catch {
                        // console.log('edge case')
                    }
                }
                
                    
                }
            })
        })
        // console.log(moveOptions)
        this.setState({
            moveOptions: moveOptions
        })
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.playerTurn !== prevState.playerTurn){
            this.checkForMoves()
          }
    }

    componentDidMount(){
        this.initializeBoard()
    }
    

    changeSides = () => {
        
        this.setState(prevState => {
            let player = prevState.playerTurn === 'player1' ? 'player2' : 'player1' 

            return {playerTurn: player}
        })
    }

    render() {
        let { spaces, activeIndex, playerTurn } = this.state

        const checkerBoard = spaces.map((row, rowIndex) => {
            return row.map((spaceData, columnIndex) => {
              return <Space 
                        key={`${rowIndex} ${columnIndex}`} 
                        {...spaceData} 
                        playerTurn={playerTurn}
                        selectPiece={() => this.selectPiece(rowIndex,columnIndex, spaceData.owner)} 
                        unselectPiece={() => this.unselectPiece()}
                        movePiece={()=> this.movePiece(rowIndex,columnIndex)}
                        checkForMoves={this.checkForMoves}
                        row={rowIndex} 
                        col={columnIndex}
                        activeIndex={activeIndex}
                        />
            } )
          })
      
        return (
            <React.Fragment>
            <div style={{
                display: 'grid',
                gridTemplateRows: `repeat(8, 100px)`,
                gridTemplateColumns: `repeat(8, 100px)`
            }}>
              {checkerBoard}
            </div>
            <button onClick={this.changeSides}>SWITCH</button>
            </React.Fragment>
        );
    }
}

export default Board;