import React, { useState } from 'react'
import Input from 'components/Input'
import CoordinatesPair from 'components/CoordinatesPair'
import Moves from 'components/Moves'

const Container = () => {
	const [gridSize, setGridSize] = useState(0)
	const [creatureList, setCreatureList] = useState<JSX.Element[]>([])
	const [moveSet, setMoveSet] = useState<string[]>([])

	const addCreature = () => {
		setCreatureList([
			...creatureList,
			<CoordinatesPair
				key={creatureList.length}
				label={`Creature ${creatureList.length + 1}`}
				optionsCount={gridSize}
			/>,
		])
	}

	const gridSizePresent = !!gridSize && gridSize > 0

	const appendMove = (move: string): void => setMoveSet([...moveSet, move])

	return (
		<>
			<Input
				id="grid-size"
				label="Grid size"
				placeholder={'ie: 3'}
				onChange={({ target: { value } }) => setGridSize(value)}
			/>

			{gridSizePresent && (
				<CoordinatesPair id="zombie-init" optionsCount={gridSize} label="Initial Position of Zombie" />
			)}

			{gridSizePresent && (
				<button id="add-creature" onClick={addCreature}>
					Add creature
				</button>
			)}

			{creatureList}

			{gridSizePresent && (
				<>
					<p>
						<label>Construct zombie moves</label>
					</p>
					<Moves
						upClick={() => appendMove('U')}
						downClick={() => appendMove('D')}
						leftClick={() => appendMove('L')}
						rightClick={() => appendMove('R')}
					/>
				</>
			)}
			<pre>{moveSet}</pre>
		</>
	)
}

export default Container
