import { useEffect, useState } from "react";

const useRefSizes = (ref?: HTMLDivElement | null) => {
    const [width, setWidth] = useState(0)
    const [height, setHeight] = useState(0)
    const [observer, _] = useState(new ResizeObserver(entries => {
        const selectedRef = entries[0]
        setWidth(selectedRef.contentRect.width)
        setHeight(selectedRef.contentRect.height)
    }))

    useEffect(() => {
        if(ref && observer) {
            observer.observe(ref)
            return () => observer.unobserve(ref)
        }
    }, [observer, ref])

    return { width, height }
}

export default useRefSizes;
