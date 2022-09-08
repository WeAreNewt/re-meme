import Link from "next/link"
import { Container } from "react-bootstrap"
import Marquee from "react-fast-marquee"

const NotFound: React.FC<{}> = () => {

    return (
        <Container fluid="md" className='h-full'>
            <div className='flex justify-center items-center flex-col mt-[100px]'>
                <div className="w-full lg:w-[492px]">
                    <div className="bg-orange comic-border p-[22px] rounded-full text-center mb-[24px]">
                        <Marquee direction="left" speed={175} play gradient={false} className="flex h-full items-center">
                            <span className="text-xl font-bold">
                                404 • PAGE NOT FOUND
                            </span>
                        </Marquee>
                    </div>
                    <div className="main-container">
                        <h2 className="text-body-2-medium mb-[32px] text-center">Oops, we couldn&apos;t find the page you are looking for.</h2>
                        <button className="btn-medium">
                            <Link href='/'>
                                <a className='no-underline text-neutral-black'>
                                    Go to Home
                                </a>
                            </Link>
                        </button>
                    </div>

                </div>
            </div>
        </Container>
    )
}

export default NotFound