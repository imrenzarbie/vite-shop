import { useState } from "react";
import { Button } from "@/components/ui/button";

const Parent = ({children}) => {
    const [isOpen, setIsOpen] = useState(false);

    console.log(isOpen);

    return <div>
        This is the parent element
        <Button onClick={() => setIsOpen(!isOpen)}>
            {isOpen === true ? "Close" :
            "Open"}
        </Button>
        {children}
    </div>
}

export default Parent