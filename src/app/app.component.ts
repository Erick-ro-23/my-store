// import { NumberSymbol } from '@angular/common';
import { Component } from '@angular/core';

import { User } from './models/user-model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

//import {Producto} from './product.model';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  imgParent = '';
  showImg = true;
  token = '';
  imgRta = '';

  userChosen: User = {
    id: '',
    email: '',
    password: '',
    name: '',
  };
  users: User[] = [];
  profile = [];
  activeForm = false;

  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private filesService: FilesService
  ) {}

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  names: string[] = ['Yuli', 'Erick', 'Leo', 'Daniel'];
  newName = '';
  addName() {
    this.names.push(this.newName);
    this.newName = '';
  }
  deleteName(index: number) {
    this.names.splice(index, 1);
  }
  /* Este es otro programa */
  /*products:string [] = []
newProduct = '';
addProduct() {
  this.products.push(this.newProduct);
  this.newProduct = '';
}
deleteProduct(index:number){
  this.products.splice(index,1);
  this.newProduct = '';
}
increaseProduct(index:number){
  this.cantidad += 1 ;

}*/

  // box = {
  //   width: 100,
  //   heigth: 100,
  //   background: 'red',
  // };

  /* ngFor para arrays */

  // onScroll(event: Event) {
  //   const element = event.target as HTMLElement;
  //   console.log(element.scrollTop);
  // }

  // changeName(event: Event) {
  //   const element = event.target as HTMLInputElement;
  //   this.persona.name = element.value;
  // }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser() {
    this.usersService
      .create({
        name: 'Erick',
        email: 'erickrivao@mail.com',
        password: '1234567',
      })
      .subscribe((rta) => {
        console.log(rta);
      });
  }

  // login() {
  //   this.authService
  //     .login('erickrivao@mail.com', '1234567')
  //     .subscribe((rta) => {
  //       this.token = rta.access_token;
  //       console.log(rta);
  //     });
  // }

  // getProfile() {
  //   this.authService.profile(this.token).subscribe((profile) => {
  //     console.log(profile);
  //     this.usersService.$send.emit(profile);
  //   });
  // }

  getAllUsers() {
    this.usersService.getAll().subscribe((valor) => {
      console.log(valor);
    });
  }

  deletUser(user: User) {
    this.usersService.deleteUser(user.id).subscribe((res) => {
      this.usersService.getAll().subscribe((response) => {
        this.users = response;
      });
      console.log(user);
    });
    // const id = this.userChosen.id;
    // this.usersService.deleteUser(id).subscribe(() => {
    //   const usersIndex = this.users.findIndex(
    //     (item) => item.id == this.userChosen.id
    //   );
    //   this.users.splice(usersIndex, 1);
    // });
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit(): void {
    this.usersService.$send.subscribe((valor) => (this.activeForm = valor));
  }

  // bajar un archivo en ese caso un pdf:
  dowloadPdf() {
    this.filesService
      .getFile(
        'my.pdf',
        'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf',
        'aplication/pdf'
      )
      .subscribe();
  }

  // para subir un archivo:
  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.filesService.uploadFile(file).subscribe((rta) => {
        this.imgRta = rta.location;
      });
    }
  }
}
