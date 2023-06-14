import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  editorOptions = { theme: 'vs-dark', language: 'javascript' };
  code: string = 'function x() {\nconsole.log("Hello world!");\n}';

  testId: any;
  testDetails: any;
  answers: any = [];
  currentQuestionNumber: number = 0;
  currentQuestion: any = this.answers[this.currentQuestionNumber];

  ngOnInit(): void {
    this.testId = localStorage.getItem('testId');
    this.getTestDetails();
  }

  getTestDetails(): void {
    this.api.fetch(`${environment.apiUrl}/test/test-details/${this.testId}`).subscribe({
      next: (res) => {
        this.testDetails = res;
        this.answers = this.testDetails.answers;
        this.getQuestion();
      },
      error: (err) => { console.error(err); alert(err.error.message) },
    });
  }

  getQuestion() {
    this.currentQuestion = this.answers[this.currentQuestionNumber];
    this.code = this.currentQuestion.candidateCode ? this.currentQuestion.candidateCode : this.currentQuestion.question.template;
  }

  goToQuestion(index: number) {
    this.currentQuestionNumber = index;
    this.getTestDetails();
  }

  saveCode(): void {
    const data = {
      code: this.code,
      question: this.currentQuestion,
      responseId: this.testId
    }
    this.api.post(`${environment.apiUrl}/test/exec`, data).subscribe({
      next: () => {
        alert('Saved Successfully.')
      }
    })
  }

  endTest(): void {
    this.api.patch(`${environment.apiUrl}/test/end/${this.testId}`, {}).subscribe({
      next: (res) => {
        this.router.navigate(['/report']);
      },
      error: (err) => { console.error(err); alert(err.error.message) },
    });
  }
}
