import React, { useState, useEffect, useRef } from 'react'
import { serializeForm } from 'lib/form'
import walkOfTheDead from 'lib/Tvirus'
import Input from 'components/Input'
import CoordinatesPair from 'components/CoordinatesPair'
import Moves from 'components/Moves'

const Container = () => {
	const formData: any = useRef({ moves: [] })
	const [gridSize, setGridSize] = useState(0)
	const [creatureList, setCreatureList] = useState<JSX.Element[]>([])
	const [moveSet, setMoveSet] = useState<string[]>([])

	const addCreature = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setCreatureList([
			...creatureList,
			<CoordinatesPair
				onChange={coordinatesOnChange}
				name={`creature-${creatureList.length}`}
				key={creatureList.length - 1}
				label={`Creature ${creatureList.length + 1}`}
				optionsCount={gridSize}
			/>,
		])
	}

	const gridSizeOnChange = ({ target: { value } }) => {
		formData.current = {
			...formData.current,
			['grid-size']: value,
		}

		setGridSize(value)
	}

	const coordinatesOnChange = ({ target: { name, value, id } }) => {
		formData.current = {
			...formData.current,
			[name]: {
				...formData.current[name],
				[id]: value || 0,
			},
		}
	}

	const gridSizePresent = !!gridSize && gridSize > 0

	const appendMove = (move: string, e: React.SyntheticEvent): void => {
		e.preventDefault()
		setMoveSet([...moveSet, move])
		formData.current = {
			...formData.current,
			moves: [...formData.current.moves, move],
		}
	}

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()

		console.log(serializeForm(formData.current))
		// console.log(walkOfTheDead(serializeForm(formData.current)))
	}

	return (
		<form onSubmit={onSubmit}>
			<Input name="grid-size" label="Grid size" placeholder={'ie: 3'} onChange={gridSizeOnChange} />

			{gridSizePresent && (
				<CoordinatesPair
					onChange={coordinatesOnChange}
					name="zombie-init"
					optionsCount={gridSize}
					label="Initial Position of Zombie"
				/>
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
						upClick={(e) => appendMove('U', e)}
						downClick={(e) => appendMove('D', e)}
						leftClick={(e) => appendMove('L', e)}
						rightClick={(e) => appendMove('R', e)}
					/>
				</>
			)}
			<pre>{moveSet}</pre>
			<input type="submit" value="Submit" />
		</form>
	)
}

export default Container
