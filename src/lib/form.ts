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

export const walkOfTheDead = ({ gridSize, moves, zombieCoordinates, creatureCoordinates }: any): any => {
	let grid = createGrid(gridSize)
	const zombieId = generateId()

	// initialise zombie
	grid = addEntity(grid, zombieCoordinates.x, zombieCoordinates.y, { id: zombieId, type: 'zombie' })

	// initialise creatures
	creatureCoordinates.forEach(({ x, y }) => {
		grid = addEntity(grid, x, y, { id: generateId(), type: 'creature' })
	})

	// start zombile apocalypse
	const { grid: finalGrid } = beginInfections(grid, [zombieId], [], moves)

	return {
		zombieCoordinates: findAllEntities(finalGrid, 'zombie'),
	}
}

const newWaveInfections = (grid, currentWaveZombieIds, previousWaveZombieIds, moves) => {
	let nextWaveZombieIds = [] as number[]

	currentWaveZombieIds.forEach((zId) => {
		moves.forEach((move) => {
			grid = moveEntity(grid, zId, move)

			const { x, y } = findEntity(grid, zId).coordinates
			grid = infectGrid(grid, x, y)

			const newInfectionsZombieIds = grid[x][y].entities
				.filter((e) => !previousWaveZombieIds.includes(e.id))
				.filter((e) => !currentWaveZombieIds.includes(e.id))
				.map((e) => e.id)

			nextWaveZombieIds = [...nextWaveZombieIds, ...newInfectionsZombieIds]
		})
	})

	return nextWaveZombieIds
}

const beginInfections = (grid, currentWaveZombieIds, previousWaveZombieIds, moves) => {
	if (currentWaveZombieIds.length === 0) return { grid, zombieIds: [] }

	const nextWaveZombieIds = newWaveInfections(grid, currentWaveZombieIds, previousWaveZombieIds, moves)

	return beginInfections(grid, nextWaveZombieIds, [...currentWaveZombieIds, ...previousWaveZombieIds], moves)
}
