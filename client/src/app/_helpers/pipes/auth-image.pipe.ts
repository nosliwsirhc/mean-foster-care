import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from '../../../environments/environment';

@Pipe({
  name: 'authImage',
})
export class AuthImagePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer, private http: HttpClient) {}

  transform(fileKey: string): Observable<string> {
    return this.http
      .get(`${env.serverUrl}/file-fetch/${fileKey}`, {
        responseType: 'blob',
      })
      .pipe(
        catchError((error) => {
          return of('assets/images/404-not-found-medium.jpg');
        }),
        map((result) => {
          const resourceUrl = URL.createObjectURL(result);
          return this.sanitizer.bypassSecurityTrustResourceUrl(
            resourceUrl
          ) as string;
        })
      );
  }
}
