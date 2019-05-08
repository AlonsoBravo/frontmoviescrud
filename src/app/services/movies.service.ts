import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Movie} from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
	API_ENDPOINT = 'Http://localhost:8000/api'
  constructor(private httpClient: HttpClient) { }

  save(movie: Movie){
  	const headers = new HttpHeaders({'Content-type': 'application/json'});

  	return this.httpClient.post(this.API_ENDPOINT + '/movies', movie,{headers:headers});
  }

  put(movie: Movie){
  	const headers = new HttpHeaders({'Content-type': 'application/json'});

  	return this.httpClient.put(this.API_ENDPOINT + '/movies/'+movie.id, movie,{headers:headers});
  }
}
