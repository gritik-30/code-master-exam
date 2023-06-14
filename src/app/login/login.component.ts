import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { environment } from '../environment/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  candidateForm!: FormGroup

  testId = undefined;
  candidateId = undefined;
  testDetails: any;

  ngOnInit(): void {
    const param = this.activatedRoute.snapshot.params;
    this.testId = param['id'];
    this.candidateForm = this.buildForm();
    if (this.testId) {
      this.getTestDetails();
    } else {
      alert('Invalid Test Link! Pleasecheck the link again!')
    }
  }

  getTestDetails(): void {
    this.api.fetch(`${environment.apiUrl}/test/${this.testId}`).subscribe({
      next: (res) => { this.testDetails = res },
      error: (err) => {
        console.error(err);
        alert(err.error.message)
      }
    });
  }

  buildForm(): FormGroup {
    return this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', Validators.required)
    });
  }

  submit(): void {
    this.api.post(`${environment.apiUrl}/student/login`, this.candidateForm.value).subscribe({
      next: (res) => { this.candidateId = res.candidateId; this.goToTest() },
      error: (err) => { alert(err.error.message) }
    });
  }

  goToTest(): void {
    this.api.post(`${environment.apiUrl}/test/test-response/${this.testId}`, {
      studId: this.candidateId
    }).subscribe({
      next: (res) => { 
        localStorage.setItem('testId', res.testId);
        this.router.navigate(['/instructions'])
      },
      error: (err) => {
        console.error(err);
        alert(err.error.message);
      },
    })
  }

}
