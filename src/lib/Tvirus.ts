import { createUniverse, addEntity, moveEntity, findEntity, infectUniverse, findAllEntities } from 'lib/universe'
import {
	WalkOfTheDeadProps,
	WalkOfTheDead,
	NewWaveInfectionsProps,
	NewWaveInfections,
	BeginInfectionsProps,
} from 'lib/TvirusTypes'
import { generate as generateId } from 'shortid'

/**
 * @param gridSize size of square grid in universe
 * @param moves set of moves for zombie zero to move in unvierse ie: ['L', 'D', 'R']
 * @param zombieCoordinates initial location of zombie zero in universe ie: { x: 2, y: 9 }
 * @param creatureCoordinates intial locations for creatures in universe
 */
export const walkOfTheDead = ({
	gridSize,
	moves,
	zombieCoordinates,
	creatureCoordinates,
}: WalkOfTheDeadProps): WalkOfTheDead => {
	let grid = createUniverse(gridSize)
	const zombieId = generateId()

	// initialise zombie
	grid = addEntity(grid, zombieCoordinates.x, zombieCoordinates.y, { id: zombieId, type: 'zombie' })

	// initialise creatures
	creatureCoordinates.forEach(({ x, y }) => {
		grid = addEntity(grid, x, y, { id: generateId(), type: 'creature' })
	})

	// start zombile apocalypse
	const { grid: finalGrid, score } = beginInfections({
		grid,
		currentWaveZombieIds: [zombieId],
		previousWaveZombieIds: [],
		moves,
	})

	return {
		score,
		zombieCoordinates: findAllEntities(finalGrid, 'zombie'),
	}
}

/**
 * @param grid square grid of the universe
 * @param currentWaveZombieIds list of current wave of zombie ids to start new wave of infections
 * @param previousWaveZombieIds list of zombie ids which were in the
 * @param moves set of moves for zombie zero to move in unvierse ie: ['L', 'D', 'R']
 */
const newWaveInfections = ({
	grid,
	currentWaveZombieIds,
	previousWaveZombieIds,
	moves,
}: NewWaveInfectionsProps): NewWaveInfections => {
	let nextWaveZombieIds = [] as number[]
	let newInfectionCount = 0

	currentWaveZombieIds.forEach((zId) => {
		moves.forEach((move) => {
			grid = moveEntity(grid, zId, move)

			const { x, y } = findEntity(grid, zId).coordinates
			grid = infectUniverse(grid, x, y)

			const newInfectionsZombieIds = grid[x][y].entities
				.filter((e) => !previousWaveZombieIds.includes(e.id))
				.filter((e) => !currentWaveZombieIds.includes(e.id))
				.map((e) => e.id)

			newInfectionCount = newInfectionCount + newInfectionsZombieIds.length
			nextWaveZombieIds = [...nextWaveZombieIds, ...newInfectionsZombieIds]
		})
	})

	return { nextWaveZombieIds, newInfectionCount }
}

/**
 * @param currentWaveZombieIds list of current wave of zombie ids to start new wave of infections
 * @param previousWaveZombieIds list of zombie ids which were in the
 * @param moves set of moves for zombie zero to move in unvierse ie: ['L', 'D', 'R']
 * @param score initial score of zombie infections
 */
const beginInfections = ({
	grid,
	currentWaveZombieIds,
	previousWaveZombieIds,
	moves,
	score = 0,
}: BeginInfectionsProps) => {
	if (currentWaveZombieIds.length === 0) return { grid, score }

	const { nextWaveZombieIds, newInfectionCount } = newWaveInfections({
		grid,
		currentWaveZombieIds,
		previousWaveZombieIds,
		moves,
	})

	return beginInfections({
		grid,
		currentWaveZombieIds: nextWaveZombieIds,
		previousWaveZombieIds: [...currentWaveZombieIds, ...previousWaveZombieIds],
		moves,
		score: score + newInfectionCount,
	})
}

export default walkOfTheDead
