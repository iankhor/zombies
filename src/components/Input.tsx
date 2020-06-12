import React from 'react'

type InputProps = {
	label?: string
	id?: string
	placeholder?: string
	onChange?: any
}

const Input = ({ label, id, onChange, placeholder }: InputProps): JSX.Element => {
	return (
		<p>
			<label>
				{label}
				<input id={id} onChange={onChange} placeholder={placeholder} />
			</label>
		</p>
	)
}

export default Input
