import styled from "styled-components";
import {RadioGroup} from "@navikt/ds-react";

// RadioGroup from react-ds but styled as a horizontal full-width panel.
export const HorizontalRadioGroup = styled(RadioGroup)`
    .navds-radio {
        width: 100%;
        border: 1px solid black;
        padding: 0 1rem;
        margin: 0 0 1rem 0;
        border-radius: 5px;
        background-color: white;
    }
`;

export const VerticalRadioGroup = styled(RadioGroup)`
    .navds-radio {
        border: 1px solid black;
        padding: 0 1rem;
        margin: 1rem 0 0 0;
        border-radius: 5px;
    }

    .navds-radio-buttons {
        display: flex;
        gap: 1rem;
        > * {
            flex-basis: 10rem;
        }
    }

    margin-bottom: 1rem !important;
`;
