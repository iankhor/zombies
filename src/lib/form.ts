import { Coordinates } from 'lib/gridTypes'

type CreatureCoordinates = {
	[creature: string]: Coordinates
}

type RawForm = {
	['grid-size']: number
	moves: string[]
	['zombie-init']: Coordinates
} & CreatureCoordinates

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