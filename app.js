//Eliminamos la creación de la variable dentro de la función y la creamos fuera

let listaNumerosSorteados = [];
let numeroMaximo = 10; 
let numeroSecreto = generarNumeroSecreto();
let intentos = 1; //Es 1 porque al menos una vez lo intentará.
/*Queremos hacer que el juego arroje un número y que el próximo juego arroje 
un número diferente al anterio, no se repetirán los números.
Para esto, creamos la lista vacía donde se almacenarán los valores generados */







/*Con el DOM conectamos JS con el html es el puente
con el que se relacionan
*/

/*Con esto vamos a acceder al DOM:
El querySelector espera los parámetros de cuál va a ser el selector
al que se accederá.*/
//Como solo hay un h1 se puede poner directamente
/*let titulo = document.querySelector('h1'); //Se debe definir una variable 
//Esta variable es un objeto, es más complejo que los tipos de datos previamente vistos
//Como es un objeto, se le pueden ejecutar métodos disponibles
/*titulo.innerHTML = ("Juego del número secreto");     //con este método podemos hacer una llamada a juego*/

/*let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un número del 1 al 10'
*/

/*Cuando algo se repite varias veces, es automatizable. Y siempre hay que
optimizar el código, el código inicial lo comentaremos para mejor crear una
función.
*/

/*function asignarTextoElemento() {
    let titulo = document.querySelector('h1');
    titulo.innerHTML = ("Juego del número secreto actualizado");
}
*/
/*Se llama la función en JS o en html, pero en este último, solo
es en eventos*/
/*asignarTextoElemento();
 /*HOISTING: JS pone al principio para leer variables como funciones, asi
 que no importa donde se coloquen, las tendrá listas para ejecutarse 
 pese a que lee de arriba para abajo.
 */

 /*Ahora comentaremos la función porque está muy específica, la podemos 
 generalizar usando parámetros. Ya que podremos reutilizar la función
 n veces*/
 //Se cambió los elementos por esos parámetros
 //Como ya es general, cambiamos de nombre a la variable por algo más amplio

 function asignarTextoElementoGeneral(elemento,texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
}

//Creemos una función para un número aleatorio y agregarlo al texto:
/*function generarNumeroSecreto() {
    let numeroSecreto = Math.floor((Math.random()*10 + 1));
    return numeroSecreto;
    
}*/

asignarTextoElementoGeneral('h1', '¡Juego del numero secreto!');
//Podemos optimizar las líneas 14 y 15 con la función creada:
asignarTextoElementoGeneral('p','Indica un número del 1 al 100');

//Si queremos capturar lo que el usuario ingrese:
function verificarIntento() {
    /*Como pueden existir varios inputs, lo mejor será ser más específico 
    y buscarlo por id, como el elemento input tiene varios atributos
    se especificará que queremos el valor del mismo
    let numeroUsuario = document.querySelector('input');*/
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);
    //console.log(typeof(numeroUsuario));
    //El input recibe información y la saca como string, debemos convertirla en int
    console.log(numeroSecreto);
    //Estamos comparanto string con números
    //console.log(numeroUsuario);
    //Para serciorarnos que sea igual en valor e igual en tipo de dato se usan 3 ===
    /*console.log(numeroUsuario == numeroSecreto);*/
    //console.log(numeroSecreto === numeroUsuario);


    if (numeroUsuario === numeroSecreto) {
        /*Ahora modificaremos el texto de acierto, de esto:
        asignarTextoElementoGeneral('p', 'Acertaste el número');
        a esto:*/

        /*Usando el operador ternario, donde se evalúa una condición, 
        después del ? viene el valor verdadero y después de los : viene el falso*/
        asignarTextoElementoGeneral('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        /*Con esto podemos hacer que se remueva el atributo disabled solo cuando 
        el jugador acierte un juego */
        document.querySelector('#reiniciar').removeAttribute('disabled');

    } else {
        //El usuario no acertó
        if (numeroUsuario < numeroSecreto) {
            asignarTextoElementoGeneral('p','El número es mayor');
        } else {
            asignarTextoElementoGeneral('p', 'El numero es menor');
        }
        //Cada que no se cumpla el criterio, es donde el contador deberá aumentar
        intentos++;
        //Llamamos a la función cada que falle el jugador
        limpiarCaja();
    }  

    return;
}

/* Creamos una función para limpiar el valor del prompt */
function limpiarCaja() {
    /* Se puede acceder al elemento por ID con querySelector(que es un selector general)
    para ello usamos el # que indica que se trata de un ID  */
    /* let valorCaja = document.querySelector('#valorUsuario');
    //Damos el valor de vacío:
    valorCaja.value = ''; */

    /*No es necesario tanto código, podemos eliminar la variable y darle value = "" */
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    /*return Math.floor((Math.random()*10 + 1));
    Lo convertimos en un número: */
    //Cambiemos el 10 por numeroMaximo
    let numeroGenerado = Math.floor((Math.random() * numeroMaximo + 1));
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //Si ya sorteamos todos los números podemos generar un mensaje y salirnos
    //Creamos la condición de salida
    if (listaNumerosSorteados.length == numeroMaximo) {
        //Cambiamos el texto
        asignarTextoElementoGeneral('p', 'Ya se acabaron todos los números posíbles')
        
    } else {
        //Si el número generado está incluido en la lista, se hace una operación
        //includes pasa por el arreglo y verifica si algo existe en él o no
        if (listaNumerosSorteados.includes(numeroGenerado)) {
            /*Recursividad: la función se puede llamar a sí misma, es un proceso
        autoreferencial */
            return generarNumeroSecreto();
            /*El problema de la recursividad es que puede terminar en un bucle infinito
            para evitar esto, hay que agregar una condición de salida */

        } else {
            //Añadimos el numero generado al array
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }   
}

function condicionesIniciales() {
    asignarTextoElementoGeneral('h1', 'Juego del número secreto');
    asignarTextoElementoGeneral('p', `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;

}


function reiniciarJuego() {
    // *Limpiar caja
    limpiarCaja();
    // *Indicar mensaje de intervalos de números
    /*Podemos llamar los elementos o podemos crear una función que los llame 
    asignarTextoElementoGeneral('h1', 'Juego del número secreto');
    asignarTextoElementoGeneral('p', 'Indica un número del 1 al 10'); */
    condicionesIniciales();
    // *Generar el número aleatorio
    /* Se puede optimizar el código si ingresamos estas partes a mensajesIniciales()
    Sin embargo, ya no serán mensajes, sino condiciones iniciales y cambiamos su nombre
    numeroSecreto = generarNumeroSecreto();
    intentos = 1; */
    // *Deshabilitar el botón de "Nuevo Juego"
    /*Démosle un atributo al botón para que se desabilite */
    document.querySelector('#reiniciar').setAttribute('disabled', true);

    // *Inicializar el numero de intentos
}
 

