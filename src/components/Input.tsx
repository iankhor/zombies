import React from 'react'

type InputProps = {
	label?: string
	name?: string
	placeholder?: string
	onChange?: any
}

const Input = ({ name, label, onChange, placeholder }: InputProps): JSX.Element => {
	return (
		<p>
			<label>
				{label}
				<input name={name} onChange={onChange} placeholder={placeholder} />
			</label>
		</p>
	)
}

export default Input
