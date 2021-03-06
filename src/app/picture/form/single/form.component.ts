import {Component, OnInit, EventEmitter, ViewChild, ElementRef, AfterViewInit, Renderer, Input, Output } from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import {ToastsManager} from 'ng2-toastr';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {AuthService} from '../../../auth/auth.service';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['../form.component.css']
})
export class FormComponent implements OnInit {


    @ViewChild('item') item: ElementRef;
    @ViewChild('appendToChildEl') appendToChildEl: ElementRef;
    @Input() isInNewUser: boolean = false;

  @Output() onPassForm = new EventEmitter<any>();
  // setting up the form
  myForm: FormGroup;
  // textInput1: FormControl;
  // textInput2: FormControl;

  // get the Auth Token from localStorage in order to Authenticate to back end while submitting the form
  token: string = localStorage.getItem('id_token');
  angleInDegrees = 0
  url: string = '/uploads';
  maxSize: number = 50000000;
  invalidFileSizeMessage: string = '{0}: Invalid file size, ';
  invalidFileSizeMessageDetail: string = 'Maximum upload size is {0}.';
  public files: File[];
  public progress: number = 0;
  public submitStarted: boolean;
  @ViewChild('textOne') textOne: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;





  name: string;
  onClear: EventEmitter<any> = new EventEmitter();

  constructor(
      private _fb: FormBuilder,
      private toastr: ToastsManager,
      private router: Router,
      private sanitizer: DomSanitizer,
      private renderer: Renderer,
      private authService: AuthService,

    ) {}




    //
    // drawRotated(degrees: number, file: any){
    //     var canvas;
    //
    //     var angleInDegrees=0;
    //
    //     var image=document.createElement("img");
    //     if(canvas) document.body.removeChild(canvas);
    //
    //     image.src=file.notSafeURL;
    //
    //
    //     canvas = document.createElement("canvas");
    //     var ctx=canvas.getContext("2d");
    //     canvas.style.width="20%";
    //
    //     if(degrees == 90 || degrees == 270) {
    // 		canvas.width = image.height;
    // 		canvas.height = image.width;
    //     } else {
    // 		canvas.width = image.width;
    // 		canvas.height = image.height;
    //     }
    //
    //     ctx.clearRect(0,0,canvas.width,canvas.height);
    //     if(degrees == 90 || degrees == 270) {
    // 		ctx.translate(image.height/2,image.width/2);
    //     } else {
    // 	    ctx.translate(image.width/2,image.height/2);
    //    }
    //     ctx.rotate(degrees*Math.PI/180);
    //     ctx.drawImage(image,-image.width/2,-image.height/2);
    //     this.appendToChildEl.nativeElement.appendChild(canvas);
    //
    // }




    // rotate() {
    //   this.angleInDegrees= (this.angleInDegrees + 90) % 360;
    //   this.drawRotated(this.angleInDegrees, this.files[0])
    // //  this.resizeImage(this.files[0])
    // //  console.log(this.files)
    // }
  // event fired when the user selects an image
  onFileSelect(event: any) {
    this.clear();
    let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;

    for (let i = 0; i < files.length; i++) {

      let file = files[i];
      if (this.validate(file)) {
        if (this.isImage(file)) {
          file.objectURL = this.sanitizer.bypassSecurityTrustUrl((window.URL.createObjectURL(files[i])));
          file.notSafeURL = window.URL.createObjectURL(files[i])
          this.files.push(files[i]);
          this.onSubmit()

        }
      } else if (!this.isImage(file)) {
        this.toastr.error('Only images are allowed');
      }
    }
  }
  isImagePure(file: File): boolean {

    if (file.type.match('image/*')) {
      return false;
    }
    return true;
  }

