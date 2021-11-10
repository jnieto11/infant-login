import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface Animal {
  id: number,
  icon: string,
  name: string,
  status: boolean
}
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  //variables
  @Output() configItemsEvent = new EventEmitter<object>();

  animalpass: Animal[] = [
    {
      icon: 'fas fa-cat',
      name: 'Gato',
      status: false,
      id: 1
    },
    {
      icon: 'fas fa-dog',
      name: 'Perro',
      status: false,
      id: 2
    },
    {
      icon: 'fas fa-dove',
      name: 'Paloma',
      status: false,
      id: 3
    },
    {
      icon: 'fas fa-fish',
      name: 'Pescado',
      status: false,
      id: 4
    },
    {
      icon: 'fas fa-otter',
      name: 'Nutria',
      status: false,
      id: 5
    },
    {
      icon: 'fas fa-frog',
      name: 'Rana',
      status: false,
      id: 6
    },
    {
      icon: 'fas fa-horse',
      name: 'Caballo',
      status: false,
      id: 7
    },
    {
      icon: 'fas fa-spider',
      name: 'Araña',
      status: false,
      id: 8
    },
    {
      icon: 'fas fa-crow',
      name: 'Cuervo',
      status: false,
      id: 9
    },
    {
      icon: 'fas fa-hippo',
      name: 'Hipopotamo',
      status: false,
      id: 10
    }
  ]
  animalsselected: any[] = [];
  constructor(private toastr: ToastrService) { }

  ngOnInit(): void {
    // Alteracion del orden del array 
    //en un escenario completo primero consumiriamos el servicio y con un pipe podriamos hacer esta logica
    this.animalpass.sort((a: any, b: any) => {
      if (a.score === b.score) {
        const random = Math.random() * 10;
        if (random >= 5) {
          return 1;
        } else {
          return -1;
        }
      } else if (a.score > b.score) {
        return -1;
      } else if (a.score < b.score) {
        return 1;
      }
      return 0;
    }
    );
  }

  setIconPass = (item: any) => { //Este metodo controla la logica de seleccion y deseleccion de los iconos
    let exist = this.animalsselected.filter(x => x.id === item.id); //verificamos si el elemento seleccionado ya existe
    if (this.animalsselected.length < 3 || exist.length > 0) { //evaluamos si debemos dejar pasar la seleccion o no
      this.animalpass.map((element: any) => { //recorremos el objeto para identificar si lo marcamos o removemos de la seleccion
        if (element.id === item.id) {
          element.status = !element.status
          if (element.status) {
            this.animalsselected.push(item);
          } else {
            this.animalsselected = this.animalsselected.filter(x => x.id !== item.id);
          }
        }
      })
      this.configItemsEvent.emit(this.animalsselected); // Emitimos el objeto que va llevando el resumen de la seleccion
    } else {
      this.noty('warning', 'ya haz seleccionado 3 elementos, desmarca algun animal si deseas seleccionar otro!')
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
