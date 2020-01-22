// Angular
import { Injectable } from '@angular/core';
// Angular in memory
import { InMemoryDbService } from 'angular-in-memory-web-api';
// RxJS
import { Observable } from 'rxjs';
// Auth


// Models
import { CarsDb } from './fake-db/cars';

@Injectable()
export class FakeApiService implements InMemoryDbService {
	/**
	 * Service Constructore
	 */
	constructor() {}

	/**
	 * Create Fake DB and API
	 */
	createDb(): {} | Observable<{}> {
		// tslint:disable-next-line:class-name
		const db = {
			// auth module


			// e-commerce
			// customers
	

		

			// data-table
			cars: CarsDb.cars
		};
		return db;
	}
}
