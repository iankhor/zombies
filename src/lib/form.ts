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

	//place zombie in moveSequence
	const moveSequence = [] as number[]

	// initialise creatures
	creatureCoordinates.forEach(({ x, y }) => {
		grid = addEntity(grid, x, y, { id: generateId(), type: 'creature' })
	})

	// start zombile apocalypse
	const { grid: finalGrid } = walkOfTheDead(grid, [zombieId], [], moves)

	return {
		zombieCoordinates: findAllEntities(finalGrid, 'zombie'),
	}
}

const walkOfTheDead = (grid, currentZombieIds, pastZombieIds, moves) => {
	if (currentZombieIds.length === 0) return { grid, zombieIds: [] }

	let zombieIds = [] as number[]

	currentZombieIds.forEach((zId) => {
		moves.forEach((move) => {
			grid = moveEntity(grid, zId, move)

			const { x, y } = findEntity(grid, zId).coordinates
			grid = infectGrid(grid, x, y)

			// TODO: refactor
			const newZombiesIds = grid[x][y].entities.filter((e) => !pastZombieIds.includes(e.id)).map((e) => e.id)
			const k = newZombiesIds.filter((z) => !currentZombieIds.includes(z))

			zombieIds = [...zombieIds, ...k]
		})
	})

	return walkOfTheDead(grid, zombieIds, [...currentZombieIds, ...pastZombieIds], moves)
}
