import React from 'react'
import grid from 'styles/basic.css'

type MovesProps = {
	upClick?: (e: React.SyntheticEvent) => void
	downClick?: (e: React.SyntheticEvent) => void
	leftClick?: (e: React.SyntheticEvent) => void
	rightClick?: (e: React.SyntheticEvent) => void
}

const Moves = ({ upClick, downClick, leftClick, rightClick }: MovesProps): JSX.Element => (
	<>
		<div className={grid.twoColumn}>
			<label>Construct zombie moves</label>
		</div>
		<div className={grid.center}>
			<button onClick={upClick}>Up</button>
			<button onClick={downClick}>Down</button>
			<button onClick={leftClick}>Left</button>
			<button onClick={rightClick}>Right</button>
		</div>
	</>
)

export default Moves
