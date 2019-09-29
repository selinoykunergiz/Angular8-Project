import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../dto/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url: string = "/assets/data.json";
  //private url: string = "https://www.gittigidiyor.com/xhr/all-stores-ajax";

  constructor(private http: HttpClient) { }

  public static get api_url(): string {return 'http://localhost:4200';}

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(ProductService.api_url +this.url);
  }


}
