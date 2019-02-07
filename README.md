# NGX Pass Strength

[![Build Status](https://travis-ci.com/yashints/ngx-pass-strength.svg?branch=master)]
[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](/LICENSE)

[![npm](https://img.shields.io/badge/stackblitz-online-orange.svg)](https://stackblitz.com/edit/ngx-pass-strength-sample)

This is a small library I created which lets you measure password strength and also checks it against [Have I Been Pwned](https://haveibeenpwned.com/API/v2) APIs created by [Troy Hunt](https://www.troyhunt.com/) to see if is found in a breach before or not.

## Demo
Try out [the demo on Stackblitz!](https://stackblitz.com/edit/ngx-pass-strength-sample)

## Install

```bash
npm i ngx-pass-strength --save
```

## Setup
You will need to import `NgxPassStrengthModule` into your application module. Then use `<ngx-pass-strength>` component for your password field.

Also do not forget to import `HttpClientModule` as well since it's required to make the `HTTP` call to the HIBP API.

```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NgxPassStrengthModule } from 'ngx-pass-strength';

@NgModule({
  imports:      [ 
    BrowserModule, 
    FormsModule,
    NgxPassStrengthModule,
    HttpClientModule
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
```

After this you can use the component in your form or even outside if you prefer.

```html
<form>
    <input class="form-control" type="password" name="password" [(ngModel)]="password"  minlength="5" maxlength="50" required />
    <ngx-pass-strength [passwordToCheck]="password"></ngx-pass-strength>
</form>
```

If you are using reactive forms you can use the form control to bind to the `passwordToCheck`. The component also gets a callback to give you the strength changes when the password is updated.

**Note**: This callback is updated on every change to the password whereas API is only called when the user hasn't typed for a minimum of 1000ms. This is to prevent many calls to the API.

```html
<ngx-pass-strength [passwordToCheck]="password" (onStrengthChanged)="countChange($event)"></ngx-pass-strength>
```
And in your component:

```ts
export class AppComponent  {
  countChange($event) {
    console.log($event);
  }
}
```

## Customisation

You can customise the font family and label if you would like to. Simply pass them as inputs.

```html
<ngx-pass-strength [passwordToCheck]="password" (onStrengthChanged)="countChange($event)" [fontFamily]="'Open Sans'"></ngx-pass-strength>
```

And you can change the label too.

```html
<ngx-pass-strength [passwordToCheck]="password" (onStrengthChanged)="countChange($event)" [barLabel]="'Strength'"></ngx-pass-strength>
```

## Development

### Run locally

This project uses [Angular CLI] as base. However if you want to run the library you need to have an application and reference the package. To do so, simply package the library first using:

```bash
npm run package
```

And then in your application add a reference to the generated package to your `package.json` like a normal package and run `npm i`.

```json
{
    ...,
    "dependencies": {
    "@angular/animations": "~7.2.0",
    "@angular/common": "~7.2.0",
    "@angular/compiler": "~7.2.0",
    "@angular/core": "~7.2.0",
    "@angular/forms": "~7.2.0",
    "@angular/platform-browser": "~7.2.0",
    "@angular/platform-browser-dynamic": "~7.2.0",
    "@angular/router": "~7.2.0",
    "core-js": "^2.5.4",
    "ngx-pass-strength": "file:../angular-libs/dist/ngx-pass-strength/ngx-pass-strength-0.0.2.tgz",
    "rxjs": "~6.3.3",
    "tslib": "^1.9.0",
    "sha1": "^1.1.1",
    "zone.js": "~0.8.26"
  }
}

```

## Contribute
For any type of contribution, please follow the instructions in [CONTRIBUTION](./Contribution.md) and read the [Code of Conduct](./CC.md) file too.

## Author
### Yaser Adel Mehraban (yashints)
* [Website](https://mehraban.com.au)
* [Twitter](https://twitter.com/yashints)
* [GitHub](https://github.com/yashints)