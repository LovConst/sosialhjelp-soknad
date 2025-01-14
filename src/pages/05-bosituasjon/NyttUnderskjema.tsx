import {UnmountClosed} from "react-collapse";
import * as React from "react";

// Liten pil opp for å sette skjemaet i kontekst med forrige
const UnderskjemaArrow = () => (
    <div className="w-0 h-0 border-[.75rem] border-t-0 border-transparent border-b-[#f1f1f1] ml-4" />
);

// Jeg får ikke refaktorert Underskjema enda; for mye kode som skal refaktoreres avhenger av den.
export const NyttUnderskjema = ({hidden, children}: {hidden?: boolean; children: React.ReactNode}) => (
    <UnmountClosed isOpened={!hidden}>
        <UnderskjemaArrow />
        <div className={"bg-[#f1f1f1] rounded-lg p-4"}>{children}</div>
    </UnmountClosed>
);
