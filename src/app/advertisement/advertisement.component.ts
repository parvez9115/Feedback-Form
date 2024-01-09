import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import Swiper from 'swiper';

@Component({
  selector: 'app-advertisement',
  templateUrl: './advertisement.component.html',
  styleUrls: ['./advertisement.component.scss'],
})
export class AdvertisementComponent implements OnInit {
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    slideShadows: true,
  };

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  swiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  goNext() {
    this.swiper?.slideNext();
  }
  swiperSlideChanged(e: any) {
    console.log('changed:', e);
  }

  skip() {
    window.localStorage.clear();
  }
  ngOnInit() {
    window.localStorage.clear();
  }
}
