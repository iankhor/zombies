import { createGrid, addEntity, findEntity, removeEntity } from 'lib/grid'

describe('createGrid', () => {
  it('is a square grid', () => {
    const grid = createGrid(3)

    expect(grid[0]).toHaveLength(3)
    expect(grid).toHaveLength(3)
  })

  it('has the entities in each grid', () => {
    const grid = createGrid(2)

    expect(grid[0][0]).toEqual({ entities: [] })
    expect(grid[0][1]).toEqual({ entities: [] })
    expect(grid[1][0]).toEqual({ entities: [] })
    expect(grid[1][1]).toEqual({ entities: [] })
  })
})

describe('addEntity', () => {
  it('adds an entity to grid based on coordinates', () => {
    const grid = createGrid(4)
    const entity = { id: 2, type: 'zombie' }

    const updatedGrid = addEntity(grid, 1, 3, entity)

    expect(updatedGrid[1][3]).toMatchObject({ entities: [entity] })
  })

  it('does not override existing grid infomation', () => {
    const grid = createGrid(5)
    const entity = { id: 3, type: 'zombie' }
    grid[0][0] = { entities: [{ id: 2, type: 'creature' }] }

    const updatedGrid = addEntity(grid, 0, 0, entity)

    expect(updatedGrid[0][0].entities).toEqual(
      expect.arrayContaining([{ id: 3, type: 'zombie' }, { id: 2, type: 'creature' }])
    )
  })

  it('throws an error if given invalid coordinates', () => {
    const grid = createGrid(4)
    const entity = { id: 3, type: 'zombie' }

    expect(() => addEntity(grid, -1, 3, entity)).toThrow('Invalid grid coordinates !')
    expect(() => addEntity(grid, 0, -1, entity)).toThrow('Invalid grid coordinates !')
    expect(() => addEntity(grid, 0, 4, entity)).toThrow('Invalid grid coordinates !')
  })
})

describe('findEntity', () => {
  it('returns coordinates of entity', () => {
    const grid = createGrid(5)
    const entity = { id: 2, type: 'zombie' }

    const updatedGrid = addEntity(grid, 3, 4, entity)

    expect(findEntity(updatedGrid, entity.id)).toEqual({ x: 3, y: 4 })
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