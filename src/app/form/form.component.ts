import { Component, OnInit } from '@angular/core';
import {Movie} from '../interfaces/movie';
import {MoviesService} from '../services/movies.service';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

	movie: Movie = {
		name: null,
		description: null,
		genre:null,
		year:null,
		duration:null
	};

	API_ENDPOINT = 'Http://localhost:8000/api';
	id:any;
	editing:boolean = false;
	movies: Movie[];

  constructor(private movieService: MoviesService, private activaredRoute: ActivatedRoute, private httpClient: HttpClient) {
  	
  	this.id = this.activaredRoute.snapshot.params['id'];

  	if(this.id){
  		this.editing = true;
  		httpClient.get(this.API_ENDPOINT+'/movies').subscribe(
  			(data: Movie[])=>{
  				this.movies = data;
  				this.movie = this.movies.find((m)=>{
  					return m.id == this.id;
  					console.log(this.movie);
  				});
  			},
  			(err) =>{
  				console.log(err);
  			}
  		);
  	}else{
  		this.editing = false;
  	}

  }

  ngOnInit() {
  }

	saveMovie(){

		if(this.editing){

			this.movieService.put(this.movie).subscribe(
		  		(data)=>{
		  			alert('Película actualizada');
		  			console.log(data);
		  		},
			  	(err)=>{
			  		console.log(err);
			  		alert('Ocurrio un error');
				}
			);

		}else{

		  	this.movieService.save(this.movie).subscribe(
		  		(data)=>{
		  			alert('Película creada');
		  			console.log(data);
		  		},
			  	(err)=>{
			  		console.log(err);
			  		alert('Ocurrio un error');
				}
			);
			
  		}
  	}
}
