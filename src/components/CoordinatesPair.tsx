import React, { useState } from 'react'
import grid from 'styles/basic.css'

type CoordinatesPairProps = {
	optionsCount?: number
	name?: string
	label?: string
	onChange?: ({ target: { name, value, id } }: { target: { name: string; value: string; id: string } }) => void
}

const CoordinatesPair = ({ onChange, optionsCount = 0, label, name }: CoordinatesPairProps): JSX.Element => {
	const optionList = (): JSX.Element[] => {
		const options = [<option key={-1} value={'-'}></option>] as JSX.Element[]
		for (let i = 0; i < optionsCount; i++) {
			options.push(
				<option key={i} value={i}>
					{i}
				</option>
			)
		}

		return options
	}

	return (
		<div className={grid.threeColumn}>
			<label>{label}</label>

			<div className={grid.twoColumn}>
				<label>X:</label>
				<select onChange={onChange} name={name} id="x" data-testid={`${name}-x`}>
					{optionList()}
				</select>
			</div>

			<div className={grid.twoColumn}>
				<label>Y:</label>
				<select onChange={onChange} name={name} id="y" data-testid={`${name}-y`}>
					{optionList()}
				</select>
			</div>
		</div>
	)
}

export default CoordinatesPair
