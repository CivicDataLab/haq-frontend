import Head from 'next/head'
import Toggle from 'components/Toggle/Toggle'
import Dropdown from 'components/Dropdown/Dropdown'
import Tabbed from 'components/Tabbed/Tabbed'
import Sidebar from 'components/Sidebar/Sidebar'
import { tabbedData } from 'data/tempData'

export default function Home() {
	return (
		<>
			<Head>
				<title>OPub</title>
			</Head>
			<div className="container">
				<h1>Component Library - alpha</h1>
				<div className="component">
					<h2>Toggletip</h2>
					<Toggle data={'Lorem Ipsum'} />
				</div>
				<div className="component">
					<h2>Dropdown</h2>
					<Dropdown
						// default={'A'}
						options={['A', 'B', 'C']}
						heading="Header"
					/>
				</div>
				<div className="component">
					<h2>Tabbed</h2>
					<Tabbed data={tabbedData} />
				</div>
				<div className="component">
					<h2>Sidebar</h2>
					<Sidebar />
				</div>
			</div>
		</>
	)
}
