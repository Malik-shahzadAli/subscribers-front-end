import { DataTableItemModel } from './../../../../../core/_base/layout/models/datatable-item.model';
import { DataTableService } from './../../../../../core/_base/layout/services/datatable.service';
import { HttpExtenstionsModel } from './../../../../../core/_base/crud/models/http-extentsions-model';
import { QueryResultsModel } from './../../../../../core/_base/crud/models/query-models/query-results.model';
import { QueryParamsModel } from './../../../../../core/_base/crud/models/query-models/query-params.model';
// Angular
import { CollectionViewer, DataSource } from '@angular/cdk/collections';
// RxJS
import { Observable, BehaviorSubject, of} from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
// CRUD
// import { QueryParamsModel,  QueryResultsModel, HttpExtenstionsModel } from '../../../../../../core/_base/crud';
// import { DataTableService, DataTableItemModel } from '../../../../../../core/_base/layout';
//   import { DataTableItemModel}
// Why not use MatTableDataSource?
/*  In this example, we will not be using the built-in MatTableDataSource because its designed for filtering,
	sorting and pagination of a client - side data array.
	Read the article: 'https://blog.angular-university.io/angular-material-data-table/'
**/
export class DataTable2DataSource implements DataSource<DataTableItemModel> {
	// Public properties
	entitySubject = new BehaviorSubject<any[]>([]);
	hasItems: boolean = false; // Need to show message: 'No records found

	// Loading | Progress bar
	loadingSubject = new BehaviorSubject<boolean>(false);
	loading$: Observable<boolean>;

	// Paginator | Paginators count
	paginatorTotalSubject = new BehaviorSubject<number>(0);
	paginatorTotal$: Observable<number>;

	/**
	 * Data-Source Constructor
	 *
	 * @param dataTableService: DataTableService
	 */
	constructor(private dataTableService: DataTableService) {
		this.loading$ = this.loadingSubject.asObservable();
		this.paginatorTotal$ = this.paginatorTotalSubject.asObservable();
		this.paginatorTotal$.subscribe(res => this.hasItems = res > 0);
	}

	/**
	 * Connect data-source
	 *
	 * @param collectionViewer: CollectionViewer
	 */
	connect(collectionViewer: CollectionViewer): Observable<any[]> {
		// Connecting data source
        return this.entitySubject.asObservable();
    }

	/**
	 * Disconnect data-source
	 *
	 * @param collectionViewer: CollectionViewer
	 */
	disconnect(collectionViewer: CollectionViewer): void {
		// Disonnecting data source
        this.entitySubject.complete();
		this.loadingSubject.complete();
		this.paginatorTotalSubject.complete();
	}

	baseFilter(_entities: any[], _queryParams: QueryParamsModel): QueryResultsModel {
		let entitiesResult = _entities;

		// Sorting
		// start
		if (_queryParams.sortField) {
			entitiesResult = this.sortArray(_entities, _queryParams.sortField, _queryParams.sortOrder);
		}
		// end

		// Paginator
		// start
		const totalCount = entitiesResult.length;
		const initialPos = _queryParams.pageNumber * _queryParams.pageSize;
		entitiesResult = entitiesResult.slice(initialPos, initialPos + _queryParams.pageSize);
		// end

		const queryResults = new QueryResultsModel();
		queryResults.items = entitiesResult;
		queryResults.totalCount = totalCount;
		return queryResults;
    }

    loadItems(queryParams: QueryParamsModel) {
		this.loadingSubject.next(true);
		this.dataTableService.getAllItems().pipe(
			tap(res => {
				// console.log(res)
				const result = this.baseFilter(res['allFiles'], queryParams);
				this.entitySubject.next(result.items);
				this.paginatorTotalSubject.next(result.totalCount);
				console.log(res)

			}),
			catchError(err => of(new QueryResultsModel([], err))),
			finalize(() => this.loadingSubject.next(false))
		).subscribe();
    }

	sortArray(_incomingArray: any[], _sortField: string = '', _sortOrder: string = 'asc'): any[] {
		const httpExtenstion = new HttpExtenstionsModel();
		return httpExtenstion.sortArray(_incomingArray, _sortField, _sortOrder);
	}
}
