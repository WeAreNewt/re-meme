import { Container } from "react-bootstrap";
import { Header } from "./Header";
import { Footer } from "../Footer/Footer"

type PageLayoutProps = {
    children: React.ReactNode,
};

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default PageLayout