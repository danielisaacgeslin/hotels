import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment as env } from '../../environments/environment';

@Injectable()
export class HotelService {
  private rootUrl: string = `${env.api.root}/${env.api.hotels}`;
  constructor(private http: HttpClient) { }
}