  // check if the image is actually an image by checking the mime type
  isImage(file: File): boolean {
    console.log(file)
    if (
      file.type.match('image/*') ||

      file.type.match('application/pdf') ||

      file.type.match('application/msword') ||
      file.type.match('application/vnd.ms-word') ||
      file.type.match('application/vnd.ms-word.document.macroEnabled.12') ||
      file.type.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document') ||
      file.type.match('application/rtf') ||

      file.type.match('text/csv') ||
      file.type.match('application/vnd.ms-excel') ||
      file.type.match('application/vnd.ms-excel.sheet.macroEnabled.12') ||
      file.type.match('application/vnd.ms-excel.addin.macroEnabled.12') ||
      file.type.match('application/vnd.ms-excel.template.macroEnabled.12') ||
      file.type.match('application/vnd.ms-excel.sheet.binary.macroEnabled.12') ||
      file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') ||
      file.type.match('application/vnd.openxmlformats-officedocument.spreadsheetml.template') ||
      file.type.match('application/vnd.oasis.opendocument.spreadsheet') ||

      file.type.match('application/vnd.ms-powerpoint') ||
      file.type.match('application/vnd.ms-powerpoint.template.macroEnabled.12') ||
      file.type.match('application/vnd.ms-powerpoint.addin.macroEnabled.12') ||
      file.type.match('application/vnd.ms-powerpoint.presentation.macroEnabled.12') ||
      file.type.match('application/vnd.ms-powerpoint.slideshow.macroEnabled.12') ||
      file.type.match('application/vnd.openxmlformats-officedocument.presentationml.template') ||
      file.type.match('application/vnd.openxmlformats-officedocument.presentationml.presentation') ||
      file.type.match('application/vnd.openxmlformats-officedocument.presentationml.slideshow') ||

      file.type.match('application/x-adobe-indesign') ||
      file.type.match('application/x-indesign') ||
      file.type.match('application/illustrator') ||
      file.type.match('application/postscript') ||
      file.type.match('application-eps') ||
      file.type.match('application_x-eps') ||
      file.type.match('application/octet-stream') ||
      file.type.match('image/vnd.adobe.photoshop') ||
      file.type.match('application/x-photoshop') ||
      file.type.match('application/photoshop') ||
      file.type.match('application/x-photoshop') ||
      file.type.match('application/psd') ||
      file.type.match('image/psd') ||
      file.type.match('image_x-eps') ||
      file.type.match('image_eps') ||
      file.type.match('image/vnd.adobe.photoshop') ||

      file.type.match('application/x-zip-compressed') ||
      file.type.match('application/x-rar-compressed') ||
      // file.type.match('');
      file.type === ''
    ) {
      return true;
    }
    this.toastr.error('Format not allowed!');
    return false;
  }
  // check if the form has files ready to be uploaded
  hasFiles(): boolean {
    return this.files && this.files.length > 0;
  }
  // clears the form
  clear() {
    this.files = [];
    this.onClear.emit();
  }
  // remove the image from the preview
  remove(index: number) {
    this.files.splice(index, 1);
    this.fileInput.nativeElement.value = '';
  }
  // check the image file size
  validate(file: File): boolean {
    if (this.maxSize && file.size > this.maxSize) {
      this.toastr.error(this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxSize)),
        this.invalidFileSizeMessage.replace('{0}', file.name));
      return false;
    }
    return true;
  }
// format the size to display it in toastr in case the user uploaded a file bigger than 5MB
  formatSize(bytes: number) {
    if (bytes === 0) {
      return '0 B';
    }
    let k = 1000,
      dm = 3,
      sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
      i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  ngOnInit() {
    this.files = [];
    // this.textInput1 = new FormControl('');
    // this.textInput2 = new FormControl('');
    //
    this.myForm = this._fb.group({
      // textInput1: this.textInput1,
      // textInput2: this.textInput2
    });
  }
  // focus on first input box after the view is initialized
  // ngAfterViewInit() {
  //   // setTimeout(() => {
  //   //   this.renderer.invokeElementMethod(this.textOne.nativeElement, 'focus', []);
  //   // }, 50);
  // }

  // isLoggedIn() {
  //   return this.authService.isLoggedIn();
  // }
  // submit the form to back end
  onSubmit() {
    this.submitStarted = true;
    let xhr = new XMLHttpRequest();
    let formData = new FormData();
    for (let i = 0; i < this.files.length; i++) {
      formData.append('fileUp', this.files[i], this.files[i].name);
    }
    xhr.upload.addEventListener('progress', (event: ProgressEvent) => {
      if (event.lengthComputable) {
        this.progress = Math.round((event.loaded * 100) / event.total);
      }
    }, false);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        this.progress = 0;
        if (xhr.status === 201) {
          //this.router.navigateByUrl('/user/forms');
        //  location.reload();
          let form = JSON.parse(xhr.response).obj
          // console.log(form)
          this.onPassForm.emit(form);


          this.toastr.success('Form submitted successfully');
        } else if (xhr.status !== 201) {
          console.log(xhr)
          this.toastr.error('There was an error!');
        }
        this.clear();
      }
    };
    xhr.open('POST', this.url, true);
    // formData.append('textInput1', this.myForm.value.textInput1);
    // formData.append('textInput2', this.myForm.value.textInput2);
    xhr.withCredentials = true;
    xhr.setRequestHeader('Authorization', this.token);
    xhr.send(formData);
    // console.log(xhr);
  }
  // isAdmin() {
  //   return this.authService.isAdmin();
  // }



}
