export const Footer = () => {
    return (
        <div className="flex justify-center items-center ">
            <footer className="flex justify-between lg:fixed md:fixed sm:fixed bottom-8 mt-5 mb-2 bg-blue w-10/12 rounded-full items-center p-6 ">
            <span className="text-sm text-white ml-10 sm:ml-5 md:mr-3" >re:meme • Built by Newt @ the Aave Companies</span>
            <div className="flex flex-wrap items-center text-sm">
                <a className='no-underline text-white sm:mr-10 mr-3' href='https://github.com/WeAreNewt/re-meme'>GitHub</a>
                <a className='no-underline text-white sm:mr-10' href='terms-of-service'>Terms of Service</a>
                <a className='no-underline text-white sm:mr-5 mr-10 ' href='privacy-policy'>Privacy Policy</a>
            </div >
            </footer>
        </div>
    )
}