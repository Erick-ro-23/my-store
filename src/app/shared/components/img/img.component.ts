import { Component, OnInit, Input, Output, EventEmitter,OnChanges, SimpleChanges, AfterViewInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  img:string = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string){
    this.img = newImg;
    console.log('change just img=>', this.img)
  }
  @Input() alt:string ='';
  imageDefault = '../assets/images/juguete.jpg';
  @Output() loaded = new EventEmitter<string>();
  // counter = 0;
  // counterFn: number | undefined;

constructor() {
  //before render
  // NO async --once time
  console.log('Constructor','imgValue =>',this.img);

}
ngOnChanges(changes: SimpleChanges){
  //before - during render
  //changes input - times
  console.log('ngOnChanges','imgValue =>',this.img);
  console.log('changes',changes);

}
  ngOnInit(): void {
    //before render
    //async -fetch --once time
    console.log('ngOnInit','imgValue =>',this.img);
  //  this.counterFn = window.setInterval(() => {
  //     this.counter +=1;
  //     console.log('run couter')
  //   },1000)
  }
ngAfterViewInit(): void {
   //after render
   //handler children
   console.log('ngAfterViewInit');
}

ngOnDestroy(): void {
  //delete
  console.log('ngOnDestroy');
  // window.clearInterval(this.counterFn)
}

  imgError() {
 this.img = this.imageDefault;
  }
  imgLoaded(){
  console.log('log hijo');
  this.loaded.emit(this.img);
  }

}
