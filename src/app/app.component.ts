// Arrange imports in alphabetical order
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Bike } from './bike.model';
import { BikeService } from './bike.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  bikes: Bike[] = [];
  newBike: Bike = this.initializeBike();

  constructor(private bikeService: BikeService, private sanitizer: DomSanitizer) {}

  // Lifecycle methods
  ngOnInit(): void {
    this.bikes = this.bikeService.getBikes();
    this.generateRandomBikes(2);
  }

  // Public methods
  addBike(): void {
    this.bikeService.fetchRandomImage().subscribe((imageBlob: any) => {
      this.newBike.imgUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imageBlob));
      this.newBike.price = this.randomPrice();
      this.bikeService.addBike({ ...this.newBike });
      this.bikes = this.bikeService.getBikes();
      this.resetNewBike();
    });
  }

  deleteBike(id: number): void {
    this.bikeService.deleteBike(id);
    this.bikes = this.bikeService.getBikes();
  }

  generateRandomBikes(count: number): void {
    for (let i = 0; i < count; i++) {
      this.bikeService.fetchRandomImage().subscribe((imageBlob: any) => {
        const bike: Bike = this.initializeBike();
        bike.imgUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(imageBlob));
        bike.price = this.randomPrice();
        this.bikeService.addBike(bike);
        this.bikes = this.bikeService.getBikes();
      });
    }
  }

  // Private methods
  private initializeBike(): Bike {
    return {
      id: Date.now(),
      price: this.randomType(),
      type: this.randomType(),
      imgUrl: '',
    };
  }

  private randomPrice(): number {
    return Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
  }

  private randomType(): string {
    const types = ['Mountain', 'Road', 'Hybrid', 'BMX', 'Cruiser'];
    const randomIndex = Math.floor(Math.random() * types.length);
    return types[randomIndex];
  }

  private resetNewBike(): void {
    this.newBike = this.initializeBike();
  }
}
