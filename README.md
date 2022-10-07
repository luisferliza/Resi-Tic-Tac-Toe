
# ¿Puedes ganarle a esta IA jugando Totito?
Te presento a Resi, un mono virtual entrenado específicamente para jugar Totito mejor que tú. El pensamiento de Resi está regido por un algoritmo llamado Minimax y tiene un objetivo en mente, nunca perder, o al menos, reducir al máximo las posibilidades.

![Resi](https://user-images.githubusercontent.com/34200816/194456537-83a72629-192e-4ec3-8503-5e3a3332cf20.png)

## El algoritmo Minimax 
Minimax es un algoritmo perteneciente a la teoría de juegos, una rama muy popular de la matemática aplicada. Este algoritmo se basa en elegir en cada turno la mejor jugada posible para nosotros suponiendo que en el siguiente turno, nuestro adversario elegirá la mejor para él. Al final del juego se busca que siempre ganemos o por lo menos, logremos un empate.

### Funcionamiento 
En cada turno, es necesario crear un árbol de decisión que nos permita visualizar los diferentes movimientos posibles y seleccionar el que, en el futuro, tiene una mayor probabilidad de ganar. Consideremos el siguiente tablero de Totito:

![Estado inicial del juego](https://user-images.githubusercontent.com/34200816/194456543-f18c254d-f68c-4886-b688-5b97f5381b42.png)

Si asumimos que el turno actual es para las X, solo existen 3 posibilidades para realizar nuestro movimiento, puesto que únicamente quedan 3 casillas libres. Las diferentes posibilidades serían:

![Exploración del primer nivel del juego](https://user-images.githubusercontent.com/34200816/194456547-ae43b4ca-ad5c-4613-9a92-3822e2aaef16.png)

Pausa un segundo, no sigas leyendo. Considera las 3 opciones y razona cuál crees que sería el mejor movimiento.

Para nosotros como humanos, es sencillo notar que los caminos del centro y la derecha no nos convienen porque en el siguiente turno estaríamos a merced de nuestro oponente y perderíamos la partida. Para Resi, esto no es tan simple (A veces nosotros tampoco lo notamos a primera vista), necesita simular ese siguiente movimiento para darse cuenta que existe una gran probabilidad de perder. Veamos un nivel más del árbol

![Exploración del segundo nivel del juego](https://user-images.githubusercontent.com/34200816/194456548-cd723c24-6913-492e-ba1a-11a20fde09a3.png)

Si hubiéramos escogido el camino del centro o de la derecha, vemos que en un 50% de los casos evaluados hasta el momento, habríamos perdido. Desde el punto de vista de Minimax (y el mono Resi) si existe alguna posibilidad de perder, perderemos, puesto que el algoritmo asume que nuestro componente realizará el mejor movimiento posible. Considerando que nuestro oponente no desaprovecharía la oportunidad que le dimos, el único camino viable es el de la izquierda.

Vemos el árbol completo

![Árbol completo de posibilidades](https://user-images.githubusercontent.com/34200816/194456553-76be6b60-04b0-4794-9684-b79fe0f01da4.png)

En este árbol ya podemos evaluar todas las distintas posibilidades que puede tomar la partida a partir de un punto en concreto. El paso siguiente es asignar pesos en base al resultado, los pesos que asignamos a cada resultado depende del juego y hay una gran cantidad de estrategias con las que podemos premiar a nuestro modelo para que tome esas decisiones, pero están fuera del alcance de este artículo. 

Para el ejemplo del Totito, seleccionaremos 0 para un empate, 1 para ganar y -1 para perder. Dividimos cada nivel en Min y Max, Max es nuestro turno y buscamos tomar la decisión que nos devuelva el valor más alto. Min es el turno del oponente y asumimos que tomará la decisión que minimice nuestras posibilidades de ganar, la mas baja. Tomando en cuenta estas consideraciones, el árbol resultante ponderado sería este:

![Árbol completo con pesos asignados](https://user-images.githubusercontent.com/34200816/194456556-71ec7b46-d0f1-400d-bf21-25f5167bf334.png)

Esta imagen es una radiografía de lo que pensaría Resi, las flechas verdes nos indican el camino concreto que él seguiría para el movimiento dado y por supuesto, ganaría.

##  Limitaciones del Algoritmo 
Probablemente estés pensando que este algoritmo puede ser muy ineficiente, lo es, crece de manera exponencial y para muchos juegos no es viable utilizarlo. En nuestro Totito, el tablero consta de 9 espacios, si restamos el movimiento inicial del oponente, Resi únicamente tiene 8 espacios restantes por los cuales preocuparse, por lo que la profundidad máxima en el árbol que construye es de 8 niveles, uno por cada movimiento. El árbol resultante para este juego no es significativamente grande pero si se tratara de ajedrez, tendríamos que limitar la cantidad de niveles del árbol y tratar de tomar la mejor decisión en base a esto.

## La batalla contra Resi
Después de la teoría explicada en la sección anterior, conoces de forma muy detallada como funcionan los pensamientos de Resi, por lo que sería normal pensar que podrías ganarle, ¿O quizás no?

![2022-10-06 20_40_05-Document](https://user-images.githubusercontent.com/34200816/194456611-68a3480f-04f4-4470-82b5-d32bd7503901.png)