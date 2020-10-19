export class Usuarios {
  constructor(
    public nombre: string,
    public apellido: string,
    public telefono: number,
    public email: string,
    public password: string,
    public tipoUsuario: string,
    public tiempoEstimado: 15
  ){}
}
