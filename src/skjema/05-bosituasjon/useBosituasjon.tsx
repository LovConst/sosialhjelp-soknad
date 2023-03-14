import {fetchPut, fetchToJson} from "../../nav-soknad/utils/rest-utils";
import useSWR from "swr";
import {SoknadsSti} from "../../digisos/redux/soknadsdata/soknadsdataReducer";
import {BosituasjonData} from "./bosituasjonTypes";
import {soknadsdataUrl} from "../../digisos/redux/soknadsdata/soknadsdataActions";

export const useBosituasjon = (behandlingsId?: string) => {
    const soknadUrl = behandlingsId ? soknadsdataUrl(behandlingsId, SoknadsSti.BOSITUASJON) : null;

    const {data, error, mutate} = useSWR<BosituasjonData>(soknadUrl, fetchToJson);

    // Updates local bosituasjon state first, then stores it to server.
    const setBosituasjon = async (nyBosituasjon: Partial<BosituasjonData>) => {
        if (!soknadUrl) return;
        const updatedBosituasjon = {...(data as BosituasjonData), ...nyBosituasjon};
        await mutate(
            async (dataPayload) => {
                await fetchPut(soknadUrl, JSON.stringify(dataPayload));
                // The put doesn't return anything, so we just return what we got back.
                return dataPayload;
            },
            // We assume the request succeeded and use the new data until fetchPut resolves
            {optimisticData: updatedBosituasjon}
        );
    };

    return {
        bosituasjon: data,
        setBosituasjon,
        isLoading: behandlingsId && !error && !data,
        isError: error,
    };
};