import { useRef, useState, useEffect, useCallback, MutableRefObject } from "react";

export class Cmd<Msg> {
    constructor(public unsafePerform: (update: (msg: Msg) => void) => void) { }
}

export const noCmd = new Cmd<any>(() => { })

export const useElmLikeReducer = <Msg, Model>(
    update: (msg: Msg, model: Model) => [Model, Cmd<Msg>],
    init: [Model, Cmd<Msg>]) => {


    const [initState, initEff] = init;
    const [model, setModel] = useState(initState);
    const [ranInit, setRanInit] = useState(false);
    const modelRef = useRef(model);


    const dispatchMsg = useCallback((msg: Msg) => {
        const [updatedModel, eff] = update(msg, modelRef.current);
        modelRef.current = updatedModel
        setModel(updatedModel);
        setTimeout(() => eff.unsafePerform(dispatchMsg), 0)
    }, [])

    useEffect(() => {
        if (!ranInit) {
            setRanInit(true)
            initEff.unsafePerform(dispatchMsg);
        }

    }, [ranInit, modelRef, dispatchMsg]);

    return [model, dispatchMsg] as const;
};

// commands 

export const delayed: <Msg>(ms: number, msg: Msg) => Cmd<Msg>
    = (ms, msg) => new Cmd(dispatch =>
        setTimeout(() => { dispatch(msg) }, ms)
    )

export const genRandom: <Msg>(
    toMsg: (int: number) => Msg
) => Cmd<Msg>
    = toMsg => new Cmd(dispatch =>
        dispatch(toMsg(Math.random())))
