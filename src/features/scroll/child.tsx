import { useEffect } from "react";

const Child = () => {

    useEffect(() => {
        console.log('child has re-rendered')
    })

    return <div>This is the Child Element</div>
}

export default Child