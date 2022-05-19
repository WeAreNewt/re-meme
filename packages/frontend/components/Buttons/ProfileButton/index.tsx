import { useAccount } from 'wagmi'
import { useApolloClient } from '@apollo/client';
import { GET_PROFILES } from '../../../queries/getProfiles';
import styles from '../../../styles/btns.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';


type ProfileButtonProps = {
    profiles?: any[]
}

export const ProfileButton = ({profiles}: ProfileButtonProps) => {
    const router = useRouter();
    const { data } = useAccount();
    const client = useApolloClient();

    function getProfiles(address?: string) {
        const request = { ownedBy: address };
        return client.query({
            query: GET_PROFILES,
            variables: {
              request,
            },
        })
    }

    async function testeando() {
        if(data) {
            const profiles = (await getProfiles(data.address)).data.profiles   
            if(profiles.items.length === 0) {
                console.log('nohay')
            }  else {
                // GUARDAR PERFIL EN REDUX
                console.log('hay')
            }
        }
    }

    const handleClick = () => {
        router.push("/profile");
    }

    /* if (data)
        return (
            <button className={styles.afterconnect} onClick={testeando} type="button">
            </button>
        ) */
        
    return (
        <button onClick={handleClick} disabled={!data} className={"flex items-center p-2 bg-lime border-4 border-black border-solid rounded-full " + (data ? "" : "opacity-30") } type="button">
            <Image src="/assets/icons/profile.svg" width="24" height="24" />
        </button>
    )
}