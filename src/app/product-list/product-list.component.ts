// import { CommonModule } from '@angular/common';
// import { HttpClientModule, HttpClient } from '@angular/common/http';
// import { Component, OnInit, OnDestroy, inject } from '@angular/core';
// import { interval, Subscription } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-product-list',
//   standalone: true,
//   imports: [CommonModule, HttpClientModule],
//   templateUrl: './product-list.component.html',
//   styleUrls: ['./product-list.component.css']
// })
// export class ProductListComponent implements OnInit, OnDestroy {
//   products: any[] = [];
//   private http = inject(HttpClient);
//   private apiUrl = 'https://bcast.aaravbullion.in/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/aarav?_=1738585907196';
//   private refreshSubscription!: Subscription;

//   ngOnInit(): void {
//     this.fetchRates();

//     // Fetch rates every 500ms
//     this.refreshSubscription = interval(500)
//       .pipe(switchMap(() => this.http.get<any[]>(this.apiUrl)))
//       .subscribe((data) => this.processRates(data));
//   }

//   ngOnDestroy(): void {
//     // Stop interval when component is destroyed
//     if (this.refreshSubscription) {
//       this.refreshSubscription.unsubscribe();
//     }
//   }

//   private fetchRates(): void {
//     this.http.get<any[]>(this.apiUrl).subscribe((data) => this.processRates(data));
//   }

//   private processRates(data: any[]): void {
//     this.products = data.map(item => ({
//       name: item[1],  // Product Name
//       price: item[2]  // Current Price
//     }));
//   }
// }


// // import { CommonModule } from '@angular/common';
// // import { Component, OnInit, OnDestroy } from '@angular/core';
// // import { interval, Subscription } from 'rxjs';
// // import { PRODUCT_DATA } from '../data/product-data';// Import JSON data

// // @Component({
// //   selector: 'app-product-list',
// //   standalone: true,
// //   imports: [CommonModule],
// //   templateUrl: './product-list.component.html',
// //   styleUrls: ['./product-list.component.css']
// // })
// // export class ProductListComponent implements OnInit, OnDestroy {
// //   products: any[] = [];
// //   private refreshSubscription!: Subscription;

// //   ngOnInit(): void {
// //     this.products = JSON.parse(JSON.stringify(PRODUCT_DATA)); // Deep copy to prevent mutation
// //     this.refreshSubscription = interval(500).subscribe(() => this.updatePrices());
// //   }

// //   updatePrices(): void {
// //     this.products.forEach(product => {
// //       const change = (Math.random() * 2 - 1) * 5; // Random fluctuation between -5 and +5
// //       product.values.previous = product.values.current;
// //       product.values.current = Math.max(product.values.low, Math.min(product.values.high, product.values.current + change));
// //     });
// //   }

// //   ngOnDestroy(): void {
// //     if (this.refreshSubscription) {
// //       this.refreshSubscription.unsubscribe();
// //     }
// //   }
// // }
