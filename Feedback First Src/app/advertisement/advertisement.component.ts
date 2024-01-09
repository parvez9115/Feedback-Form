import { Component, OnInit } from "@angular/core";
import { IonSlides } from "@ionic/angular";

@Component({
  selector: "app-advertisement",
  templateUrl: "./advertisement.component.html",
  styleUrls: ["./advertisement.component.scss"],
})
export class AdvertisementComponent implements OnInit {
  constructor() {}
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    speed: 400,
    slideShadows: true,
  };

  slidesDidLoad(slides: IonSlides) {
    slides.startAutoplay();
  }
  skip() {
    window.localStorage.clear();
  }
  ngOnInit() {
    window.localStorage.clear();
  }
}
