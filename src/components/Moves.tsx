import React, { useState } from 'react'

type MovesProps = {
	upClick?: (e: React.SyntheticEvent) => void
	downClick?: (e: React.SyntheticEvent) => void
	leftClick?: (e: React.SyntheticEvent) => void
	rightClick?: (e: React.SyntheticEvent) => void
}

const Moves = ({ upClick, downClick, leftClick, rightClick }: MovesProps): JSX.Element => (
	<p>
		<button onClick={upClick}>Up</button>
		<button onClick={downClick}>Down</button>
		<button onClick={leftClick}>Left</button>
		<button onClick={rightClick}>Right</button>
	</p>
)

export default Moves
