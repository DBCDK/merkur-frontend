import FileList from "@/components/FileList";
import useConversionFiles from "@/hooks/useConversionFiles";
import {useCallback, useEffect, useState} from "react";
import {getSession, useSession} from "next-auth/client";
import {signIn} from "@dbcdk/login-nextjs/client";


const Converted = () => {
    const {conversionFiles, loadingConversionFiles} = useConversionFiles(true);
    const [conversionFilesList, setConversionFilesList] = useState();

    useEffect(() => {
        setConversionFilesList(conversionFiles)
    }, [loadingConversionFiles]);

    const [session] = useSession();

    const waitForSession = useCallback(async () => {
        let s = await getSession()
        if (!s) {
            signIn();
        }
    }, [session])

    useEffect(() => {
        waitForSession()
    }, [])

    return (
        <>
            <h2>Konverteringsservice</h2>
            Ses filen ikke? Gå evt. til&nbsp;
            <a
                href="http://dbcposthus.dbc.dk/dataleverancer/index.php"
                target="_blank"
            >Det gamle DBC-posthus</a>

            <FileList files={conversionFilesList}/>
        </>
    );
}

export default Converted;
