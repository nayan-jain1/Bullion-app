import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, NgFor } from '@angular/common';


interface Product {
  id: number;
  name: string;
  values: {
    current: number;
    high: number;
    low: number;
    previous: number;
  };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule, NgFor,],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  apiUrl = 'https://bcast.aaravbullion.in/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/aarav?_=1738585907196';
  filteredProducts: Product[] = [];
  selectedTab = 'gold';
  goldRate: string = 'Loading...';
  silverRate: string = 'Loading...';
  usdRate: string = 'Loading...';
gold: any;
  goldCurrentRate: any;
  silverCurrentRate : any;
  usdCurrentRate: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchData(); // Fetch initial data

    setInterval(() => {
      this.fetchData(); // Fetch new data every 5 seconds
    }, 5000);
  }

  fetchData(): void {
    

    this.http.get<string>(this.apiUrl, { responseType: 'text' as 'json' }).subscribe(
      (response) => {
       
        this.filteredProducts = this.parseApiResponse(response);
        this.updateRates();

       
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  parseApiResponse(data: string): Product[] {
    const lines = data.split('\n'); // Split response into lines
    const products: Product[] = [];

    lines.forEach((line) => {
      const parts = line.trim().split(/\s+/); // Split each line by spaces

      if (parts.length >= 6) {
        const product: Product = {
          id: Number(parts[0]),
          name: parts.slice(1, parts.length - 4).join(' '), // Extract product name
          values: {
            current: parseFloat(parts[parts.length - 4]),
            high: parseFloat(parts[parts.length - 3]),
            low: parseFloat(parts[parts.length - 2]),
            previous: parseFloat(parts[parts.length - 1])
          }
        };
        products.push(product);
      }
    });

    console.log('Parsed Products:', products);
    return products;

    
  }

  updateRates(): void {
    const gold = this.filteredProducts.find(p => p.name.includes('Gold($)'));
    const silver = this.filteredProducts.find(p => p.name.includes('Silver'));
    const usd = this.filteredProducts.find(p => p.name.includes('USD'));

    this.goldRate = gold ? `${gold.values.current} | H: ${gold.values.high} | L: ${gold.values.low} | P: ${gold.values.previous}` : 'N/A';
    this.silverRate = silver ? `${silver.values.current} | H: ${silver.values.high} | L: ${silver.values.low} | P: ${silver.values.previous}` : 'N/A';
    this.usdRate = usd ? `${usd.values.current} | H: ${usd.values.high} | L: ${usd.values.low} | P: ${usd.values.previous}` : 'N/A';

    this.goldCurrentRate = this.filteredProducts[0].values.current;
    console.log('silver',this.filteredProducts);
    this.silverCurrentRate = this.filteredProducts[1].values.current;
    this.usdCurrentRate = this.filteredProducts[2].values.current;
  }

//   selectTab(tab: string): void {
//         this.selectedTab = tab;
//         this.filteredProducts = PRODUCT_DATA.filter(p => 
//           p.name.toLowerCase().includes(tab.toLowerCase()) && p.values
//         );
//         this.updateRates(); 
//       }
}



//  working logic with static values 

// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { Product } from '../models/product-model';
// import { PRODUCT_DATA } from '../data/product-data';

// @Component({
//   selector: 'app-dashboard',
//   standalone: true,
//   imports: [CommonModule],
//   templateUrl: './dashboard.component.html',
//   styleUrls: ['./dashboard.component.css']
// })
// export class DashboardComponent implements OnInit {
//   goldRate = { current: 0, high: 0, low: 0, previous: 0 };
//   silverRate = { current: 0, high: 0, low: 0, previous: 0 };
//   usdRate = { current: 0, high: 0, low: 0, previous: 0 };
//   selectedTab = 'gold';
//   filteredProducts: Product[] = [];
  
//   ngOnInit(): void {
//     this.updateRates();
//     this.selectTab('gold'); // Default tab
//     this.filteredProducts = PRODUCT_DATA;
//   }

//   updateRates(): void {
//     const gold = PRODUCT_DATA.find(p => p.name === 'Gold($)');
//     const silver = PRODUCT_DATA.find(p => p.name === 'Silver');
//     const usd = PRODUCT_DATA.find(p => p.name === 'USD');
  
//     this.goldRate = gold?.values ?? { current: 0, high: 0, low: 0, previous: 0 };
//     this.silverRate = silver?.values ?? { current: 0, high: 0, low: 0, previous: 0 };
//     this.usdRate = usd?.values ?? { current: 0, high: 0, low: 0, previous: 0 };
//   }

//   selectTab(tab: string): void {
//     this.selectedTab = tab;
//     this.filteredProducts = PRODUCT_DATA.filter(p => 
//       p.name.toLowerCase().includes(tab.toLowerCase()) && p.values
//     );
//   }
// }


