import ToggleComp from "./ToggleComp"

const Toggle = ({ data }) => {
	function hideToggle(liveRegion: any, toggletip: any) {
		liveRegion.innerHTML = ''
		toggletip.setAttribute('aria-pressed', 'false')
	}

	function handleToggleClick(e: any) {
		const toggletip = e.target

		toggletip.setAttribute('aria-pressed', 'true')
		const message = toggletip.getAttribute('data-toggletip-content')
		const liveRegion = toggletip.nextElementSibling

		liveRegion.innerHTML = ''
		window.setTimeout(function () {
			liveRegion.innerHTML = `
      <span class="toggletip-bubble">${message}</span>
      `
		}, 10)

		// close on outside click
		document.addEventListener('click', function handler(e: any) {
			toggletip.setAttribute('aria-pressed', 'true')
			if (toggletip != e.target) {
				hideToggle(liveRegion, toggletip)
				this.removeEventListener('click', handler)
			}
		})

		// close on blur
		toggletip.addEventListener('blur', function handler() {
			hideToggle(liveRegion, toggletip)
			this.removeEventListener('click', handler)
		})

		// close on ESC click
		toggletip.addEventListener('keydown', function handler(e: any) {
			if ((e.keyCode || e.which) === 27) {
				hideToggle(liveRegion, toggletip)
				this.removeEventListener('click', handler)
			}
		})
	}

	return (
		<ToggleComp>
			<button
				type="button"
				data-toggletip-content={data}
				onClick={(e) => handleToggleClick(e)}
				aria-pressed="false"
				className="toggle__button"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="12"
					height="12"
					fill="none"
					viewBox="0 0 12 12"
					aria-hidden="true"
				>
					<path
						fill="#ABB0B0"
						d="M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0Zm.6 9H5.4V5.4h1.2V9Zm0-4.8H5.4V3h1.2v1.2Z"
					/>
				</svg>
				{/* <span className="sr-only">More info</span> */}
			</button>
			<span role="status"></span>
		</ToggleComp>
	)
}

export default Toggle
