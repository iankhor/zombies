import { serializeForm } from 'lib/form'

describe('serializeForm', () => {
	it('does magic', () => {
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
