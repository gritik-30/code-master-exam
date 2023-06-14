import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.scss']
})
export class InstructionsComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  testId: any = undefined;
  testDetails: any = undefined;

  ngOnInit(): void {
    this.testId = localStorage.getItem('testId');
    this.getTestDetails();
  }

  getTestDetails(): void {
    this.api.fetch(`${environment.apiUrl}/test/test-details/${this.testId}`).subscribe({
      next: (res) => {
        this.testDetails = res.test;
        localStorage.setItem('testDetails', JSON.stringify(res))
      },
      error: (err) => { console.error(err); alert(err.error.message) },
    });
  }

  startTest(): void {
    this.api.patch(`${environment.apiUrl}/test/start/${this.testId}`, {}).subscribe({
      next: (res) => {
        this.router.navigate(['/test']);
      },
      error: (err) => { console.error(err); alert(err.error.message) },
    });
  }
}
