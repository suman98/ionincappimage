import { Injectable } from '@angular/core';


@Injectable()
export class LocalStorageService {
	
	constructor() {
	}
	
	public getItem(itemKey: any) {
		return localStorage.getItem(itemKey);
	}

	public addItem(itemKey: any, itemData: any) {
		localStorage.setItem(itemKey, itemData);
	}

	public deleteItem(itemKey: any) {
		localStorage.removeItem(itemKey);
	}

	public updateItem(itemKey: any, itemData: any) {
		localStorage.setItem(itemKey, itemData);
	}
	public cacheHotNews(val:any){
		this.deleteItem('HotNews');
		this.addItem('HotNews',val);	
	}
	public cachePopularNews(val:any){
		this.deleteItem('PopularNews');
		this.addItem('PopularNews',val);
	}
	public cacheLatestNews(val:any){
		this.deleteItem('LatestNews');
		this.addItem('LatestNews',val);
	}
}