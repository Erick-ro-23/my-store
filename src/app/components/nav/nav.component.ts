import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { StoreService } from '../../services/store.service';
import { AuthService } from '../../services/auth.service';
import { CategoriesService } from '../../services/categories.service';

import { AppComponent } from 'src/app/app.component';
import { User } from '../../models/user-model';
import { Category } from '../../models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  activeMenu = false;
  activeForm = false;
  counter = 0;
  profile: User | null = null;
  categories: Category[] = [];

  constructor(
    private appComponent: AppComponent,
    private storeService: StoreService,
    private openF: UsersService,
    private authService: AuthService,
    private categoriesService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.storeService.myCart$.subscribe((products) => {
      this.counter = products.length;
    });
    this.openF.$openForm.subscribe((valor) => (this.activeForm = valor));
    this.openF.$send.subscribe((valor) => {
      this.activeForm = valor;
    });
    this.getAllCategories();
    // this.openF.$send.subscribe((userlog) => {
    //   this.profile = userlog;
    // });
  }

  toggelMenu() {
    this.activeMenu = !this.activeMenu;
  }

  toggleform() {
    this.activeForm = true;
    this.openF.$send.emit(this.activeForm);
  }

  login() {
    // this.authService
    //   .login('erickrivao@mail.com', '1234567')
    //   .subscribe((rta) => {
    //     this.token = rta.access_token;
    //     console.log(rta);
    //     this.authService.getProfile();
    //   });
    this.authService
      .loginAndGet('erickrivao@mail.com', '1234567')
      .subscribe((user) => {
        this.profile = user;
      });
  }

  getAllCategories() {
    this.categoriesService.getAll().subscribe((data) => {
      this.categories = data;
    });
  }
}
