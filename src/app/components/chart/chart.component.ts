import { Component, Input, SimpleChanges, OnDestroy, OnChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  standalone: false,
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent implements OnDestroy {
  chart: any;

  @Input() chartLabel: string[] = [];
  @Input() chartData: number[] = [];
  @Input() chartType: any = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartType'] || changes['chartLabel'] || changes['chartData']) {
      this.loadChart();
    }
  }

  ngOnInit() {
    this.loadChart();
  }

  loadChart() {
    if (this.chart) {
      this.chart.destroy(); 
    }

    const canvas: any = document.getElementById('canvas');
    if (!canvas) return; 

    if (this.chartType===null) {
      this.chartType = 'bar'
    }

    this.chart = new Chart(canvas, {
      type: this.chartType,
      data: {
        labels: this.chartLabel,
        datasets: [
          {
            label: 'Chart visualization of students and courses',
            data: this.chartData,
            backgroundColor: [
              "#548c2f",
              "#f9a620",
              "#a8d5e2",
              "#ffd449",
              "#104911"
            ],
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
