import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import { selectedEnvironment } from "../config/environments";
import { User } from "../models/User/user.model";
import { GET_PROFILES } from "../queries/getProfiles";

interface GetProfilesVariables {
    request: {
        ownedBy: string
    },
    forSources: string[]
}

interface GetProfilesData {
    profiles: {
        items: User[]
    }
}

const useLensProfiles = () => {
    const { data } = useAccount()
    const [getProfiles, { loading, data: profiles }] = useLazyQuery<GetProfilesData, GetProfilesVariables>(GET_PROFILES)

    useEffect(() => {
        if(data?.address) {
            getProfiles({variables: { request: { ownedBy: data.address }, forSources: [selectedEnvironment.appId]}})
        }
    }, [data?.address, getProfiles])

    return { data: profiles, loading }
}

export default useLensProfiles;