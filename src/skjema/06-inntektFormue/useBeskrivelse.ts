import {useEffect, useState} from "react";
import {z} from "zod";
import {ValideringsFeilKode} from "../../digisos/redux/validering/valideringActionTypes";
import {useTranslation} from "react-i18next";
const MAX_CHARS = 500;

const BeskrivelseAvAnnetSchema = z.string().max(MAX_CHARS, {
    message: ValideringsFeilKode.MAX_LENGDE,
});

export const useBeskrivelse = (value: string | undefined, onSave: (beskrivelse: string) => void) => {
    const {t} = useTranslation("skjema");
    const [beskrivelse, setBeskrivelse] = useState<string>("");
    const [error, setError] = useState<string | undefined>(undefined);
    const validateBeskrivelseAvAnnet = (value: string) => {
        try {
            BeskrivelseAvAnnetSchema.parse(value);
            setError(undefined);
        } catch (e) {
            setError(t(e.issues[0].message));
        }
    };

    useEffect(() => {
        if (value) {
            setBeskrivelse(value);
            validateBeskrivelseAvAnnet(value);
        }
    }, [value, validateBeskrivelseAvAnnet]);

    const onChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
        setBeskrivelse(event.target.value);
        validateBeskrivelseAvAnnet(event.target.value);
    };

    const onBlur: React.ChangeEventHandler<HTMLTextAreaElement> = () => !error && onSave(beskrivelse);

    const registerAnnet = {
        name: "beskrivelseAvAnnet",
        value: beskrivelse,
        onChange,
        onBlur,
        error,
        maxLength: MAX_CHARS,
    };

    return {registerAnnet};
};
