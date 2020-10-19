export class Producto {

  constructor(
    public idproductos: number,
    public nombreproducto: string,
    public descripcionproducto: string,
    public precioproducto: number,
    public cantidadproducto: number,
    public imagenproducto: string,
    public idrestaurante_Restaurante: number
  ){}
}
