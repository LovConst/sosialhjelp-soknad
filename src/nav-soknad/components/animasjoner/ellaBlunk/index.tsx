import React from "react";
import styled from "styled-components";

const StyledEllaBlunk = styled.svg`
    .oyne {
        animation-name: oyne;
        animation-duration: 2400ms;
        animation-iteration-count: infinite;
        animation-timing-function: ease-out;
        transform-origin: 50% 42%;
    }

    @keyframes oyne {
        0%,
        16% {
            transform: scaleY(1);
        }
        8% {
            transform: scaleY(0);
        }
    }
`;

const EllaBlunk = () => {
    return (
        <StyledEllaBlunk
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 175 175"
            width="100%"
            pointerEvents="none"
        >
            <title>Veileder</title>
            <defs>
                <circle id="ella-blunk-a" cx="87.5" cy="87.5" r="87.5" />
            </defs>
            <g fill="none" fillRule="evenodd">
                <mask id="ella-blunk-b" fill="#fff">
                    <use href="#ella-blunk-a" />
                </mask>
                <use fill="#A8D5C2" href="#ella-blunk-a" />
                <g mask="url(#ella-blunk-b)">
                    <path
                        fill="#E7E5E2"
                        fillRule="nonzero"
                        d="M118.804 84.434c-3.028 9.858-8.954 18.041-16.55 23.049l.39 4.39-.003.179-4.105 36.188h-26.04l-.108-.76-5.034-35.49.186-4.44c-7.633-4.994-13.594-13.19-16.638-23.075-.103.01-.208.015-.314.015v-.886.886c-1.97 0-3.53-1.727-3.53-3.82V68.831c0-1.402.702-2.641 1.757-3.306 1.646-22.102 17.114-39.473 36.03-39.473 18.867 0 34.303 17.277 36.02 39.294 1.232.601 2.076 1.944 2.076 3.485v11.84c0 2.093-1.558 3.819-3.53 3.819v-.886.886c-.207 0-.41-.02-.607-.056z"
                    />
                    <path
                        fill="#635E59"
                        d="M71.536 73.708c-2.383.18-3.05-3.34-2.332-5.638.135-.436.924-2.419 2.32-2.419s2.012 1.084 2.098 1.27c1.026 2.241.522 6.589-2.086 6.787m26.599 0c2.384.18 3.05-3.34 2.333-5.638-.135-.436-.924-2.419-2.321-2.419-1.395 0-2.011 1.084-2.097 1.27-1.026 2.241-.522 6.589 2.085 6.787"
                        className="oyne"
                    />
                    <path
                        fill="#59514B"
                        fillRule="nonzero"
                        d="M85.592 77.754c1.401-.216 2.359-.08 2.701.341 1.294 1.593.88 3.279-1.34 4.662-1.167.728-2.773.984-3.624.607a.826.826 0 00-.667 1.509c1.406.623 3.568.278 5.161-.714 3.017-1.88 3.708-4.692 1.748-7.106-.83-1.02-2.298-1.227-4.23-.93a.825.825 0 00.25 1.631zm9.388 12.03c-.075.17-.245.496-.52.926a11.696 11.696 0 01-1.751 2.138c-2.107 2.027-4.848 3.2-8.337 3.092-3.403-.104-6.132-1.258-8.272-3.12a12.292 12.292 0 01-1.953-2.144 7.51 7.51 0 01-.58-.927.823.823 0 10-1.477.729c.12.246.356.648.716 1.155.59.831 1.325 1.66 2.214 2.433 2.416 2.101 5.503 3.407 9.301 3.524 3.955.121 7.117-1.231 9.529-3.552a13.335 13.335 0 002-2.44c.322-.507.532-.908.639-1.154a.823.823 0 10-1.51-.66z"
                    />
                    <path
                        fill="#FFF"
                        fillRule="nonzero"
                        d="M85 144.194l9.174-17.348 7.122-17.348c-5.432 4.406-10.864 6.609-16.296 6.609-5.432 0-10.864-2.203-16.296-6.609l7.356 17.348L85 144.194z"
                    />
                    <path
                        fill="#0C5EA8"
                        d="M101.289 108.387c4.665 1.27 11.594 4.781 17.357 10.549C124.406 124.7 129 133.372 129 140.1v40.44H41V140.1c0-6.715 4.497-15.372 10.153-21.13 5.84-5.948 12.918-9.507 17.553-10.686.136 3.782 5.567 13.549 16.294 29.3 10.632-15.612 16.062-25.344 16.289-29.198z"
                    />
                    <path
                        fill="#3E3832"
                        d="M40.884 140.656l-.002-73.239c0-27.24 19.51-49.323 43.58-49.323 24.065 0 44.656 18.945 44.656 46.185v3.138s.178 31.336-17.264 46.61c-3.846-1.788-7.923-3.84-10.353-4.758l-.164-1.863.089-.154c7.812-5.031 13.874-13.506 16.796-23.747.358.2.762.313 1.19.313 1.463 0 2.647-1.315 2.647-2.943V69a3.16 3.16 0 00-.48-1.692 2.718 2.718 0 00-1.98-.87c-.355 0-.693.076-1.004.202C82.982 70.888 70.56 46.517 69.51 46.515c0 0-14.895 14.034-17.383 19.186 0 0-.173.991-.397.828a2.67 2.67 0 00-1.004-.205c-1.534-.002-2.782 1.295-2.785 2.897v-.235 11.889c0 1.628 1.187 2.943 2.647 2.943.324 0 .634-.064.92-.182 2.955 10.246 9.055 18.712 16.904 23.71l.03.06-.074 1.765c-9.199 3.362-27.293 17.972-27.484 31.485z"
                    />
                </g>
                <g mask="url(#ella-blunk-b)">
                    <path
                        fill="#D2242A"
                        d="M121.052 152H96.947c-1.076 0-1.947-.9-1.947-2.012v-13.391c0-1.112.871-2.014 1.947-2.014h24.105c1.076 0 1.948.902 1.948 2.014v13.391c0 1.112-.872 2.012-1.948 2.012"
                    />
                    <path
                        fill="#FFF"
                        d="M115.01 144.096c0 3.29-2.632 5.959-5.88 5.959-3.253 0-5.886-2.67-5.886-5.959 0-3.288 2.633-5.958 5.887-5.958 3.247 0 5.88 2.67 5.88 5.958m-13.502 2.627h-1.148l1.226-3.044h1.15zm14.461 0h-.71l1.225-3.044h.712zm1.963 0h-.301l1.223-3.044h.301z"
                        className="nav-logo-hvit"
                    />
                    <path
                        fill="#C52D35"
                        d="M104.661 146.708h.903a.082.082 0 00.083-.082v-2.849a.082.082 0 00-.083-.082h-.912a.104.104 0 00-.105.107l-.36.897c-.021.046.015.102.063.102h.258a.07.07 0 01.072.073v1.752a.08.08 0 00.081.082"
                    />
                    <path
                        fill="#fff"
                        d="M106.623 146.708h.906c.047 0 .087-.036.087-.082v-2.849c0-.046-.04-.082-.087-.082h-1.408a.106.106 0 00-.106.107l-.36.897-.125.102h.72c.16 0 .292.128.292.293v1.532a.08.08 0 00.081.082m4.051-3.013h-.906a.082.082 0 00-.083.083v2.848c0 .046.038.082.083.082h.916c.06 0 .105-.047.105-.107l.359-.897a.072.072 0 00-.068-.102h-.25a.07.07 0 01-.07-.071v-1.753c0-.047-.042-.083-.086-.083"
                    />
                    <path
                        fill="#C52D35"
                        d="M106.948 146.708h.596a.106.106 0 00.104-.106l.36-.9a.073.073 0 00-.067-.101h-.251l-.742 1.107zm6.15-3.013h1.077c.053 0 .09.05.068.1l-1.14 2.867c-.01.03-.035.046-.067.046h-.975l.967-2.964a.076.076 0 01.07-.049"
                    />
                    <path
                        fill="#fff"
                        d="M111.748 143.695h-1.523c-.108 0 .437.106.476.206l1.077 2.712c.022.06.077.095.138.095h.924l-.95-2.91a.147.147 0 00-.142-.103m-1.989.966c0 .607-.076.643-.076.643s-.086-.581-.529-.581c-.435 0-.534.257-.534.449 0 .222.222.43.346.43h.793l-.468 1.05a.095.095 0 01-.087.056h-.36c-.378 0-1.362-.5-1.362-1.47s.732-1.543 1.342-1.543c.504 0 .935.351.935.966z"
                    />
                    <path
                        fill="#5A1F57"
                        d="M110.448 137.348h-2.498a.336.336 0 01-.334-.339v-.426c0-.186.15-.338.334-.338h2.498c.185 0 .335.152.335.338v.426c0 .188-.15.339-.335.339"
                    />
                    <path fill="#C2B5CF" d="M108.476 136.958h1.447V133h-1.447z" />
                </g>
            </g>
        </StyledEllaBlunk>
    );
};

export default EllaBlunk;
