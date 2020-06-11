type Entity = {
  id: number
  type: string
}

type GridInfo = {
  entities:  Entity[]
}

type Coordinates = {
  x: number
  y: number
}

type FoundEntity = {
  coordinates: Coordinates
  entity: Entity
}

export const createGrid = (size: number): GridInfo[][] => {
  const tempGrid = [] as GridInfo[][]
  let x, y

  for (x = 0; x < size; x++) {
    let tempRow = [] as GridInfo[]
    
    for(y = 0; y < size; y++) tempRow.push({ entities: [] })
    tempGrid.push(tempRow)
  }

  return tempGrid
}

export const addEntity = (grid: GridInfo[][], x: number, y: number, entity: Entity): GridInfo[][] => {
  try {
    grid[x][y] = { 
      ...grid[x][y], 
      entities: [...grid[x][y].entities, entity] 
    }
  } catch (e) {
    throw 'Invalid grid coordinates !'
  }
  
  
  return grid
}

export const findEntity = (grid: GridInfo[][], id: number): any => {
  let x: number, y: number
  let coordinates = {} as Coordinates
  let foundEntity = {} as Entity
  

  for (x = 0; x < grid.length; x++) {
    for (y = 0; y < grid.length; y++) {
      const entity = grid[x][y].entities.find(e => e.id === id)
      
      if (entity) {
        coordinates = { x, y }
        foundEntity = entity
      }
    }
  }

  return { coordinates, entity: foundEntity }
}

export const removeEntity = (grid: GridInfo[][], x: number, y: number, entityId: number): GridInfo[][] => {
  grid[x][y].entities = grid[x][y].entities.filter(e => e.id !== entityId)

  return grid
}

export const moveEntity = (grid: GridInfo[][], entityId: number, direction: string): GridInfo[][] => {
  const { coordinates: { x: currentX, y: currentY }, entity } = findEntity(grid, entityId)
  const { x: moveX , y: moveY } = calculateDirectionMagnitude(direction)
  const removedEntityGrid = removeEntity(grid, currentX, currentY, entityId)

  return addEntity(removedEntityGrid, currentX + moveX, currentY + moveY, entity)
} 

const calculateDirectionMagnitude = (direction: string): Coordinates => {
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

export default {}
