import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import { ToastController } from '@ionic/angular';

const httpOptionsWithJson = {
    headers: new HttpHeaders({ 'Authorization': 'Basic YWRtaW46YWRtaW4=', 'Content-Type': 'application/json;charset=utf-8' }),
    //withCredentials: true,
};
const httpOptionsWithString = {
    headers: new HttpHeaders({ 'Authorization': 'Basic YWRtaW46YWRtaW4=' }),
    withCredentials: true,
    responseType: 'text' as 'json'
};

@Injectable({
    providedIn: 'root'
})
export class AjaxService {

    constructor(
        private http: HttpClient,
        public toastController: ToastController) { }

    handleError = (error: HttpErrorResponse) => {
        console.log("Orginal Error" + JSON.stringify(error));
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        return throwError('Something bad happened; please try again later.');
    }
    returnHandleError =  (error: HttpErrorResponse) => {
        localStorage.setItem("res",error.error.text);
        return "s";
     
    }
    private extractData(res: Response) {
        const body = res;
        return body || {};
    }
    private extractStringData(res: Response) {
        const body = res;
        return body || '';
    }
    ajaxGetObject(url: string): Observable<any> {
        return this.http.get(url, httpOptionsWithJson)
            .pipe(
                map(this.extractData),
                catchError(this.handleError)
            );
    }

    ajaxPutMethod(url: string, data: any): Observable<any> {
        return this.http.put(url, data, httpOptionsWithJson)
            .pipe(
                map(this.extractData),
                catchError(this.handleError)
            );
    }
   
    ajaxGetWithError(url: string): Observable<any> {
        return this.http.get(url, httpOptionsWithJson)
        .pipe(
            map(this.extractStringData),
            catchError(this.returnHandleError)
        );
    }
    
}