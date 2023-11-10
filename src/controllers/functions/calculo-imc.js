// Fórmula: peso (kg) / [estatura (m)]2
// Con el sistema métrico, la fórmula para el IMC es el peso
// en kilogramos dividido por la estatura en metros cuadrados.
// Debido a que la estatura por lo general se mide en centímetros,
// divida la estatura en centímetros por 100 para obtener la estatura en metros.

// Ejemplo: Peso = 68 kg, Estatura = 165 cm/100 (1.65 m)
// Cálculo: 68 ÷ (1.65)2 = 24.98

// Las categorías de estado de
//  peso estándar asociadas con los rangos de IMC para adultos se muestran en la siguiente tabla.
// IMC                  Nivel de peso
// Por debajo de 18.5	Bajo peso
// 18.5 – 24.9      	Normal
// 25.0 – 29.9         	Sobrepeso
// 30.0 o más	        Obesidad

const calculoIMC = async (data) => {
  let msg = "";
  let retorno;
  const kg = data.kg;
  const estatura = data.estatura;
  const imc = kg / (estatura* estatura);
  if (imc < 18.5) {
    msg = "Bajo peso";
  }else if (imc >= 18.5 || imc <= 24.9) {
    msg = "Normal";
  }else if (imc >= 25.0 || imc <= 29.9) {
    msg = "Sobrepeso";
  }else{
      msg='Obesidad'
  }
  retorno={
      imc,
      msg
  }
  return retorno;
};

module.exports = calculoIMC;
