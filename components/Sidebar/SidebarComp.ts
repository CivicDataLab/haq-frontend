import styled from 'styled-components'

const SidebarComp = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 2rem;
	border: 2px solid;
	padding: 1rem;

	.sidebar {
		flex-grow: 1;
	}

	.not-sidebar {
		flex-basis: 0;
		flex-grow: 999;
		min-inline-size: 50%;
	}
`

export default SidebarComp
