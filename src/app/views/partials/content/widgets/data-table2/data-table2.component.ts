import { QueryParamsModel } from './../../../../../core/_base/crud/models/query-models/query-params.model';
import { DataTableService } from './../../../../../core/_base/layout/services/datatable.service';
import { DataTableItemModel} from './../../../../../core/_base/layout/models/datatable-item.model';
// Angular
import { Component, OnInit, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
// RXJS
import { tap } from 'rxjs/operators';
import { merge } from 'rxjs';
// Crud
import { DataTable2DataSource } from './data-table2.data-source';


@Component({
	selector: 'kt-data-table2',
	templateUrl: './data-table2.component.html',
	styleUrls: ['./data-table2.component.scss']
})
export class DataTable2Component implements OnInit {
	// Public properties
	dataSource: DataTable2DataSource;
	displayedColumns = ['fileName','subscribers',  'action' ];
	@ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
	@ViewChild(MatSort, {static: true}) sort: MatSort;
	selection = new SelectionModel<DataTableItemModel>(true, []);

	constructor(private dataTableService: DataTableService) {}
	/**
	 * On init
	 */
	ngOnInit() {
		// If the user changes the sort order, reset back to the first page.
		this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
		merge(this.sort.sortChange, this.paginator.page)
			.pipe(
				tap(() => {
					this.loadItems();
				})
			)
			.subscribe();

		// Init DataSource
		this.dataSource = new DataTable2DataSource(this.dataTableService);
		// First load
		this.loadItems(true);
	}

	loadItems(firstLoad: boolean = false) {
		const queryParams = new QueryParamsModel(
			{},
			this.sort.direction,
			this.sort.active,
			this.paginator.pageIndex,
			firstLoad ? 6 : this.paginator.pageSize
		);
		this.dataSource.loadItems(queryParams);
		this.selection.clear();
	}

	/* UI */
	getItemStatusString(status: number = 0): string {
		switch (status) {
			case 0:
				return 'Selling';
			case 1:
				return 'Sold';
		}
		return '';
	}
	getItemCssClassByStatus(status: number = 0): string {
		switch (status) {
			case 0:
				return 'success';
			case 1:
				return 'info';
		}
		return '';
	}

	getItemConditionString(condition: number = 0): string {
		switch (condition) {
			case 0:
				return 'New';
			case 1:
				return 'Used';
		}
		return '';
	}

	getItemCssClassByCondition(condition: number = 0): string {
		switch (condition) {
			case 0:
				return 'success';
			case 1:
				return 'info';
		}
		return '';
	}
	deleteFile(id){
		this.dataTableService.deleteFile(id)
		.subscribe(
			res=>console.log(res)
		)
	}
	updateFile(id,changeDate){
		this.dataTableService.updateFile(id,changeDate)
		.subscribe(
			res=>console.log(res)
		)
	}
}
