import styled from 'styled-components'

const DropdownComp = styled.div`
  display: flex;
  align-items: center;

	select {
		display: block;
		font-size: 1rem;
		color: #444;
		line-height: 1.5;
		padding: 0.6rem 1.7rem 0.5rem 0.5rem;
		width: 100%;
		max-width: 120px;
		box-sizing: border-box;
		margin: 0;
		border: 1px solid #aaa;
		box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
		border-radius: 0.5em;
		-moz-appearance: none;
		-webkit-appearance: none;
		appearance: none;
		background-color: #ffffff;
		background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='7' fill='none' viewBox='0 0 14 7'%3E%3Cpath fill='%23F65940' d='M.333.333 7 7 13.666.333H.333Z'/%3E%3C/svg%3E ");
		background-repeat: no-repeat, repeat;
		background-position: right 10% top 50%, 0 0;

		border: 1px solid rgba(0, 0, 0, 0.12);
		box-sizing: border-box;
		box-shadow: inset 0px 0px 4px rgba(0, 0, 0, 0.08);
		border-radius: 4px;

		&::-ms-expand {
			display: none;
		}

		&:hover {
			border-color: #888;
		}

		&:focus {
			border-color: #aaa;
			box-shadow: 0 0 1px 3px rgb(59, 153, 252);
			outline: none;
		}

		option {
			font-weight: normal;
		}

		&:disabled,
		&[aria-disabled='true'] {
			color: graytext;
			background-image: url("data:image/svg+xml,%3Csvg width='10' height='7' viewBox='0 0 10 7' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1.55152 0.591299L5.00041 4.04019L8.4493 0.591299C8.79596 0.244632 9.35596 0.244632 9.70263 0.591299C10.0493 0.937965 10.0493 1.49797 9.70263 1.84463L5.62263 5.92463C5.27596 6.2713 4.71596 6.2713 4.3693 5.92463L0.289297 1.84463C-0.0573698 1.49797 -0.0573698 0.937965 0.289297 0.591299C0.635964 0.253521 1.20485 0.244632 1.55152 0.591299Z' fill='%236C666E'/%3E%3C/svg%3E%0A"),
				linear-gradient(to bottom, #ffffff 0%, #e5e5e5 100%);
		}

		&:disabled:hover,
		&[aria-disabled='true'] {
			border-color: #aaa;
		}
	}
`

export default DropdownComp
