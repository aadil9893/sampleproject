import { Component, OnInit } from '@angular/core';
import { SellerService } from '../services/seller.service';
import { Seller } from '../seller';
import { Router } from '@angular/router';


@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  seller: Seller = new Seller();
  showLogin=false

  constructor(private sellerservice:SellerService, private router:Router){}

  ngOnInit(): void {
    this.sellerservice.reloadSeller()
  }


  signup(seller?: Seller): void {
    console.warn(this.seller);
    this.sellerservice.sellerSignUp(this.seller)
  }
  
  login(seller?: Seller): void {
    this.sellerservice.sellerLogin(this.seller);
  }

  openLogin(){
    this.showLogin=true;
  }
  openSignUp(){
    this.showLogin=false;
  }
}
