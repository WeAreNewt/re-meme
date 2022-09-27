import Link from "next/link";

export const RefreshNewMemeBtn = () => {
    return (
        <Link href="/" passHref={true}>
            <a className='icon-btn-medium lg:w-auto lg:btn-with-icon-medium no-underline hover:text-neutral-black'>
                <img src="/assets/icons/refresh.svg" className='icon-md lg:icon-sm' />
                <span className='hidden lg:block'>Refresh meme</span>
            </a>
        </Link>
    )
}