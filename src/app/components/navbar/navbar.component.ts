import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router:Router) { }

  ngOnInit(): void {
  }

  buscarPelicula( texto:string){
    texto = texto.trim(); //borra espacios atrás y adelante
    if (texto.length === 0) {
      return;
      
    }else{
      
      this.router.navigate(['search',texto]);
    }
  }

}
