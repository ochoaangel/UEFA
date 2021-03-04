import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { MyFunctionsService } from './my-functions.service';
import { Observable, throwError } from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})

export class InterceptorService implements HttpInterceptor {

  constructor(
    private myF: MyFunctionsService,
    public router: Router,
    private platform: Platform,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let myData = { 'X-Auth-Token': 'b418be2a17204215ae5ce0b189c1e4e1' };

    const headers = new HttpHeaders(myData);
    const reqClone = req.clone({ headers });

    // caso de falla de internet redirecciona
    return next.handle(reqClone).pipe(
      tap({
        error: (res) => {
          this.myF.showAlertOk('Notificación', 'info',
            'Hay problemas de conexión..</br> Verifique la señal de internet e intente nuevamente..');

          console.warn('ERROR controlado,(falla de conexión)', res);
        }
      }),
      catchError(this.manejarError)
    );
  }


  manejarError(error: HttpErrorResponse) {
    console.warn('Error gestionado en el Servicio Interceptor', error);
    return throwError(error);
  }



}
