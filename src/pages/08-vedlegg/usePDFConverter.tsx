import * as React from "react";
import {konverterVedlegg} from "../../generated/file-converter-controller/file-converter-controller";

/**
 * React-hook for konvertering av PDF via backend.
 *
 * @returns {conversionPending} - True if a conversion is pending.
 * @returns {convertToPDF} - Function to upload a file for PDF conversion. Returns a promise that resolves to the converted PDF.
 * @throws {PdfConversionError} - If the conversion fails.
 */
export const usePDFConverter = () => {
    const [conversionPending, setConversionPending] = React.useState(false);

    const convertToPDF = async (file: Blob) => {
        setConversionPending(true);
        try {
            const blob = await konverterVedlegg({file: file});
            return blob;
        } catch (e) {
            throw new PdfConversionError(e);
            return null;
        } finally {
            setConversionPending(false);
        }
    };

    return {conversionPending, convertToPDF};
};

export class PdfConversionError extends Error {}
