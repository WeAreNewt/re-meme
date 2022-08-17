const NotFound: React.FC<{}> = () => {

    return (
        <div className='flex justify-center items-center flex-col mt-40'>
        <div className="bg-orange comic-border n:p-4 rounded-full text-center w-2/6">
            <h2 className="text-2xl">404 • PAGE NOT FOUND</h2>
        </div>
        <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl text-center mt-8 w-4/12">
            <h2 className="text-base">Oops, we couldn&apos;t find the page you are looking for.</h2>
            <button className="rounded-full border-black border-3 border-solid bg-purple px-6 py-2 font-bold mt-4 comic-border-mini rounded-full"><a className='no-underline text-black' href='/'>Go to Home</a></button>
        </div>
    </div>
    )
}

export default NotFound