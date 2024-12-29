import { Component, inject, OnInit } from '@angular/core';
import { ScreenCalibrationService } from '../../service/screen-calibration/screen-calibration.service';
import { CommonModule } from '@angular/common';
import { AllowdLetters, Constant } from '../../constant/Constant';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-letter-board',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './letter-board.component.html',
  styleUrls: ['./letter-board.component.css']
})
export class LetterBoardComponent implements OnInit {

  screenCalibrationService = inject(ScreenCalibrationService);
  finalLetterHeight: number = 0;
  currentLetters: string[] = [];
  inputLetters: string[] = ['', '', '', '', ''];
  incorrectLetterCount: number = 0;

  // Define all available letter scales in descending order
  letterScales = [
    Constant.LETTER_SCALE.SIX_60,
    Constant.LETTER_SCALE.SIX_36,
    Constant.LETTER_SCALE.SIX_24,
    Constant.LETTER_SCALE.SIX_18,
    Constant.LETTER_SCALE.SIX_12,
    Constant.LETTER_SCALE.SIX_9,
    Constant.LETTER_SCALE.SIX_6
  ];


  // Keep track of the current size index
  currentSizeIndex: number = 0;

  ngOnInit(): void {
    this.loadCurrentSizeLetters();
  }

  trackByFn(index: number, item: string): number {
    return index;
  }

  // Function to load the current letters based on the size index
  loadCurrentSizeLetters(): void {
    const currentScale = this.letterScales[this.currentSizeIndex];
    this.finalLetterHeight = this.screenCalibrationService.generateLetter(currentScale);
    this.currentLetters = this.generateRandomLetters();
  }

  // Generate random letters
  generateRandomLetters(): string[] {
    let letters: string[] = [];
    for (let x = 0; x < 5; x++) {
      letters.push(AllowdLetters[Math.floor(Math.random() * AllowdLetters.length)]);
    }
    return letters;
  }

  // Function to handle form submission
  onSubmit() {
    // Convert both input letters and current letters to lowercase for case-insensitive comparison
    const currentLettersLower = this.currentLetters.map(letter => letter.toLowerCase());
    const inputLettersLower = this.inputLetters.map(letter => letter.toLowerCase());

    // Check the correctness of the letters at each index
    let correctLettersCount = 0;

    // Compare each input letter with the corresponding current letter
    for (let i = 0; i < inputLettersLower.length; i++) {
      if (inputLettersLower[i] === currentLettersLower[i]) {
        correctLettersCount++;
      }
    }

    this.incorrectLetterCount += (5 - correctLettersCount);

    // Display results
    alert(`Correct Letters: ${correctLettersCount}`);

    // The user will be only allowed to go to the next line if they have 80% accuracy
    if (correctLettersCount >= 4) {
      // Move to the next letter size if there are more to go
      if (this.currentSizeIndex < this.letterScales.length - 1) {
        this.currentSizeIndex++;
        this.inputLetters = ['', '', '', '', ''];
        this.loadCurrentSizeLetters();
      } else {
        alert("You've completed all the sizes!");
        const logMAR: number = this.screenCalibrationService.calculateLogMAR(this.currentSizeIndex, this.incorrectLetterCount);
        console.log('logMAR value: ' + logMAR);
      }
    } else {
      const logMAR: number = this.screenCalibrationService.calculateLogMAR(this.currentSizeIndex, this.incorrectLetterCount);
      alert("Your logMAR reading : " + logMAR);
      console.log('logMAR value: ' + logMAR);
    }
  }

}
