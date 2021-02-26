import { Children, createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData {
    minutes: number;
    seconds: number;
    finalizou: boolean;
    isActive: boolean;
    comecarContagem: () => void;
    resetarContagem: () => void;
}

interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData);

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {
    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [finalizou, setFinalizou] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function comecarContagem() {
        setIsActive(true);
    }

    function resetarContagem() {
        clearTimeout(countdownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
        setFinalizou(false);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countdownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setFinalizou(true);
            setIsActive(true);
            startNewChallenge();
        }
    }, [isActive, time]);

    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            finalizou,
            isActive,
            comecarContagem,
            resetarContagem
        }}>
            {children}
        </CountdownContext.Provider>
    );
}