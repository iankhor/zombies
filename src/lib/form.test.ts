import { serializeForm, processForm } from 'lib/form'

describe('serializeForm', () => {
	it('serializes form', () => {
		const form = {
			'grid-size': 6,
			moves: ['D', 'L'],
			'zombie-init': { x: 1, y: 2 },
			'creature-0': { x: 2, y: 3 },
			'creature-1': { x: 5, y: 1 },
		}

		expect(serializeForm(form)).toMatchObject({
			gridSize: 6,
			moves: ['D', 'L'],
			zombieCoordinates: { x: 1, y: 2 },
			creatureCoordinates: [
				{ x: 2, y: 3 },
				{ x: 5, y: 1 },
			],
		})
	})
})

describe('processForm', () => {
	describe('without creatues', () => {
		const form = {
			gridSize: 4,
			moves: ['D', 'L', 'U', 'U', 'R', 'R'],
			zombieCoordinates: { x: 2, y: 1 },
			creatureCoordinates: [],
		}

		it('generates results', () => {
			expect(processForm(form)).toMatchObject({
				score: 3,
				creatureCoordinates: [],
				zombieCoordinates: [{ x: 3, y: 0 }],
			})
		})
	})
})
