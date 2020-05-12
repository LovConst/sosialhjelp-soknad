import * as React from "react";
import {DigisosFarge} from "./DigisosFarger";

const Hensyn = (props: {size?: number; visBakgrundsSirkel: boolean; bakgrundsFarge?: DigisosFarge}) => {
    const height = props.size || 60;
    const width = props.size || 60;
    const bakgrundsFarge = props.bakgrundsFarge || DigisosFarge.SUKSESS;

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 80 80"
            className={"brevkonvolutt__" + bakgrundsFarge}
        >
            <defs>
                <path
                    id="a"
                    d="M0 9.325V53.17C0 54.733 1.25 56 2.794 56h37.413C41.75 56 43 54.733 43 53.17V2.83C43 1.267 41.75 0 40.207 0H9.724L0 9.325z"
                />
            </defs>
            <g fill="none" fillRule="evenodd">
                <circle cx="40" cy="40" r="40" fill="#FFD399" />
                <use fill="#FFF" transform="translate(18 12)" xlinkHref="#a" />
                <path fill="#C9C9C9" d="M27.813 12v6.5a2.826 2.826 0 0 1-2.82 2.832H18L27.813 12z" />
                <g fill="#515658">
                    <path d="M43.686 52.332V37.888H33.193v2.836h2.321v11.608h-2.321v2.836h12.814v-2.836zM39.6 35.47a4.936 4.936 0 1 0 0-9.872 4.936 4.936 0 0 0 0 9.872" />
                </g>
            </g>
        </svg>
    );
};

export default Hensyn;
