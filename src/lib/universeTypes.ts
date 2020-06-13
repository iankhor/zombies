export type Entity = {
	id: number
	type: string
}

export type GridInfo = {
	entities: Entity[]
}

export type Coordinates = {
	x: number
	y: number
}

export type FoundEntity = {
	coordinates: Coordinates
	entity: Entity
}
