import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bike } from './bike.model';

@Injectable({
  providedIn: 'root'
})
export class BikeService {
  private readonly PICSUM_URL = 'https://picsum.photos/200';
  private bikes: Bike[] = [];

  constructor(private http: HttpClient) {}

  addBike(bike: Bike): void {
    this.bikes.push(bike);
  }

  deleteBike(id: number): void {
    this.bikes = this.bikes.filter(b => b.id !== id);
  }
  
  fetchRandomImage(): any {
    return this.http.get(this.PICSUM_URL, { responseType: 'blob' });
  }


  getBikes(): Bike[] {
    return this.bikes;
  }
}
