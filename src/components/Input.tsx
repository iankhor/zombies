import React from 'react'
import grid from 'styles/basic.css'

type InputProps = {
	label?: string
	name?: string
	placeholder?: string
	onChange?: any
}

const Input = ({ name, label, onChange, placeholder }: InputProps): JSX.Element => {
	return (
		<div className={grid.twoColumn}>
			<div>{label}</div>
			<input data-testid={name} onChange={onChange} placeholder={placeholder} />
		</div>
	)
}

export default Input
