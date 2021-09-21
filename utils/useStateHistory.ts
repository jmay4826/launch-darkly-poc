import { useEffect, useRef, useState } from "react"

const useStateHistory = (stateValue: any) => {
    const history = useRef([JSON.stringify(stateValue)]);
    const [, setStateChanged] = useState(0);
    useEffect(() => {
        history.current.push(JSON.stringify(stateValue))
        setStateChanged(previous => previous + 1);
    }, [stateValue]); 

    return history;
}

export default useStateHistory;
