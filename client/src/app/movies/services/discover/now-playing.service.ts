import { Injectable }       from '@angular/core';
import { Http }             from '@angular/http';
import { Observable }       from 'rxjs/Observable';

import { IMovie }           from '../../../shared/interfaces';
import { API }              from '../moviedb-api-info';
import { DiscoverService }  from './discover.service';

@Injectable()
export class NowPlayingService extends DiscoverService {

  constructor(protected http: Http) {
    super(http);
  }

  public getNowPlaying(): Observable<[IMovie]> {
    this.page = this.page || 1;
    const url = `${API.url}/movie/now_playing?${API.key}&language=en-US&page=${this.page}`;

    return this.getMovies(url);
  }
}

