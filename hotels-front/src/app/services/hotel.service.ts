import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { environment as env } from '../../environments/environment';
import { Hotel, Pagination } from '../models';

export interface ListRequestArgs {
  query: Hotel;
  pageNumber: number;
  perPage: number;
}

@Injectable()
export class HotelService {
  private rootUrl: string = `${env.api.root}/${env.api.hotels}`;
  constructor(private http: HttpClient) { }

  public getList(args: ListRequestArgs): Observable<Pagination<Hotel>> {
    const params: HttpParams = new HttpParams()
      .set('hotel', JSON.stringify(args.query))
      .set('pageNumber', args.pageNumber.toString())
      .set('perPage', args.perPage.toString());
    return this.http.get<Pagination<Hotel>>(this.rootUrl, { params }).pipe(
      map(pagination => {
        pagination.list = pagination.list.map(item => new Hotel(item));
        return pagination;
      })
    );
  }
}
