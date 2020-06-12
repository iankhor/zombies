import { Coordinates, Entity } from 'lib/gridTypes'
import { createGrid, addEntity, moveEntity, findEntity, infectGrid, findAllEntities } from 'lib/grid'
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

	// initialise zombie
	grid = addEntity(grid, zombieCoordinates.x, zombieCoordinates.y, { id: zombieId, type: 'zombie' })

	// initialise creatures
	creatureCoordinates.forEach(({ x, y }) => {
		grid = addEntity(grid, x, y, { id: generateId(), type: 'creature' })
	})

	moves.forEach((move) => {
		grid = moveEntity(grid, zombieId, move)

		//infect all entities in grid position
		const { x, y } = findEntity(grid, zombieId).coordinates
		grid = infectGrid(grid, x, y)
	})

	return {
		zombieCoordinates: findAllEntities(grid, 'zombie'),
	}
}
