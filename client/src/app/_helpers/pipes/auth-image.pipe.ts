import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { environment as env } from '../../../environments/environment';

@Pipe({
  name: 'authImage',
})
export class AuthImagePipe implements PipeTransform {
  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  transform(fileKey: string): Observable<string> {
    const token = this.authService.retrieveTokens().accessJwt;
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    return this.http
      .get(`${env.serverUrl}/file-fetch/${fileKey}`, {
        headers,
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
