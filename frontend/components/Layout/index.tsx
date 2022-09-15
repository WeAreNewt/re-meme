import { Header } from "./Header";
import { Footer } from "../Footer/Footer"
import { Container } from "react-bootstrap";
import { RootState } from "../../store/store";
import { User } from "../../models/User/user.model";
import { useSelector } from "react-redux";
import { ConnectionBox } from "./ConnectionBox";

type PageLayoutProps = {
    children: React.ReactNode,
};

const PageLayout = ({ children }: PageLayoutProps) => {

    const user = useSelector<RootState, User | null>((state) => state.user.selectedUser);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="mb-[120px]">
                <Container fluid="md" className='h-full'>
                    {
                        !user && (
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