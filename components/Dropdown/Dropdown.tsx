import React from 'react'
import DropdownComp from './DropdownComp'

const Dropdown = (props) => (
	<DropdownComp className="dropdown">
		{props.heading && <label htmlFor="dropdown-select">{`${props.heading}:`}&nbsp;&nbsp;</label>}

		<select
			id="dropdown-select"
			// onChange={(e) => props.handleDropdownChange(e.target.value)}
			// value={props.default ? props.default : props.options[0]}
			className="dropdown__selector"
		>
			{props.options.map((option: any, index: any) => (
				<option key={`dropdown-${index}`}>{option}</option>
			))}
		</select>
	</DropdownComp>
)

export default Dropdown
