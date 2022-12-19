const { Observable } = require('rxjs');
const { filter } = require('rxjs/operators');

const doSomething = () => {
  return new Promise((resolve) => {
    // resolve('valor 1');
    // resolve('valor 2'); //solo ejecuta lo que debe y no peudo hacer mas  alores a esa No es un stream constante de datos
    setTimeout(() => {
      resolve('valor 3');
    }, 3000)
  })
}

const doSomething$ = () => {
  return new Observable(observer => {
    observer.next('valor 1 $');
    observer.next('valor 2 $');
    observer.next('valor 3 $'); //con un Observable puedo emitir varios valores proque es un strem continuo de datos
    observer.next(null);
    setTimeout(() => {
      observer.next('valor 4 $');
    }, 5000) //vamos a emitir el valor 4 despues de 5 segundos
    setTimeout(() => {
      observer.next(null);
    }, 8000)
    setTimeout(() => {
      observer.next('valor 5 $');
    }, 10000)
  })
}
// creamos una funsion que se llama sola
(async () => {
  const rta = await doSomething();
  console.log(rta);
})();

(() => {
  const obs$ = doSomething$();
  obs$
    .pipe(filter(value => value !== null))
    .subscribe(rta => {
      console.log(rta);
    })
})();
