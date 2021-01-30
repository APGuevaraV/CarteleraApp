import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { BuscarComponent } from './pages/buscar/buscar.component';

const ROUTES :Routes=[
  { path: 'home', component: HomeComponent },
  { path: 'pelicula/:id', component: PeliculaComponent },
  { path: 'search/:texto', component: BuscarComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
]

@NgModule({
 
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
