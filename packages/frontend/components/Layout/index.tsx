import { Container } from "react-bootstrap";
import { Header } from "./Header";

type PageLayoutProps = {
    children: React.ReactNode,
};

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    )
}

export default PageLayout