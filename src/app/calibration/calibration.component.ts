import { CommonModule } from '@angular/common';
import { Component, HostListener, inject } from '@angular/core';
import { ScreenCalibrationService } from '../../service/screen-calibration/screen-calibration.service';
import { Router } from '@angular/router';
import {LearnMoreComponent} from '../learn-more/learn-more.component';

@Component({
  selector: 'app-calibration',
  standalone: true,
  imports: [CommonModule, LearnMoreComponent],
  templateUrl: './calibration.component.html',
  styleUrl: './calibration.component.css'
})
export class CalibrationComponent {
  isLearnMoreMode = false; // Track the current view

  toggleView() {
    this.isLearnMoreMode = !this.isLearnMoreMode; // Toggle between views
  }

  screenCalibrationService = inject(ScreenCalibrationService);
  router = inject(Router);

  rectangleWidth: number = 100; // Initial rectangle width in pixels
  rectangleHeight: number = 50; // Initial rectangle height in pixels

  // Pixel calculation of credit card dimentions
  creditCardWidthInPixels: number = this.screenCalibrationService.getCreditCardWidthInPixels();
  creditCardHeightInPixels: number = this.screenCalibrationService.getCreditCardHeightInPixels();

  isResizing: boolean = false;

  startResizing(event: MouseEvent): void {
    event.preventDefault();
    this.isResizing = true;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (this.isResizing) {
      const rect = document.querySelector('.rectangle')!.getBoundingClientRect();
      this.rectangleWidth = event.clientX - rect.left;
      this.rectangleHeight = event.clientY - rect.top;
    }
  }

  @HostListener('document:mouseup')
  stopResizing(): void {
    this.isResizing = false;
  }

  /**
   * Method responsible for saving the calibration values and
   */
  saveCalibration(): void {
    const screenWidthRatio = this.creditCardWidthInPixels / this.rectangleWidth;
    const screenHeightRatio = this.creditCardHeightInPixels / this.rectangleHeight;

    localStorage.setItem('calibrationRatio', JSON.stringify({ screenWidthRatio, screenHeightRatio }));

    // const finalLetterHeight = this.screenCalibrationService.generateLetter();

    this.router.navigateByUrl('/letter-board');

    // console.log(this.screenCalibrationService.getSizeInScreen(5));

    alert('Calibration saved!');
  }

  // Everything till getting the result done!!!



}
