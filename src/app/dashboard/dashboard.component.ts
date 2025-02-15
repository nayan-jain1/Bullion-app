import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { interval, Subscription, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  goldRate = 0;
  silverRate = 0;
  usdRate = 0;
  selectedTab = 'gold';
  filteredProducts: any[] = [];
  private apiSubscription!: Subscription;
  private apiUrl = 'https://bcast.aaravbullion.in/VOTSBroadcastStreaming/Services/xml/GetLiveRateByTemplateID/aarav?_=1738585907196';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRates();
    this.selectTab('gold');

    // Fetch updated JSON data every 500ms
    this.apiSubscription = interval(20000).pipe(
      switchMap(() =>
        this.http.get(this.apiUrl, { responseType: 'text' }).pipe(
          catchError(error => {
            console.error('Error fetching data:', error);
            return of('');
          })
        )
      )
    ).subscribe(data => {
      const parsedData = this.parseTextData(data);
      this.updateRates(parsedData);
    });
  }

  ngOnDestroy(): void {
    if (this.apiSubscription) {
      this.apiSubscription.unsubscribe();
    }
  }

  fetchRates(): void {
    this.http.get(this.apiUrl, { responseType: 'text' }).subscribe(
      (data: string) => {
        const parsedData = this.parseTextData(data);
        this.updateRates(parsedData);
      },
      error => console.error('Error fetching initial data:', error)
    );
  }

  parseTextData(data: string) {
    if (!data) return { gold: 0, silver: 0, usd: 0, products: [] };
  
    const lines = data.trim().split('\r\n');
    const values = lines[0]?.split('\t') || [];
  
    return {
      gold: parseFloat(values[2]) || 0,
      silver: parseFloat(values[2]) || 0,
      usd: parseFloat(values[2]) || 0,
      products: lines.slice(1).map(line => {
        const cols = line.split('\t');
        return {
          name: cols[1] || '',
          values: { current: parseFloat(cols[2]) || 0 }
        };
      })
    };
  }
  
  updateRates(data: any): void {
    this.goldRate = data.gold;
    this.silverRate = data.silver;
    this.usdRate = data.usd;
    this.filteredProducts = data.products;
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    this.filteredProducts = this.filteredProducts.filter(product =>
      product.name.toLowerCase().includes(tab)
    );
  }
}
