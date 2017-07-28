import { Component, OnInit } from '@angular/core';
import { sliderlist } from './sliderlist';
import { Router } from '@angular/router';
import { TOKEN } from '../privaders/urlService';
import { adduser } from './system-manage/system.manage';
// declare const $:any;
@Component({
  moduleId: module.id,
  selector: 'pages',
  templateUrl: 'pages.component.html',
  styleUrls: ['pages.component.scss']
})
export class PagesComponent implements OnInit {
  public silderlist = sliderlist;
  public userInfo:adduser;
  constructor(private route: Router) {

  }
  ngOnInit() {
    // console.log(this.silderlist);
    $('ul.child_menu').slideUp();
    this.userInfo=JSON.parse(localStorage.getItem(TOKEN)).userDetailDto.user;
  }
  //折叠列表
  public showOrhide(str, obj) {
    console.log(str);
    // this.sh = str;
    // console.log();
    if ($("ul." + str).css('display') == 'block') {
      $("ul." + str).slideUp();
      $("ul." + str).prev().children(".fa-chevron-left").css({ "transform": "rotate(0deg)", "transition": "transform .2s" })
    } else {
      $("ul." + str).slideDown();

      $("ul." + str).prev().children(".fa-chevron-left").css({ "transform": "rotate(-90deg)", "transition": "transform .2s" })
    }
  }
  public layout() {
    this.route.navigateByUrl('user')
  }
}
