import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { ApiCallService } from './api-call.service';
import { AlertController, Platform } from '@ionic/angular';
import { MyStorageService } from './my-storage.service';
import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})

export class MyFunctionsService {


  constructor(
    public myS: MyStorageService,
    public router: Router,
    private apiCall: ApiCallService,
    public alertCtrl: AlertController,
    public platform: Platform,

  ) { }



  /**
   *
   * @param collection coleccion a donde se desea buscar un solo objeto para cada keyname
   * @param keyName key especifico en el cual se elegirá el primero que no se repita
   *
   * dada una colección, digamos que se clasifica por un keyname y elige solo el primer
   *  objeto con ese keyname
   *
   */
  getUnique(collection, keyName) {

    // store the comparison  values in array
    const unique = collection.map(e => e[keyName])

      // store the indexes of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the false indexes & return unique objects
      .filter((e) => collection[e]).map(e => collection[e]);

    return unique;
  }




  // alerts
  /** */
  async showAlertOk(titulo: string, icon: string, mensajeHTML: string, redirectTo?: string) {

    let icono;
    switch (icon) {
      case 'info':
      case 'inf':
        icono = 'information-circle-outline';
        break;

      case 'done':
        icono = 'checkmark-done-circle-outline';
        break;

      default:
        icono = icon;
        break;
    }


    const alert = await this.alertCtrl.create({
      header: titulo,
      mode: 'ios',
      message: `</br><ion-icon name="${icono}"></ion-icon><br>${mensajeHTML}`,
      buttons: [
        {
          text: 'OK',
          role: 'OK',
          handler: (blah) => {
            console.log('Confirm OK: blah');
            if (redirectTo) {
              this.router.navigateByUrl(redirectTo);
            }
          }
        }
      ]
    });
    await alert.present();
  }





}   //  fin clase ppal