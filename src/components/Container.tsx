import React, { useState, useRef, useReducer } from 'react'
import { serializeForm, simpleFormValidation } from 'lib/form'
import walkOfTheDead from 'lib/Tvirus'
import Input from 'components/Input'
import CoordinatesPair from 'components/CoordinatesPair'
import Moves from 'components/Moves'
import { Coordinates } from 'lib/universeTypes'
import basic from 'styles/basic.css'
import reducer, {
	initialState,
	SET_FORM_ERROR,
	SET_SCORE,
	SET_UNIVERSE_SIZE,
	RESET_UNIVERSE,
	SET_ZOMBIE_MOVESET,
	SET_ZOMBIES_COORDINATES,
} from 'lib/reducer'
import Zombie from '../assets/zombie.png'

const Container = (): JSX.Element => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const formData: any = useRef({ moves: [] })
	const [creatureList, setCreatureList] = useState<JSX.Element[]>([])
	const gridSizePresent = !!state.universeSize && state.universeSize > 0

	const addCreature = (e: React.SyntheticEvent) => {
		e.preventDefault()
		setCreatureList([
			...creatureList,
			<CoordinatesPair
				onChange={coordinatesOnChange}
				name={`creature-${creatureList.length}`}
				key={creatureList.length - 1}
				label={`Creature ${creatureList.length + 1}`}
				optionsCount={state.universeSize}
			/>,
		])
	}

	const gridSizeOnChange = ({ target: { value } }) => {
		formData.current = {
			...formData.current,
			['grid-size']: value,
		}

		dispatch({ type: SET_UNIVERSE_SIZE, value })
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

	const appendMove = (move: string, e: React.SyntheticEvent): void => {
		e.preventDefault()
		dispatch({ type: SET_ZOMBIE_MOVESET, value: move })
		formData.current = {
			...formData.current,
			moves: [...formData.current.moves, move],
		}
	}

	const onReset = (e: React.SyntheticEvent) => {
		formData.current = { moves: [] }
		e.preventDefault()
		setCreatureList([])
		dispatch({ type: RESET_UNIVERSE, value: null })
	}

	const onSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault()
		dispatch({ type: SET_FORM_ERROR, value: false })
		const form = serializeForm(formData.current)
		const isValid = simpleFormValidation(form)

		if (isValid) {
			const { score, zombieCoordinates } = walkOfTheDead(form)
			dispatch({ type: SET_SCORE, value: score })
			dispatch({ type: SET_ZOMBIES_COORDINATES, value: zombieCoordinates })
		} else {
			dispatch({ type: SET_FORM_ERROR, value: true })
		}
	}

	return (
		<form onSubmit={onSubmit}>
			<div className={basic.center}>
				<img className={basic.logo} src={Zombie}></img>
			</div>
			<div className={basic.center}>
				<pre>Enter a number to create the size of the zombie universe</pre>
			</div>
			<Input name="grid-size" label="Universe size (ie: grid size)" placeholder={'ie: 3'} onChange={gridSizeOnChange} />

			{gridSizePresent && (
				<>
					<CoordinatesPair
						onChange={coordinatesOnChange}
						name="zombie-init"
						optionsCount={state.universeSize}
						label="Zombie Zero Location"
					/>

					<hr></hr>

					<div className={basic.twoColumn}>
						{gridSizePresent && (
							<button id="add-creature" onClick={addCreature}>
								Add creature
							</button>
						)}
					</div>

					{creatureList}

					<hr></hr>

					<Moves
						upClick={(e) => appendMove('U', e)}
						downClick={(e) => appendMove('D', e)}
						leftClick={(e) => appendMove('L', e)}
						rightClick={(e) => appendMove('R', e)}
					/>
					<pre className={basic.center}>{`zombie move set: ${state.moveSet}`}</pre>

					<div className={basic.center}>
						<input type="submit" value="Submit" />
						<button role="reset" onClick={onReset}>
							Reset
						</button>
					</div>

					<hr></hr>
					<strong>Apocalpypse Outcome</strong>
					<pre>{`score: ${state.score}`}</pre>
					<pre>{`Zombie Positions: ${JSON.stringify(state.zombieCoordinates)}`}</pre>
					{state.formError && <pre>Oops something isn't right, check your inputs</pre>}
				</>
			)}
		</form>
	)
}

export default Container
