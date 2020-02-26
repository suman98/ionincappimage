import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LocalStorageService } from '../services/local-storage_services';


@Injectable()
export class SettingsService {
    // typing our private Observable, which will store our chosen theme in-memory
	private notificationSetting: BehaviorSubject<String>;
    private fontSize: BehaviorSubject<String>;	
	private nightMode: BehaviorSubject<String>;	
	public themeMode_status: any;
	public fontSize_status: any;
	public notification_status: any;
	public theme:String;
	public chosenFontSize:String;
    constructor(public storageservice: LocalStorageService) {	
		this.storageservice;
		// For Push Notification
		var notification_status = this.storageservice.getItem('notificationMode');
		if(notification_status == null)
		{
		  this.storageservice.addItem('notificationMode', 'enable');
		  this.notificationSetting = new BehaviorSubject('enable');
		}
		else
		  this.notificationSetting = new BehaviorSubject(notification_status);
		
		// For Night Mode
		var themeMode_status = this.storageservice.getItem('nightMode');
		if(themeMode_status == null)
		{
		  this.storageservice.addItem('nightMode', 'light-theme');
		  this.nightMode = new BehaviorSubject('light-theme');
		}
		else
		  this.nightMode = new BehaviorSubject(themeMode_status);
		
		// For Font Size
		var fontSize_status = this.storageservice.getItem('fontSize');
		if(fontSize_status == null)
		{
		  this.storageservice.addItem('fontSize', 'fnt-md');
		  this.fontSize = new BehaviorSubject('fnt-md');
		}
		else
		  this.fontSize = new BehaviorSubject(fontSize_status);
	  
    }
	
	setPushNotification(val: any) {
		this.storageservice.addItem('notificationMode', val);
        this.notificationSetting.next(val);
    }
	
    getPushNotification() {
        return this.notificationSetting.asObservable();
    }
	
    setFontSize(val: any) {
		this.storageservice.addItem('fontSize', val);
        this.fontSize.next(val);
    }
	
    getFontSize() {
        return this.fontSize.asObservable();
    }
	
	setNightMode(val: any) {
		this.storageservice.addItem('nightMode', val);
        this.nightMode.next(val);
    }
	
    getNightMode() {
        return this.nightMode.asObservable();
	}
	sendTheme(){
		this.getNightMode().subscribe(val => this.theme = val);
		this.getFontSize().subscribe(val => this.chosenFontSize = val);
		let themeDat={
			bg:this.theme,
			font:this.chosenFontSize
		}
		return themeDat;
	}
	cacheHotNews(val:any){
		var HotNews = this.storageservice.getItem('HotNews');
		if(HotNews!=null){
		HotNews=null;
		}
		this.storageservice.addItem('HotNews',val);
		
	}
}