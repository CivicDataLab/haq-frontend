import styled from 'styled-components'

const TabbedComp = styled.div`
	* {
		color: inherit;
		margin: 0;
	}
	[role='tablist'] {
		padding: 0;

		a,
		li {
			display: inline-block;
		}

		a {
			text-decoration: none;
			padding: 0.5rem 1em;
		}

		[aria-selected] {
			border: 2px solid;
			background: #fff;
			border-bottom: 0;
			position: relative;
			top: 2px;
		}
	}

	[role='tabpanel'] {
		border: 2px solid;
		padding: 1.5rem;

		* + * {
			margin-top: 0.75rem;
		}
	}

	@media (max-width: 550px) {
		[role='tablist'] {
			li,
			a {
				display: block;
				position: static;
			}

			a {
				border: 2px solid #222 !important;
			}

			li + li a {
				border-top: 0 !important;
			}

			[aria-selected] {
				position: static;
			}
		}

		[role='tabpanel'] {
			border-top: 0;
		}
	}
`

export default TabbedComp
