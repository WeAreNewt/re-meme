export const Footer = () => {
    return (
        <div className="flex flex-col justify-center items-center mt-auto mb-[64px]">
            <footer className="flex flex-col w-10/12">
                <div className="flex xl:hidden bg-blue rounded-full justify-center p-3">
                    <span className="text-[12px] md:text-lg text-white ">re:meme • Built by Newt @ the Aave Fam</span>
                </div>
                <div className="bg-blue mt-[10px] flex flex-col items-center md:flex-row xl:hidden md:items-center md:justify-center rounded-3xl  p-3">
                    <a className='no-underline text-white px-4 py-2' href='https://forms.office.com/r/MQi8tj5d7Z' target="_blank" rel="noopener noreferrer">Submit Appeal</a>
                    <a className='no-underline text-white px-4 py-2' href='https://github.com/WeAreNewt/re-meme' target="_blank" rel="noopener noreferrer">GitHub</a>
                    <a className='no-underline text-white px-4 py-2' href='terms-of-service'>Terms of Service</a>
                    <a className='no-underline text-white px-4 py-2' href='privacy-policy'>Privacy Policy</a>
                </div>
                <div className="hidden text-md xl:flex xl:justify-between xl:items-center bg-blue xl:rounded-full  p-6">
                    <span className=" text-white pl-2" >re:meme • Built by Newt @ the Aave Fam</span>
                    <div className="flex flex-wrap items-center ">
                        <a className='no-underline text-white pr-8' href='https://forms.office.com/r/MQi8tj5d7Z' target="_blank" rel="noopener noreferrer">Submit Appeal</a>
                        <a className='no-underline text-white pr-8' href='https://github.com/WeAreNewt/re-meme' target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a className='no-underline text-white pr-8' href='terms-of-service'>Terms of Service</a>
                        <a className='no-underline text-white pr-2' href='privacy-policy'>Privacy Policy</a>
                    </div >
                </div>
            </footer>
        </div>
    )
}
