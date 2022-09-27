type RemixCountProps = {
    count: number,
    handleClick: () => void
}

export const RemixCount = ({count, handleClick}: RemixCountProps) => {
    return (
        <button disabled={count === 0} onClick={handleClick} className={"btn-with-icon-small-secondary"}>
            <img src="/assets/icons/remix.svg" className="icon-sm" />
                <span>{`${count} `}</span>
                <span className="hidden lg:block">remixes</span>
        </button>
    )
}