// custom-option.ts
import {ToastOptions} from 'ng2-toastr';

export class CustomOption extends ToastOptions {
  // animate = 'flyRight'; // you can override any options available
  // newestOnTop = false;
  // showCloseButton = true;

  animate = 'fade';
  newestOnTop = true;
  maxShown = 1;
  toastLife = 1500;
  showCloseButton = false;

}
