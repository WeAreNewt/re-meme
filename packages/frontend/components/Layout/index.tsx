import { Container } from "react-bootstrap";
import { Header } from "./Header";
import { Footer } from "../Footer/Footer"

type PageLayoutProps = {
    children: React.ReactNode,
};

const PageLayout = ({ children }: PageLayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="mb-[120px]">{children}</main>
            <Footer />
        </div>
    )
}

export default PageLayout