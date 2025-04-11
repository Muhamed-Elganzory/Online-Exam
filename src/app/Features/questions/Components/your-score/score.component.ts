import {Component, computed, inject, OnInit, Signal} from '@angular/core';
import { Chart } from 'chart.js/auto';
import {StoreAnswers} from '../../Model/store-answers';
import {StoreAnswersService} from '../../Service/store-answers.service';
import {ShowResultComponent} from '../show-result/show-result.component';

@Component({
  selector: 'app-your-score',
  imports: [
    ShowResultComponent
  ],
  templateUrl: './score.component.html',
  styleUrl: './score.component.css'
})
export class ScoreComponent implements OnInit {

  private readonly storeAnswersService: StoreAnswersService = inject (StoreAnswersService);

  storeAnswers: Signal<StoreAnswers []> = computed((): StoreAnswers [] => this.storeAnswersService.storeAnswers());

  percentageScore: number = 0;
  countCorrectAnswers: number = 0;
  _scoreModalIsOpen: boolean = true;
  countIncorrectAnswers: number = 0;
  _resultModalIsOpen: boolean = false;

  ngOnInit(): void {
    this.calcScore();

    if (this._scoreModalIsOpen) {
      requestAnimationFrame((): void => {
        new Chart("myChart", {
          type: 'doughnut',
          data: {
            labels: ['Correct Answers', 'Incorrect Answers'],
            datasets: [{
              label: 'Score',
              data: [this.countCorrectAnswers, this.countIncorrectAnswers],
              backgroundColor: ['#02369C', '#CC1010']
            }]
          },
          options: {
            plugins: {
              legend: {
                display: false
              },
              tooltip: {
                enabled: true,
              }
            },
            responsive: false,
            cutout: '80%',
          }
        });
      });
    }
  }

  calcScore (): void {
    for (let i: number = 0; i < this.storeAnswers().length; i++) {
      this.countCorrectAnswers += this.storeAnswers()[i].countOfCorrectAnswers;
      this.countIncorrectAnswers += this.storeAnswers()[i].countOfIncorrectAnswers;
    }
    this.percentageScore = (this.countCorrectAnswers / this.storeAnswers().length) * 100;
  }

  back(): void {
    this._scoreModalIsOpen = false;
  }

  showResult(): void {
    this._scoreModalIsOpen = false;
    this._resultModalIsOpen = true;
  }
}
