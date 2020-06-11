type Entity = {
  id: number
  type: string
}

type GridInfo = {
  entities:  Entity[]
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

export default {}
