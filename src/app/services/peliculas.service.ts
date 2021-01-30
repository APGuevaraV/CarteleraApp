import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import {catchError, map,tap} from 'rxjs/operators';
import { MovieResponse } from '../interfaces/movie-response';
import { CreditsResponse, Cast } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl:string ='https://api.themoviedb.org/3';
  private carteleraPage =1;
  public loading;

  constructor( private http:HttpClient) { }

  get params(){
    return {
      api_key :'9e8d4d690c0193131ad80667b05a5f84',
      lenguaje:'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<Movie[]>{
    if (this.loading) {
      return of ([]);
    }
    this.loading = true;
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`,{params:this.params})
            .pipe(
              map((resp)=>
                resp.results),
              tap(() =>{
                  this.carteleraPage+=1;
                  this.loading =false;
              })
            );
                      
  }

  buscarPelicula(texto:string):Observable<Movie[]>{
    const params = {...this.params,page:'1', query :texto}
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
      params
    }).pipe(
          map(resp =>resp.results)
    )

  }


  resetCarteleraPage(){
    this.carteleraPage=1;
  }

  getPeliculaDetails(id:string){

    return this.http.get<MovieResponse>(
      `${this.baseUrl}/movie/${id}`,{
        params:this.params
      }).pipe(
        catchError(err=>of(null))
      )
  }

  getCast(id:string):Observable<Cast[]>{

    return this.http.get<CreditsResponse>(
      `${this.baseUrl}/movie/${id}/credits`,{
        params:this.params})
        .pipe(
          map(resp=>resp.cast),
          catchError(err=>of([]))
        );
  }


}
