import React from 'react'
import Container from 'components/Container'
import '@testing-library/jest-dom'
import { render, fireEvent } from '@testing-library/react'

describe('submitting the inputs to start the zombie apocalypse', () => {
	it('can show us the scores and zombies position after entering inputs', () => {
		const { getByText, getByTestId, debug } = render(<Container />)

		const uniserveSizeInput = getByTestId('grid-size')

		fireEvent.change(uniserveSizeInput, { target: { value: 4 } })

		const zombieInitialCoordinateX = getByTestId('zombie-init-x')
		const zombieInitialCoordinateY = getByTestId('zombie-init-y')
		const addCreatureButton = getByText('Add creature')
		const upButton = getByText('Up')
		const downButton = getByText('Down')
		const leftButton = getByText('Left')
		const rightButton = getByText('Right')
		const submitButton = getByText('Submit')

		fireEvent.change(zombieInitialCoordinateX, { target: { name: 'zombie-init', value: '2', id: 'x' } })
		fireEvent.change(zombieInitialCoordinateY, { target: { name: 'zombie-init', value: '1', id: 'y' } })

		fireEvent.click(addCreatureButton)
		fireEvent.click(addCreatureButton)
		fireEvent.click(addCreatureButton)

		fireEvent.change(zombieInitialCoordinateX, { target: { name: 'creature0', value: '0', id: 'x' } })
		fireEvent.change(zombieInitialCoordinateY, { target: { name: 'creature0', value: '1', id: 'y' } })

		fireEvent.change(zombieInitialCoordinateX, { target: { name: 'creature1', value: '1', id: 'x' } })
		fireEvent.change(zombieInitialCoordinateY, { target: { name: 'creature1', value: '2', id: 'y' } })

		fireEvent.change(zombieInitialCoordinateX, { target: { name: 'creature2', value: '3', id: 'x' } })
		fireEvent.change(zombieInitialCoordinateY, { target: { name: 'creature2', value: '1', id: 'y' } })

		fireEvent.click(downButton)
		fireEvent.click(leftButton)
		fireEvent.click(upButton)
		fireEvent.click(upButton)
		fireEvent.click(rightButton)
		fireEvent.click(rightButton)

		fireEvent.click(submitButton)

		expect(getByText('score: 3')).toBeInTheDocument()
		expect(getByText('Zombie Positions: [{"x":0,"y":0},{"x":1,"y":0},{"x":2,"y":1},{"x":3,"y":0}]')).toBeInTheDocument()
	})
})
