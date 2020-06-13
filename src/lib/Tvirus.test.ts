import walkOfTheDead from 'lib/Tvirus'

describe('walkOfTheDead', () => {
	describe('with a zombie without creatures', () => {
		const form = {
			gridSize: 4,
			moves: ['D', 'L', 'U', 'U', 'R', 'R'],
			zombieCoordinates: { x: 2, y: 1 },
			creatureCoordinates: [],
		}

		it('generates zombie coordinates', () => {
			expect(walkOfTheDead(form)).toMatchObject({
				zombieCoordinates: [{ x: 3, y: 0 }],
			})
		})
	})

	describe('with a zombie with multiple creatures', () => {
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
			expect(walkOfTheDead(form).zombieCoordinates).toEqual(
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
