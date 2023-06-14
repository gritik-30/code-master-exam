import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../environment/environment';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  constructor(
    private api: ApiService
  ) {}

  testDetails: any;

  ngOnInit(): void {
    const testId = localStorage.getItem('testId');
    this.api.fetch(`${environment.apiUrl}/test/test-details/${testId}`).subscribe({
      next: (res) => {
        this.testDetails = res;
      },
      error: (err) => { console.error(err); alert(err.error.message) },
    });
  }
}
