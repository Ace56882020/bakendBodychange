const generarUsuario = async (data) => {
  const password = JSON.stringify(
    Math.floor(Math.random() * (10000 - 1000)) + 1000
  );
  const nameUsuario = data.nombre;
  const nameApellido = data.apellido;
  let name = {};
  const codeUser = Math.floor(Math.random() * 1000);
  const indiceName = nameUsuario.indexOf(" ");
  if (indiceName !== -1) {
    name = nameUsuario.substring(0, indiceName);
  } else {
    name = nameUsuario;
  }
  //retiro acentuación / cambia a minusculas
  const nameR = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const nameResp = nameR.toLocaleUpperCase();

  let lastname = {};
  const indicelastname = nameApellido.indexOf(" ");
  if (indicelastname !== -1) {
    lastname = nameApellido.substring(0, indicelastname);
  } else {
    lastname = nameApellido;
  }
  //retiro acentuación / cambia a minusculas
  const lastnameR = lastname.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  const lastnameResp = lastnameR.toLocaleUpperCase().charAt(0).toUpperCase();

  const usuarioLogin = `${lastnameResp}${nameResp}${codeUser}`;
  console.log(usuarioLogin, password);
  const retorno = {
    usuarioLogin,
    password,
  };

  return retorno;
};

module.exports = generarUsuario;
