import { Coordinates, GridInfo } from 'lib/universeTypes'

export type WalkOfTheDeadProps = {
	gridSize: number
	moves: string[]
	zombieCoordinates: Coordinates
	creatureCoordinates: Coordinates[]
}

export type WalkOfTheDead = {
	score: number
	zombieCoordinates: Coordinates[]
}

export type NewWaveInfectionsProps = {
	grid: GridInfo[][]
	currentWaveZombieIds: number[]
	previousWaveZombieIds: number[]
	moves: string[]
}

export type NewWaveInfections = {
	nextWaveZombieIds: number[]
	newInfectionCount: number
}

export type BeginInfectionsProps = {
	grid: GridInfo[][]
	currentWaveZombieIds: number[]
	previousWaveZombieIds: number[]
	moves: string[]
	score?: number
}
