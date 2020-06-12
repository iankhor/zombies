import { Coordinates } from 'lib/gridTypes'
import { createGrid, addEntity, moveEntity, findEntity } from 'lib/grid'
import { generate as generateId } from 'shortid'

type RawForm = {
	'grid-size': number
	moves: string[]
	'zombie-init': Coordinates
}

type ProcessedForm = {
	gridSize: number
	moves: string[]
	zombieCoordinates: Coordinates
	creatureCoordinates: Coordinates[]
}

export const serializeForm = (form: RawForm): ProcessedForm => {
	const creatureCoordinates = Object.entries(form)
		.filter((e) => /creature/.test(e[0]))
		.map((e) => e[1]) as Coordinates[]

	return {
		gridSize: form['grid-size'],
		moves: form.moves,
		zombieCoordinates: form['zombie-init'],
		creatureCoordinates,
	}
}

export const processForm = ({ gridSize, moves, zombieCoordinates, creatureCoordinates }: any): any => {
	let grid = createGrid(gridSize)
	const zombieId = generateId()

	grid = addEntity(grid, zombieCoordinates.x, zombieCoordinates.y, { id: zombieId, type: 'zombie' })
	moves.map((move) => (grid = moveEntity(grid, zombieId, move)))

	return {
		score: 3,
		creatureCoordinates: [],
		zombieCoordinates: [findEntity(grid, zombieId).coordinates],
	}
}
