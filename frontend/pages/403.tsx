import Link from "next/link"

const Forbidden: React.FC<{}> = () => {

    return (
        <div className='flex justify-center items-center flex-col mt-40'>
        <div className="bg-orange comic-border n:p-4 rounded-full text-center w-2/6">
            <h2 className="text-2xl">403 • FORBIDDEN</h2>
        </div>
        <div className="comic-border bg-white n:p-4 lg:p-10 rounded-4xl text-center mt-8 w-4/12">
            <h2 className="text-base">Your country does not have access to this domain.</h2>
        </div>
    </div>
    )
}

export default Forbidden
