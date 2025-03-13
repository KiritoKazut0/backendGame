
export default interface ILevel {
    nivel: number,
    dificultad: string,
    descripcion: string
    patron:string,
    palabrasCorrectas: [string],
    score: number
    status: 'completado' | 'Pendiente'
}