import * as React from 'react';
import {DigisosFarge} from "./DigisosFarger";


interface OwnProps {
	size?: number;
	visBakgrundsSirkel: boolean;
	bakgrundsFarge?: DigisosFarge;
}

// export enum EllaBackgroundColor {
// 	GREEN = "#6AB889",
// 	ORANGE = "#ffd399",
// 	RED = "red"
// }

class Brevkonvolutt extends React.Component<OwnProps, {}> {

	render(){

		const height = this.props.size || 60;
		const width = this.props.size || 60;

		const bakgrundsFarge = this.props.bakgrundsFarge || DigisosFarge.GRONN;
		const showBackgroundCircle: boolean = this.props.visBakgrundsSirkel;

		return(
			<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 100 100">
				{/*<g fill="none" fill-rule="evenodd">*/}
					{/*{ showBackgroundCircle &&*/}
					{/*<path fill={style}*/}
					      {/*d="M175 87.5q0-17.8-6.9-34.05-6.6-15.7-18.75-27.8-12.1-12.1-27.8-18.75Q105.3 0 87.5 0 69.7 0 53.45 6.9q-15.7 6.65-27.85 18.75-12.1 12.1-18.75 27.8Q0 69.7 0 87.5q0 17.8 6.85 34.05 6.65 15.7 18.75 27.85 12.15 12.1 27.85 18.75Q69.7 175 87.5 175q17.8 0 34.05-6.85 15.7-6.65 27.8-18.75 12.15-12.15 18.75-27.85Q175 105.3 175 87.5z"*/}
					      {/*id="a"/>*/}
					{/*}*/}
					{/*<path fill="#0C576F" d="M4.527 30.308c-.692-.693-3.967-3.072-3.274-3.765L.142 23.029 26.369.558a1.774 1.774 0 0 1 2.509 0l26.225 22.47-5.94 12.858c.69.692-21.72 12.164-22.412 12.858L4.527 30.308z"/>*/}
					{/*<path fill="#DCDCD2" d="M49.739 46.985H5.509a.552.552 0 0 1-.551-.55V16.607a.55.55 0 0 1 .55-.551h44.23a.55.55 0 0 1 .55.55v29.829c0 .3-.246.55-.55.55"/>*/}
					{/*<path fill="#8F9395" d="M13.765 29.771h27.716V27.59H13.765zM13.765 34.705h27.716v-2.181H13.765zM13.765 39.641h27.716v-2.182H13.765zM13.765 44.575h27.716v-2.18H13.765z"/>*/}
					{/*<path fill="#D94C56" d="M2.216 59.659H46.96c1.147 0-46.818-36.63-46.818-36.63v34.555c0 1.145.93 2.075 2.075 2.075"/>*/}
					{/*<path fill="#C52C35" d="M53.03 59.659H8.287c-1.146 0 46.818-36.63 46.818-36.63v34.555a2.076 2.076 0 0 1-2.075 2.075"/>*/}
				{/*</g>*/}
				<g>
					<rect fill="none" id="canvas_background" height="402" width="582" y="-1" x="-1"/>
				</g>
				<g>
					{showBackgroundCircle &&
					<path stroke="null" id="a"
					      d="m98.16797,51.04702q0,-9.53263 -3.69523,-18.23518q-3.53457,-8.408 -10.0414,-14.88804q-6.48005,-6.48005 -14.88804,-10.0414q-8.70254,-3.69523 -18.23518,-3.69523q-9.53263,0 -18.23518,3.69523q-8.408,3.56135 -14.91482,10.0414q-6.48005,6.48005 -10.0414,14.88804q-3.66846,8.70254 -3.66846,18.23518q0,9.53263 3.66846,18.23518q3.56135,8.408 10.0414,14.91482q6.50683,6.48005 14.91482,10.0414q8.70254,3.66846 18.23518,3.66846q9.53263,0 18.23518,-3.66846q8.408,-3.56135 14.88804,-10.0414q6.50683,-6.50683 10.0414,-14.91482q3.69523,-8.70254 3.69523,-18.23518z"
					      fill={bakgrundsFarge}/>
					}
					<path id="svg_2" d="m28.43327,48.04188c-0.692,-0.693 -3.967,-3.072 -3.274,-3.765l-1.111,-3.514l26.227,-22.471a1.774,1.774 0 0 1 2.509,0l26.225,22.47l-5.94,12.858c0.69,0.692 -21.72,12.164 -22.412,12.858l-22.224,-18.436z" fill="#0C576F"/>
					<path id="svg_3" d="m73.64527,64.71888l-44.23,0a0.552,0.552 0 0 1 -0.551,-0.55l0,-29.828a0.55,0.55 0 0 1 0.55,-0.551l44.23,0a0.55,0.55 0 0 1 0.55,0.55l0,29.829c0,0.3 -0.246,0.55 -0.55,0.55" fill="#DCDCD2"/>
					<path id="svg_4" d="m37.67127,47.50488l27.716,0l0,-2.181l-27.716,0l0,2.181zm0,4.934l27.716,0l0,-2.181l-27.716,0l0,2.181zm0,4.936l27.716,0l0,-2.182l-27.716,0l0,2.182zm0,4.934l27.716,0l0,-2.18l-27.716,0l0,2.18z" fill="#8F9395"/>
					<path id="svg_5" d="m26.12227,77.39288l44.744,0c1.147,0 -46.818,-36.63 -46.818,-36.63l0,34.555c0,1.145 0.93,2.075 2.075,2.075" fill="#D94C56"/>
					<path id="svg_6" d="m76.93627,77.39288l-44.743,0c-1.146,0 46.818,-36.63 46.818,-36.63l0,34.555a2.076,2.076 0 0 1 -2.075,2.075" fill="#C52C35"/>
				</g>
			</svg>
		)
	}
}

export default Brevkonvolutt;