import * as React from "react";
import {Button, Modal} from "@navikt/ds-react";
import {useTranslation} from "react-i18next";

const BehandlingAvPersonopplysningerModal = ({open, onClose}: {open: boolean; onClose: () => void}) => {
    const {t} = useTranslation("skjema");

    return (
        <Modal open={open} onClose={onClose}>
            <Modal.Header />
            <Modal.Body>
                <div
                    className="personopplysning_info"
                    dangerouslySetInnerHTML={{
                        __html: t("soknadsosialhjelp.forstesiden.bekreftInfoModal.body"),
                    }}
                />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => onClose()}>
                    {t("lukk")}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BehandlingAvPersonopplysningerModal;
