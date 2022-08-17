export const Footer = () => {
    return (
        <div className="flex justify-center items-center ">
            <footer className="flex justify-between lg:fixed bottom-10 mt-5 mb-2 bg-blue w-10/12 rounded-full items-center p-6 ">
            <span className="text-sm text-white md:ml-10" >Memixer • Built by Newt Team @ AAVE</span>
            <div className="flex flex-wrap items-center text-sm">
                <a className='no-underline text-white md:mr-16 sm:mr-10' href=''>Terms of use</a>
                <a className='no-underline text-white' href=''>Privacy policy</a>
            </div >
            </footer>
        </div>
    )
}