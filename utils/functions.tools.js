
const tools = {};

tools.CreateCodeClasroom = ()=> {
function generarLetra(){
    var letras = ["A","B","C","D","E","F","0","1","2","3","4","5","6","7","8","9"];
    var numero = (Math.random()*15).toFixed(0);
    return letras[numero];
  }
  
  function colorHEX(){
    var color = "";
    for(var i=0;i<6;i++){
      color = color + generarLetra() ;
    }
    return color;
  }

  colorHEX()
}
  module.exports = tools;