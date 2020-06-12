import React, { useState } from 'react'

type MovesProps = {
	upClick?: () => void
	downClick?: () => void
	leftClick?: () => void
	rightClick?: () => void
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
