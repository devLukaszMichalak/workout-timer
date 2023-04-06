import {ComponentFixture, TestBed} from '@angular/core/testing';
import {TimerComponent} from './timer.component';
import {By} from "@angular/platform-browser";

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({declarations: [TimerComponent]})
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the timer component', () => {
    expect(component).toBeTruthy();
  });

  it('should clear the interval when ngOnDestroy() is called', () => {
    spyOn(window, 'clearInterval');
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalled();
  });

  it('should return the correct value when getTimerRingValue() is called', () => {
    component.resetValue = 60000;
    component.milliseconds = 30000;
    expect(component.getTimerRingValue()).toBe('--value:50;--size:18rem;');
  });

  it('should update the resetValue and reset the timer when setResetValue() is called', () => {
    component.resetValue = 10000;
    spyOn(component, 'resetTimer');
    component.setResetValue(30);
    expect(component.resetValue).toBe(30000);
    expect(component.resetTimer).toHaveBeenCalled();
  });

  it('should return the correct value when getRoundedSeconds() is called', () => {
    component.milliseconds = 3050;
    expect(component.getRoundedSeconds()).toBe('3.0');
  });

  it('should return the correct value when isWindowLandscape() is called', () => {
    spyOnProperty(window, 'innerHeight', 'get').and.returnValue(500);
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(1000);
    expect(component.isWindowLandscape()).toBe(true);
  });

  it('should display the timer value in seconds with one decimal place', () => {
    const secondsElement = fixture.debugElement.query(By.css('span')).nativeElement;
    expect(secondsElement.textContent.trim()).toBe(`${(component.milliseconds / 1000).toFixed(1)}`);
  });

  it('should display the reset button with "Reset" label', () => {
    const resetButton = fixture.debugElement.query(By.css('button')).nativeElement;
    expect(resetButton.textContent.trim()).toBe('Reset');
  });

  it('should update the timer value every 25 milliseconds', (done) => {
    const initialMilliseconds = component.milliseconds;
    setTimeout(() => {
      const updatedMilliseconds = component.milliseconds;
      expect(updatedMilliseconds).toBeLessThan(initialMilliseconds);
      done();
    }, 50);
  });

});
