import React, { useState } from 'react'

type CoordinatesPairProps = {
	optionsCount?: number
	id?: string
	label?: string
	onSelect?: () => void
}

const CoordinatesPair = ({ optionsCount = 0, label, id }: CoordinatesPairProps): JSX.Element => {
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
			<select id={`${id}-x`}>{optionList()}</select>
			<select id={`${id}-y`}>{optionList()}</select>
		</p>
	)
}

export default CoordinatesPair
