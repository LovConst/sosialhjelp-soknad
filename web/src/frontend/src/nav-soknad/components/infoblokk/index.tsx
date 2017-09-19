import * as React from "react";
// import Info from "../svg/Info";
import { Panel } from "nav-frontend-paneler";
import Icon from "nav-frontend-ikoner-assets";

import "./infoblokk.css";

interface Props {
	tittel?: string;
}

const Infoblokk: React.StatelessComponent<Props> = ({ children, tittel }) => {
	return (
		<Panel className="skjema-infoblokk">
			<div className="skjema-infoblokk__content">
				<div className="skjema-infoblokk__icon">
					<Icon kind="info-sirkel" />
				</div>
				{tittel ? <h2>{tittel}</h2> : null}
				{children}
			</div>
		</Panel>
	);
};

export default Infoblokk;
