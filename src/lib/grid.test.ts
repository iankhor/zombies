import {
	createGrid,
	addEntity,
	findEntity,
	removeEntity,
	moveEntity,
	calculateDirectionMagnitude,
	normaliseCoordinate,
} from 'lib/grid'

describe('createGrid', () => {
	const grid = createGrid(2)
	it('is a square grid', () => {
		expect(grid[0]).toHaveLength(2)
		expect(grid).toHaveLength(2)
	})

	it('has the entities in each grid', () => {
		expect(grid[0][0]).toEqual({ entities: [] })
		expect(grid[0][1]).toEqual({ entities: [] })
		expect(grid[1][0]).toEqual({ entities: [] })
		expect(grid[1][1]).toEqual({ entities: [] })
	})
})

describe('addEntity', () => {
	const grid = createGrid(4)

	it('adds an entity to grid based on coordinates', () => {
		const entity = { id: 2, type: 'zombie' }
		const updatedGrid = addEntity(grid, 1, 3, entity)

		expect(updatedGrid[1][3]).toMatchObject({ entities: [entity] })
	})

	it('does not override existing grid infomation', () => {
		const entity = { id: 3, type: 'zombie' }
		grid[0][0] = { entities: [{ id: 2, type: 'creature' }] }

		const updatedGrid = addEntity(grid, 0, 0, entity)

		expect(updatedGrid[0][0].entities).toEqual(
			expect.arrayContaining([
				{ id: 3, type: 'zombie' },
				{ id: 2, type: 'creature' },
			])
		)
	})

	it('throws an error if given invalid coordinates', () => {
		const grid = createGrid(4)
		const entity = { id: 3, type: 'zombie' }

		expect(() => addEntity(grid, -1, 3, entity)).toThrow(
			'Invalid grid coordinates !'
		)
		expect(() => addEntity(grid, 0, -1, entity)).toThrow(
			'Invalid grid coordinates !'
		)
		expect(() => addEntity(grid, 0, 4, entity)).toThrow(
			'Invalid grid coordinates !'
		)
	})
})

describe('findEntity', () => {
	const grid = createGrid(5)
	const entity = { id: 2, type: 'zombie' }

	it('returns coordinates of entity', () => {
		const updatedGrid = addEntity(grid, 3, 4, entity)

		expect(findEntity(updatedGrid, entity.id)).toEqual({
			coordinates: { x: 3, y: 4 },
			entity,
		})
	})
})

describe('removeEntity', () => {
	it('removes an entity to grid based on coordinates', () => {
		const grid = createGrid(4)

		grid[3][1].entities = [{ id: 9, type: 'zombie' }]

		const updatedGrid = removeEntity(grid, 3, 1, 9)
		expect(updatedGrid[3][1].entities).toEqual([])
	})

	it('removes an entity that does not exist', () => {
		const grid = createGrid(4)

		grid[3][1].entities = [{ id: 9, type: 'zombie' }]

		const updatedGrid = removeEntity(grid, 3, 1, 123)
		expect(updatedGrid[3][1].entities).toEqual([{ id: 9, type: 'zombie' }])
	})
})

describe('moveEntity', () => {
	const entity = { id: 2, type: 'creature' }
	const grid = createGrid(2)

	it('moves to its new position on grid', () => {
		grid[0][0].entities = [entity]

		const updatedGrid = moveEntity(grid, 2, 'D')

		expect(updatedGrid[0][0].entities).toEqual([])
		expect(updatedGrid[0][1].entities).toEqual([entity])
	})

	it('its horizontal movement is circular', () => {
		grid[0][1].entities = [entity]

		const updatedGrid = moveEntity(grid, 2, 'D')

		expect(updatedGrid[0][1].entities).toEqual([])
		expect(updatedGrid[0][0].entities).toEqual([entity])
	})

	it('its vertical movement is circular', () => {
		grid[0][0].entities = [entity]

		const updatedGrid = moveEntity(grid, 2, 'L')

		expect(updatedGrid[0][0].entities).toEqual([])
		expect(updatedGrid[1][0].entities).toEqual([entity])
	})
})

describe('calculateDirectionMagnitude', () => {
	test.each`
		direction   | magnitudeCoordinates
		${'U'}      | ${{ x: 0, y: -1 }}
		${'D'}      | ${{ x: 0, y: 1 }}
		${'L'}      | ${{ x: -1, y: 0 }}
		${'R'}      | ${{ x: 1, y: 0 }}
		${'foobaz'} | ${{ x: 0, y: 0 }}
	`(
		'return $magnitudeCoordinates when given a direction of $direction',
		({ direction, magnitudeCoordinates }) => {
			expect(calculateDirectionMagnitude(direction)).toMatchObject(
				magnitudeCoordinates
			)
		}
	)
})

describe('normaliseCoordinate', () => {
	const grid = createGrid(3)

	test.each`
		movementMagnitude | normalisedMovementMagnitude
		${-5}             | ${1}
		${-4}             | ${2}
		${-3}             | ${0}
		${-2}             | ${1}
		${-1}             | ${2}
		${0}              | ${0}
		${1}              | ${1}
		${2}              | ${2}
		${3}              | ${0}
		${4}              | ${1}
		${5}              | ${2}
	`(
		'return $normalisedMovementMagnitude when given a magnitude of $movementMagnitude for grid size 3',
		({ movementMagnitude, normalisedMovementMagnitude }) => {
			expect(normaliseCoordinate(grid.length, movementMagnitude)).toEqual(
				normalisedMovementMagnitude
			)
		}
	)
})
