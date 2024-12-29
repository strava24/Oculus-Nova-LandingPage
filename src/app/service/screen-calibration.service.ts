import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ScreenCalibrationService {

  creditCardWidth: number = 85.60; // mm
  creditCardHeight: number = 53.98; // mm

  lineValues = [
    0.778, // 6/60
    0.556, // 6/36
    0.398, // 6/24
    0.255, // 6/18
    0.125, // 6/12
    0.050, // 6/9
    0.0    // 6/6
  ]


  // realWorldSizeMm: number = 8.87;

  constructor() { }

  // Estimate screen DPI
  getDPI(): number {
    const dpi = window.devicePixelRatio * 96; // 96 is standard DPI for many devices
    return dpi;
  }

  // Convert real-world size (in mm) to pixels using DPI
  convertToPixels(realSize: number): number {
    const realWorldSizeInches = realSize / 25.4; // Convert mm to inches
    const dpi = this.getDPI(); // Get screen DPI
    return realWorldSizeInches * dpi; // Convert inches to pixels
  }

  // Calculate final letter size considering screen resolution and calibration
  getFinalLetterSize(screenWidthRatio: number, realWorldSizeMm: number): number {
    const pixelsRequired = this.convertToPixels(realWorldSizeMm); // Convert to pixels
    return pixelsRequired * (1 / screenWidthRatio); // Adjust for screen ratio
  }

  /**
   * This method is to calculate the size in screen
   * 
   * Eg: In medical settings a 20/20 line will have letters in 5 mm height, but on this system it should be dynamically adjusted to 1 meter
   * This method should accept and return values in mm
   */
  getSizeInScreen(realWorldSize: number) {
    return realWorldSize * (0.5 / 6.096); // 20 feet = 6.096 meters

    // Multiplying by 1 m, cause the user will be sitting in 1 m

  }

  getCreditCardWidthInPixels(): number {
    return this.convertToPixels(this.creditCardWidth);
  }

  getCreditCardHeightInPixels(): number {
    return this.convertToPixels(this.creditCardHeight);
  }

  generateLetter(realWorldSizeMm: number): number {
    const sizeInScreen = this.getSizeInScreen(realWorldSizeMm);

    const pixelsRequired = (sizeInScreen / 25.4) * this.getDPI(); // Converting it to inches and then multiplying by DPI
    console.log('pixels required: ' + pixelsRequired);
    console.log('DPI: ' + this.getDPI())

    const screenRatioString = localStorage.getItem('calibrationRatio');

    if (screenRatioString) {
      const screenRatio = JSON.parse(screenRatioString); // Parse the JSON string

      const screenWidthRatio = screenRatio.screenWidthRatio;
      const screenHeightRatio = screenRatio.screenHeightRatio;

      console.log('Width Ratio:', screenWidthRatio);
      console.log('Height Ratio:', screenHeightRatio);

      const avgRatio = (screenHeightRatio + screenHeightRatio) / 2;

      // const finalLetterHeight = pixelsRequired * (1 / screenHeightRatio);
      const finalLetterHeight = pixelsRequired / avgRatio;

      console.log('final' + finalLetterHeight)
      return finalLetterHeight;

      // Use widthRatio and heightRatio as needed
    } else {
      console.error('calibrationRatio not found in localStorage');
      return -1;
    }

  }

  calculateLogMAR(lineValue: number, incorrectOnes: number): number {

    console.log('Line :' + lineValue);
    console.log('Incorrect ones :' + incorrectOnes);

    const logMAR = this.lineValues[lineValue] + (incorrectOnes * 0.02) // Each letter has a 0.02 weightage
    return logMAR;
  }


}