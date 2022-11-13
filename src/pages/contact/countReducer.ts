export interface CounterState{
    data:number
    title:string
}

const initialState:CounterState={
    data:42,
    title:'test me bro'
}

export default function counterReduer(state=initialState,action:any){
    return state;

}