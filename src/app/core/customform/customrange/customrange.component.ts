import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-customrange',
  templateUrl: './customrange.component.html',
  styleUrls: ['./customrange.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomrangeComponent),
      multi: true
    }
  ]
})
export class CustomrangeComponent implements ControlValueAccessor {
  sliderValue: number = 50;
  @Input() max: number = 0;

  // These methods are placeholders for ControlValueAccessor
  private onChange = (value: number) => { };
  private onTouched = () => { };

  writeValue(value: number): void {
    this.sliderValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onSliderChange(value: number): void {
    this.sliderValue = value;
    this.onChange(this.sliderValue);
  }

  onInputChange(value: number): void {
    if(value<=this.max){
    this.sliderValue = value;
    this.onChange(this.sliderValue);
    }
    else{
      alert('Exceeds Limit');
      this.sliderValue=0
      this.onChange(this.sliderValue);

    }
  }

  onBlur(): void {
    this.onTouched();
  }
}
