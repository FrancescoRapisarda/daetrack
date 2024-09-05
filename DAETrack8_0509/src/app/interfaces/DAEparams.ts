export interface DAEparams{
    id: number,
    brand: string,
    model: string,
    codeNumber: string,
    address: string,
    positionDescription: string,
    latitude: number,
    langitude: number,
    status: string,
    lastMaintenance: string, // DATE?
    nextMaintenance: string, // DATE
    notes: string
}