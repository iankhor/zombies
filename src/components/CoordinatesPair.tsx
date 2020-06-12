import React, { useState } from 'react'

type CoordinatesPairProps = {
	optionsCount?: number
	name?: string
	label?: string
	onChange?: ({ target: { name, value, id } }: { target: { name: string; value: string; id: string } }) => void
}

const CoordinatesPair = ({ onChange, optionsCount = 0, label, name }: CoordinatesPairProps): JSX.Element => {
	const optionList = (): JSX.Element[] => {
		const options = [] as JSX.Element[]
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
		<p>
			<label>{label}</label>
			<select onChange={onChange} name={name} id="x">
				{optionList()}
			</select>
			<select onChange={onChange} name={name} id="y">
				{optionList()}
			</select>
		</p>
	)
}

export default CoordinatesPair
