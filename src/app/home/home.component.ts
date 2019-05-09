import { Component, OnInit } from '@angular/core';
import {MoviesService} from '../services/movies.service';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../interfaces/movie';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	
	movies: Movie[];

	constructor(private movieService:MoviesService) { 

		this.getMovies()

	}

	getMovies(){

		this.movieService.get().subscribe(
			(data:Movie[]) =>{
				this.movies = data;
			}
		);

	}

  	ngOnInit() {
  	}

  	delete(id){

  		if(confirm('¿Seguro que deseas eliminar?')){
	  			this.movieService.delete(id).subscribe(
	  			(data) => {
	  				alert('Elimando con éxito');
	  				this.getMovies();
	  			},
	  			(err) => {
	  				console.log(err);
	  			}
	  		);
  		}

  	}

}
