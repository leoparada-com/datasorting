// Este codigo crea datos aleatorios y los ordena segun el campo indicado por el usuario.
// contacto: leoparada.com@gmail.com

let myArray     = []
let n           = []
let array_n     = []
let name_option = []
let student     = []

console.log('======================== TABLA DE DATOS ALEATORIOS ===========================================')
for (var i = 0; i < 5; i++) {

    name_option     = ['Pedro', 'Juan', 'Diego','Hector','Mario','Victor','Ana','Teresa','Rocio','Ines','Doris','Elena']
    language_option = ['Spanish', 'English']
    car_option      = ['Toyota', 'BMW', 'Honda', 'Daewoo','Fiat','Chevrolet','Suzuki','Tesla']
    
    //             Math.round((Math.random() * (max - min) + min))
    n_age       =  Math.round((Math.random() * (50 - 21) + 21))
    n_name      =  Math.round((Math.random() * ((name_option.length-1) - 0) + 0))
    n_rut       =  Math.round((Math.random() * (20000000 - 10000000) + 10000000))
    n_language  =  Math.round((Math.random() * ((language_option.length-1) - 0) + 0))
    n_car       =  Math.round((Math.random() * ((car_option.length-1) - 0) + 0))

// OBJETO JAVASCRIPT ==========================================
    student = [{ 
        name: name_option[n_name],
        rut: n_rut,
        age: n_age, 
        language: language_option[n_language],
        car:  car_option[n_car]
    }];  
    //student.age = array_n[i];

    myArray =myArray.concat(student)
 }

 console.table(myArray)

 myArray_ordenado_rut = ordenarDatosSegunCampo(myArray,'name')

 // =================================== FUNCIONES ========================= 

function ordenarDatosSegunCampo(array_1,texto_1) {

    console.log('======================== TABLA ORDENADA POR RUT ===========================================')
    let texto_query_1                  = `myArray.map((x) => x.${texto_1})` // Ejemplo: myArray.map((x) => x.rut)
    let espacio_muestral_rut_1         = eval(texto_query_1);

    let texto_query_2                  = `myArray.map((x) => x.${texto_1})` // Ejemplo: myArray.map((x) => x.rut)
    let espacio_muestral_rut_2         = eval(texto_query_2);
    
    console.log('El contenido del campo '+texto_1)
    let espacio_muestral_rut_ordenado  = ordenarArray(espacio_muestral_rut_2)

    let serie_tiempo_posicion          = serialPosicion(espacio_muestral_rut_1,espacio_muestral_rut_ordenado)
    let myArray_ordenado_rut           = filtrarSerialPosicion(myArray,serie_tiempo_posicion)
    
    console.log('')
    console.log('======================== PROCESO ===========================================')
    console.log('======================== DATOS ORIGINALES ======================================')
    console.table(espacio_muestral_rut_1)
    console.log('======================== DATOS ORDENADOS ======================================')
    console.table(espacio_muestral_rut_ordenado)
    console.log('======================== SERIE DE TIEMPO RELACIONAL ==============================')
    console.table(serie_tiempo_posicion)
    console.log('======================== RESULTADO ===========================================')
    console.table(myArray_ordenado_rut)
    return myArray_ordenado_rut 
}

// ============================================================ 
function ordenarArray(array_1) {
    /* EXPLICACION
    Esta funcion permite que se ordenen correctamente los elementos de un array con elementos tipo numero
    */
   es_numerico = true;

   // ORDENAMIENTO PARA EL CASO NUMERICO
   array_1.forEach(element => {    
    if(Number.isInteger(element)) {
        console.log('hola mundo')
    }
    else{
        es_numerico = false; 
    }    
   });

   // ORDENAMIENTO PARA EL CASO NO NUMERICO
    let output = [];
    if (es_numerico){
        output =  array_1.sort((a,b) => a-b);
        console.log('es numerico y sera ordenado numericamente')
        return output;  
    }else{
        output =  array_1.sort();
        console.log('no es numerico y sera ordenado alfabeticamente')
        return output;  
    }    
}

// ============================================================ 
function serialPosicion(array_1, array_2) {

    /* EXPLICACION
    CONTEXTO:
        Cuando se produce el cambio de orden de elementos en un array, surge la necesidad de hacer
        un seguimiento a los elementos y definir  las nuevs posiciones. Esto se logra mediante un 
        vector serie de tiempo (serial de tiempo) cuyos numeros representan la nueva posicion de
        los elementos. La funcion propuesta compara 2 listados y entrega como resultado la
        serie te tiempo asociada al cambio de posiciones.

    METODOLOGIA:
    [1] se obtiene un serial para ver como fueron ordenados los numeros, comparando
        la version no-ordenada con la version ordenada, para usarlo como puntero en la busqueda
        del campo solicitado

    EJEMPLO : 
         array_1 = [2,4,3] // array sin ordenar
         array_2 = [2,3,4] // array ordenado
         return  = [0,2,1] // serial

    INPUTS
        array_1 : Array cualquiera de elementos
        array_2 : Array de elementos ordenados

    OUTPUTS :
        Serie de tiempo con nuevo orden de los elementos
    */
    let i      = 0;
    let serial = []

    array_1.forEach(element => {
      serial.push(array_1.indexOf(array_2[i])); 
      i = i+1;           
    });
    
    let sol = serial;
    //console.log(serial)
    return sol    
  }

// ============================================================ 
function filtrarSerialPosicion(array_1, array_2) {
    /* EXPLICACION
    Esta funcion devuelve un array reordenado segun un vector serie de tiempo que se le entrega como input
    */
    let myArray    = []
    let timeSeries = array_2
    //console.table(array_1)
    //console.table(array_2)
    for (const item in timeSeries) {
      myArray = myArray.concat(array_1.filter(num => array_1.indexOf(num) == timeSeries[item] ))
      }
  return myArray 
  }
  // ============================================================ 


