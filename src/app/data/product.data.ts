import { Product } from "../models/product";

export const products: Product[] = [
    new Product(1, 'Teclado mecanico Asus RGB', 'Algun teclado mecanico con luces RGB cherry red', 1000),
    new Product(2, 'Samsung Smart TV LED 75', 'Algun LCD excelente OLED', 2000),
    new Product(3, 'Sony Camara Video', 'alguna camara de video para streaming', 3100),
    new Product(4, 'Corsair memorias ram 16 GB DDR5', 'Memoria ram optimizadas para video juegos', 1800 ),
    new Product(5, 'Nvidia ASUS RTX4900', 'Tarjeta de video NVidia optimizada para tareas multicore video juegos en 4k', 5000 ),
    new Product(6, 'CPU Intel core i7', 'CPU optimizadas para tareas multicore', 4000 ),
]