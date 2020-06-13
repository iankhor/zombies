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
	describe('with a zombie without creatures', () => {
		const form = {
			gridSize: 4,
			moves: ['D', 'L', 'U', 'U', 'R', 'R'],
			zombieCoordinates: { x: 2, y: 1 },
			creatureCoordinates: [],
		}

		it('generates zombie coordinates', () => {
			expect(processForm(form)).toMatchObject({
				zombieCoordinates: [{ x: 3, y: 0 }],
			})
		})
	})

	describe('with a zombie with one creature', () => {
		const form = {
			gridSize: 4,
			moves: ['D', 'L', 'U', 'U', 'R', 'R'],
			zombieCoordinates: { x: 2, y: 1 },
			creatureCoordinates: [
				{ x: 0, y: 1 },
				{ x: 1, y: 2 },
				{ x: 3, y: 1 },
			],
		}

		it('generates zombie coordinates', () => {
			expect(processForm(form).zombieCoordinates).toEqual(
				expect.arrayContaining([
					{ x: 3, y: 0 },
					{ x: 2, y: 1 },
					{ x: 1, y: 0 },
					{ x: 0, y: 0 },
				])
			)
		})
	})
})
