import dynamic from "next/dynamic";

interface NoSsrWrapperProps {
    children?: React.ReactChild
}

const NoSsrWrapper : React.FC<NoSsrWrapperProps> = ({ children }) => {
    return <>{ children }</>
}

export default dynamic(() => Promise.resolve(NoSsrWrapper), { ssr: false });
