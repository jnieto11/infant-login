import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  items: any[] = [];
  user: string = '';
  constructor(private route: Router, private toastr: ToastrService) {
    if (localStorage.getItem('user')) { //Verificamos si estamos authenticados para mantener las rutas donde corresponde
      this.route.navigate(["home"]);
    }
  }


  ngOnInit(): void {
  }

  configItems(object: any) { //Recibimos el objeto emitido desde el componente password
    this.items = Object.assign([], object);
  }

  verifyCredentials() { //Realizamos validacion de credenciales para acceder
    if (this.user == 'juan') {
      let resp = [1, 2, 7]; //objetos de id que corresponde a animales requeridos para iniciar sesion perro, gato, caballo
      let next = 0;
      for (let i = 0; i < this.items.length; i++) {
        if (this.items.findIndex(x => x.id == resp[i]) >= 0) {
          next++;
        }
      }
      if (next == 3) {
        this.noty('success', 'Credenciales Correctas');
        localStorage.setItem("user", this.user); //Guardamos en sesion el usuario
        setTimeout(() => {
          this.route.navigate(["home"]); //Redireccionamos al home de la app
        }, 1000);
        return true;
      } else {
        this.noty('warning', 'Los 3 elementos seleccionados no son correctos');
        return false;
      }
    } else {
      this.noty('warning', 'El usuario es incorrecto');
      return false;
    }
  }

  noty(type: string, message: string) {
    switch (type) {
      case 'error':
        this.toastr.error(message, `Error!`);
        break;
      case 'success':
        this.toastr.success(message, `Completado!`);
        break;
      case 'info':
        this.toastr.info(message, `Importante!`)
        break;
      case 'warning':
        this.toastr.warning(message, `Advertencia!`)
        break;

      default:
        break;
    }
  }
}
