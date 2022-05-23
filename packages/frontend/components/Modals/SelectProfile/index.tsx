import { useApolloClient } from "@apollo/client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { User } from "../../../models/User/user.model";
import { GET_PROFILES } from "../../../queries/getProfiles";
import { ProfileCard } from "../../ProfileCard";

type SelectProfileProps = {
    show: boolean;
    onClose: () => void
    onProfileSelected: (profile: User) => void
}

const mockedProfiles = [
    {
        name: "cryptopunk",
        coverPicture: {
            uri: "/assets/imgs/punk.png",
        },
        stats: {
            totalPosts: 3
        }
    },
    {
        name: "crazycrypto",
        coverPicture: {
            uri: "/assets/imgs/crazy.png",
        },
        stats: {
            totalPosts: 9
        }
    },
] as User[];

export const SelectProfile = ({ show, onClose, onProfileSelected }: SelectProfileProps) => {
    const client = useApolloClient();
    const { data } = useAccount();
    const [selectedProfile, setSelectedProfile] = useState({} as User);
    const [profiles, setProfiles] = useState(mockedProfiles);

    useEffect(() => {
        const getProfiles = async (address: string) => {
            const request = { ownedBy: address };
            return client.query({
                query: GET_PROFILES,
                variables: {
                    request,
                },
            })
        }

        if (data) {
            getProfiles(data.address!)
                .then(res => {
                    if (res.error) {
                        //TODO Add feedback
                        console.log(res.error)
                        return;
                    }

                    console.log(res.data.profiles)
                    //setProfiles(res.data.profiles.items);
                });
        }
    }, [])

    const handleSelected = () => {
        onProfileSelected(selectedProfile);
    }

    const handleProfileSelected = (profile) => {
        setSelectedProfile(profile);
    }

    return (
        <div className={show ? "block" : "hidden"}>
            <div className="absolute h-screen w-screen z-20 flex items-center justify-center bg-lime-transparent" /* onClick={onClose} */>
                <div className="comic-border rounded-4xl bg-white p-10">
                    <p className="text-2xl text-center font-bold whitespace-pre-line px-8">{"Which Lens profile do\n you want to connect?"}</p>
                    {
                        profiles?.map((prof, index) => (
                            <div key={"profile-select-" + index} onClick={() => {handleProfileSelected(prof)}} className="border-b-2 border-gray-200 border-solid pb-2 mb-2 cursor-pointer">
                                <ProfileCard profile={prof} subText={`${prof.stats.totalPosts} memes created`} selected={selectedProfile === prof} />
                            </div>
                        ))
                    }
                    <div className="flex justify-center items-center space-x-4 mt-8">
                        <button disabled={!selectedProfile} onClick={handleSelected} className={"rounded-full border-black border-4 border-solid bg-purple px-6 py-2 font-bold " + (!selectedProfile ? "opacity-30" : "comic-border-mini")}>Select</button>
                        <button onClick={onClose} className="comic-border-mini rounded-full bg-white px-10 py-2 font-bold">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    )
}