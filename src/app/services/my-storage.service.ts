import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Observable, Subscriber } from 'rxjs';
import * as _ from 'underscore';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MyStorageService {

  constructor(
    public platform: Platform,
    private nativeStorage: NativeStorage
  ) { }

  

  set(keyName, value): Observable<boolean> {
    return new Observable((observer: Subscriber<boolean>) => {
      // console.log('******** Guardando en LocalStorage como platform:');

      if (this.platform.is('cordova')) {
        // caso dispositivo
        // console.log('******** Guardando en LocalStorage como dispositivo');
        try {
          this.nativeStorage.setItem(keyName, value).then(
            () => {
              observer.next(true);
              observer.complete();
            }, err => {
              observer.next(false);
              observer.complete();
            }
          );
        } catch (reason) {
          // console.warn(reason);
          observer.next(false);
          observer.complete();
        }

      } else {
        // caso web
        // console.log('******** Guardando en LocalStorage como WEB');

        localStorage.setItem(keyName, JSON.stringify(value));
        observer.next(true);
        observer.complete();
      }
    });
  } // fin set


  get(keyName): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      // console.log('**** Lectura del localStorage')
      if (this.platform.is('cordova')) {
        // caso dispositivo
        // console.log('**** lectura como dispositivo localStorage');
        try {
          this.nativeStorage.getItem(keyName)
            .then(
              data => {
                observer.next(data);
                observer.complete();
              }, err => {
                observer.next();
                observer.complete();
              }
            );
        } catch (reason) {
          console.warn(reason);
          observer.next();
          observer.complete();
        }

      } else {
        // caso web
        // console.log('*** lectura como web del localStorage');
        observer.next(JSON.parse(localStorage.getItem(keyName)));
        observer.complete();
      }
    });
  } // fin get


  remove(keyName): Observable<boolean> {
    return new Observable((observer: Subscriber<boolean>) => {
      if (this.platform.is('cordova')) {
        // caso dispositivo
        try {
          this.nativeStorage.remove(keyName)
            .then(
              data => {
                observer.next(true);
                observer.complete();
              }, err => {
                observer.next(false);
                observer.complete();
              }
            );
        } catch (reason) {
          console.warn(reason);
          observer.next(false);
          observer.complete();
        }

      } else {
        // caso 
        localStorage.removeItem(keyName);
        observer.next(true);
        observer.complete();
      }
    });
  } // fin get





}


