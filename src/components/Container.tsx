import React, { useState, useRef } from 'react'
import { serializeForm, simpleFormValidation } from 'lib/form'
import walkOfTheDead from 'lib/Tvirus'
import Input from 'components/Input'
import CoordinatesPair from 'components/CoordinatesPair'
import Moves from 'components/Moves'
import { Coordinates } from 'lib/universeTypes'

const Container = () => {
	const formData: any = useRef({ moves: [] })
	const [gridSize, setGridSize] = useState(0)
	const [creatureList, setCreatureList] = useState<JSX.Element[]>([])
	const [moveSet, setMoveSet] = useState<string[]>([])
	const [formError, setFormError] = useState(false)

	const [score, setScore] = useState(0)
	const [zombieCoordinates, setZombieCoordinates] = useState<Coordinates[]>([])

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

	const onReset = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setGridSize(0)
		formData.current = { moves: [] }
		setScore(0)
		setZombieCoordinates([])
		setFormError(false)
		setCreatureList([])
	}

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setFormError(false)
		const form = serializeForm(formData.current)
		const isValid = simpleFormValidation(form)

		if (isValid) {
			const { score, zombieCoordinates } = walkOfTheDead(form)
			setScore(score)
			setZombieCoordinates(zombieCoordinates)
		} else {
			setFormError(true)
		}
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
			<pre>{`zombie move set: ${moveSet}`}</pre>

			<input type="submit" value="Submit" />
			<button role="reset" onClick={onReset}>
				Reset
			</button>

			<pre>{`score: ${score}`}</pre>
			<pre>{`Zombie Positions: ${JSON.stringify(zombieCoordinates)}`}</pre>
			{formError && <pre>Oops something isn't right, check your inputs</pre>}
		</form>
	)
}

export default Container
