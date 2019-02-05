import { Component, Input, OnChanges, SimpleChange, Output, EventEmitter } from '@angular/core';
import sha1 from 'sha1';
import { Subject, from } from 'rxjs';
import { takeUntil, map, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { RangeResponse } from './models';
import { NgxPassStrengthService } from './ngx-pass-strength.service';

@Component({
  selector: 'lib-ngx-pass-strength',
  templateUrl: './ngx-pass-strength.html',
  styleUrls: ['./ngx-pass-strength.scss']
})
export class NgxPassStrengthComponent implements OnChanges {
  @Input() passwordToCheck: string;
  @Input() barLabel: string;
  @Input() fontFamily: string = 'Luca, sans-serif';
  @Output() onStrengthChanged: EventEmitter<number> = new EventEmitter<number>();

  destroy$: Subject<boolean> = new Subject<boolean>();
  passwordChanged: Subject<string> = new Subject<string>();

  bar0: string;
  bar1: string;
  bar2: string;
  bar3: string;
  bar4: string;

  passwordIsPawned: boolean;
  numberOfBreaches: number;

  private colors = ['#F00', '#F90', '#FF0', '#9F0', '#0F0'];

  constructor(private passwordService: NgxPassStrengthService) {
    this.numberOfBreaches = 0;
    this.passwordIsPawned = false;

    this.passwordChanged
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()        
      )
      .subscribe(pass => {
        this.passwordIsPawned = false;
        this.numberOfBreaches = 0;
        this.checkPasswordAgainstHIBP(pass)
      });

  }

  ngOnInit() {
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }): void {
    if (changes['passwordToCheck'].currentValue === changes['passwordToCheck'].previousValue) {
      return;
    }

    let strength = 0;

    const password = changes['passwordToCheck'].currentValue;
    this.passwordChanged.next(password);

    this.setBarColors(5, '#DDD');
    if (password) {
      strength = NgxPassStrengthComponent.measureStrength(password);
      let c = this.getColor(strength);
      this.setBarColors(c.idx, c.col);
    }

    this.onStrengthChanged.emit(strength);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

  private setBarColors(count, col) {
    for (let _n = 0; _n < count; _n++) {
      this['bar' + _n] = col;
    }
  }

  private static measureStrength(pass: string) {
    let score = 0;
    // award every unique letter until 5 repetitions
    let letters = {};
    for (let i = 0; i < pass.length; i++) {
      letters[pass[i]] = (letters[pass[i]] || 0) + 1;
      score += 5.0 / letters[pass[i]];
    }
    // bonus points for mixing it up
    let variations = {
      digits: /\d/.test(pass),
      lower: /[a-z]/.test(pass),
      upper: /[A-Z]/.test(pass),
      nonWords: /\W/.test(pass)
    };

    let variationCount = 0;
    for (let check in variations) {
      variationCount += variations[check] ? 1 : 0;
    }
    score += (variationCount - 1) * 10;
    return Math.trunc(score);
  }

  private deserialiseRangeResponses(responseString: string): Array<RangeResponse> {
    return responseString.split('\r\n').map((rangeResponse: string) => {
      return new RangeResponse().deserialise(rangeResponse);
    });
  }

  private getColor(score: number) {
    let idx = 0;
    if (score > 90) {
      idx = 4;
    } else if (score > 70) {
      idx = 3;
    } else if (score >= 40) {
      idx = 2;
    } else if (score >= 20) {
      idx = 1;
    }
    return {
      idx: idx + 1,
      col: this.colors[idx]
    };
  }

  private checkPasswordAgainstHIBP(password: string) {
    const passwordHash: string = sha1(password).toUpperCase();
    this.passwordService
      .range(passwordHash.substring(0, 5))
      .pipe(
        takeUntil(this.destroy$),
        debounceTime(1000),
        map(response => {
          const foundHash = this.deserialiseRangeResponses(response)
            .find(x => passwordHash.indexOf(x.suffix) === 5);
          if (foundHash) {
            return foundHash.count;
          }

          return null;
        })
      )
      .subscribe(numberOfBreaches => {
        this.numberOfBreaches = numberOfBreaches;
        this.passwordIsPawned = numberOfBreaches > 0;
      });
  }

}
