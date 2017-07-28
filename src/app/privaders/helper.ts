import { Headers, Http, RequestOptions, ResponseContentType, RequestMethod } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class helpers {
    
    public displaynone() {
        $('div.page-sider').css({ "display": 'none' })
        $('div.page-head').css({ "display": 'none' });
        $('div.page-footer').css({ "display": 'none' });
        $('.ng-trigger').css({ "display": 'none' });
        $('.printgoods').css({ "display": 'block' })
    }
    public displayblock() {
        $('div.page-sider').css({ "display": 'block' })
        $('div.page-head').css({ "display": 'block' });
        $('div.page-footer').css({ "display": 'block' });
        $('.ng-trigger').css({ "display": 'block' });
        $('.printgoods').css({ "display": 'none' })
    }
}