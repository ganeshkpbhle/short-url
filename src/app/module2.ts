export interface chartData{
    id?:number
    date:string,
    created:Array<linkData>
}

export interface linkData{
    short:string,
    count:number
}

export interface drawList{
    name:string,
    value:number,
}

export interface draw{
    name:string,
    series:Array<drawList>
}