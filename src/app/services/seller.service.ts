import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Seller } from '../seller';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject <boolean>(false)
  email=""
  password=""

  API = "http://localhost:8080/E-COMM/PullSellerdata";

  constructor(private http:HttpClient, private router:Router, ) { }

  sellerSignUp(seller?: Seller){
    this.http.post<Object>(`${this.API}`, seller, {observe:'response'}).subscribe((result) =>{
     if(result){
      localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']); }
    });

  }
  reloadSeller(){
    if(localStorage.getItem('seller'))
    this.isSellerLoggedIn.next(true);
    this.router.navigate(['seller-home']); 
  }

  sellerLogin(seller?: Seller) {
    this.http.get<Seller[]>(`${this.API}/${this.email}/${this.password}`, {observe:'response'}).subscribe((result: any) =>{
      if(result){
        console.warn("Seller Logged In");
        localStorage.setItem('seller', JSON.stringify(result.body));
      this.router.navigate(['seller-home']); 
      }else{
        console.warn("login failed");
      }
  });
  }
}
