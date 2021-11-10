import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoginComponent],
            imports: [RouterTestingModule, ToastrModule.forRoot()]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    it('Validar usuario', () => {
        component.user = 'juan';
        component.items = [{
            icon: 'fas fa-cat',
            name: 'Gato',
            status: false,
            id: 1
        }, {
            icon: 'fas fa-dog',
            name: 'Perro',
            status: false,
            id: 2
        }, {
            icon: 'fas fa-horse',
            name: 'Caballo',
            status: false,
            id: 7 
        }];        
        expect(component.verifyCredentials()).toBe(true);
        
    });
});
