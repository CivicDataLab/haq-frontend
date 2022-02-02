import styled from 'styled-components'

const ToggleComp = styled.span`
	position: relative;

	.toggle__button {
		&[aria-pressed='true'] {
			+ [role='status'] {
				opacity: 100;
				width: 212px;
			}
		}

		svg {
			pointer-events: none;
		}
	}

	[role='status'] {
		position: absolute;
		max-width: 50vw;
		font-weight: 600;
		font-size: 12px;
		line-height: 133%;
		padding: 10px 12px;
		background-color: #666D6E;
		color: hsl(0, 33%, 99%);
		border: 1px solid #666D6E;
		border-radius: 8px;
		bottom: 150%;
		left: -8px;
		z-index: 10;
		opacity: 0;
		width: 0;
		isolation: isolate;

		&::before {
			border-left: 0.8em solid transparent;
			border-right: 0.8em solid transparent;
			border-top: 0.8em solid #666D6E;
			bottom: -0.8em;
			content: ' ';
			height: 0;
			left: 8px;
			width: 0;
			position: absolute;
			z-index: 9;
		}
	}
`
export default ToggleComp