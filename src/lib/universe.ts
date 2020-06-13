import { Entity, GridInfo, Coordinates, FoundEntity } from 'lib/gridTypes'

/**
 * @param size dimensions for a square grid
 * @returns a size by size (ie: 2 by 2) dimensional array which will represent
 *          the x and y coordinates of the grid.
 *
 *  ```
 *  const grid = createUniverse(2)
 *
 *  grid[1][3] // represent grid information for coordinate x of 1 and coordinates y of 3
 *  ```
 */
export const createUniverse = (size: number): GridInfo[][] => {
	const tempGrid = [] as GridInfo[][]
	let x, y

	for (x = 0; x < size; x++) {
		let tempRow = [] as GridInfo[]

		for (y = 0; y < size; y++) tempRow.push({ entities: [] })
		tempGrid.push(tempRow)
	}

	return tempGrid
}

/**
 * @param grid the square grid
 * @param x horizontal coordinates of the grid
 * @param y vertical coordinates of the grid
 * @param entity the entity to placed in coordinates x and y in grid
 * @returns an updated grid with the entity placed in desired coordinates
 */
export const addEntity = (grid: GridInfo[][], x: number, y: number, entity: Entity): GridInfo[][] => {
	try {
		grid[x][y] = {
			...grid[x][y],
			entities: [...grid[x][y].entities, entity],
		}
	} catch (e) {
		throw 'Invalid grid coordinates !'
	}

	return grid
}

/**
 * @param grid the square grid
 * @param entityId the entity entityId that is located in the provided grid
 * @return returns information about the entity and its location
 */
export const findEntity = (grid: GridInfo[][], entityId: number): FoundEntity => {
	let x: number, y: number
	let coordinates = {} as Coordinates
	let foundEntity = {} as Entity

	for (x = 0; x < grid.length; x++) {
		for (y = 0; y < grid.length; y++) {
			const entity = grid[x][y].entities.find((e) => e.id === entityId)

			if (entity) {
				coordinates = { x, y }
				foundEntity = entity
			}
		}
	}

	return { coordinates, entity: foundEntity }
}

/**
 * @param grid the square grid
 * @param type the type of entity
 * @return returns all coordities for an entity type
 */
export const findAllEntities = (grid: GridInfo[][], type: string): Coordinates[] => {
	let x: number, y: number
	let coordinates = {} as Coordinates
	let foundEntities = [] as Coordinates[]

	for (x = 0; x < grid.length; x++) {
		for (y = 0; y < grid.length; y++) {
			const entity = grid[x][y].entities.find((e) => e.type === type)

			if (entity) {
				coordinates = { x, y }
				foundEntities.push(coordinates)
			}
		}
	}

	return foundEntities
}

/**
 * @param grid a square grid
 * @param x horizontal coordinates of the grid
 * @param y vertical coordinates of the grid
 * @param entityId the entity id that is located in the provided grid
 * @returns an updated grid with the entity removed in desired coordinates
 */
export const removeEntity = (grid: GridInfo[][], x: number, y: number, entityId: number): GridInfo[][] => {
	grid[x][y].entities = grid[x][y].entities.filter((e) => e.id !== entityId)

	return grid
}

/**
 * @param grid a square grid
 * @param entityId the entity id that is located in the provided grid
 * @param direction the direction entity to move towards with
 *                  'L' as left ,
 *                  'R' as right,
 *                  'D' as down, 'U' as up
 * @returns an updated grid with the entity moved in desired coordinates
 */
export const moveEntity = (grid: GridInfo[][], entityId: number, direction: string): GridInfo[][] => {
	const {
		coordinates: { x: currentX, y: currentY },
		entity,
	} = findEntity(grid, entityId)
	const { x: moveX, y: moveY } = calculateDirectionMagnitude(direction)
	const removedEntityGrid = removeEntity(grid, currentX, currentY, entityId)

	return addEntity(
		removedEntityGrid,
		normaliseCoordinate(grid.length, currentX + moveX),
		normaliseCoordinate(grid.length, currentY + moveY),
		entity
	)
}

/**
 * @param gridSize size of square grid
 * @param gridPosition position in grid
 * @returns circular number within the square grid
 */
export const normaliseCoordinate = (gridSize: number, gridPosition: number) =>
	((gridPosition % gridSize) + gridSize) % gridSize //handling negative numbers for JS modolo bug

/**
 * @param direction direction of travel
 * @returns magitude of travel of direction in grid
 */
export const calculateDirectionMagnitude = (direction: string): Coordinates => {
	switch (direction) {
		case 'U':
			return { x: 0, y: -1 }
		case 'D':
			return { x: 0, y: 1 }
		case 'L':
			return { x: -1, y: 0 }
		case 'R':
			return { x: 1, y: 0 }
		default:
			return { x: 0, y: 0 }
	}
}

/**
 * @param grid a square grid
 * @param x horizontal coordinates of the grid
 * @param y vertical coordinates of the grid
 * @returns an updated grid with the entities in desired coordinates infected to be zombies
 */
export const infectUniverse = (grid: GridInfo[][], x: number, y: number): GridInfo[][] => {
	const infectedEntities = grid[x][y].entities.map((e) => ({
		...e,
		type: 'zombie',
	}))

	grid[x][y].entities = infectedEntities

	return grid
}

export default {}
