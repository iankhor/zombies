import { createUniverse, addEntity, moveEntity, findEntity, infectUniverse, findAllEntities } from 'lib/universe'
import { generate as generateId } from 'shortid'

export const walkOfTheDead = ({ gridSize, moves, zombieCoordinates, creatureCoordinates }: any): any => {
	let grid = createUniverse(gridSize)
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
			grid = infectUniverse(grid, x, y)

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

export default walkOfTheDead
