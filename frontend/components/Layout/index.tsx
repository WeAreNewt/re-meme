import { Header } from "./Header";
import { Footer } from "../Footer/Footer"
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { ConnectionBox } from "./ConnectionBox";
import { RootState } from "../../lib/redux/store";

type PageLayoutProps = {
    children: React.ReactNode,
};

const PageLayout = ({ children }: PageLayoutProps) => {

    const selectedProfile = useSelector<RootState>((state) => state.user.selectedProfile);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="mb-[120px]">
                <Container fluid="md" className='h-full'>
                    {
                        !selectedProfile && (
                            <header className="hidden lg:block mb-[40px]">
                                <ConnectionBox />
                            </header>
                        )
                    }
                    {children}
                </Container>
            </main>
            <Footer />
        </div>
    )
}

export default PageLayout