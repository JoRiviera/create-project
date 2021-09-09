/**
 * CRUD interface implemented by data access services to execute operations on db objects
 */

export interface CRUD {
	list: (searchFields: any) => any;
	create: (resource: any) => any;
	putById: (id: number, resource: any) => any;
	readById: (id: number) => any;
	deleteById: (id: number) => any;
	patchById: (id: number, resource: any) => any;
}
