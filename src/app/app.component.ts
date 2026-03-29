import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize, of } from 'rxjs';
import { delay } from 'rxjs/operators';

interface Product {
  name: string;
  description: string;
  image: string;
}

interface OrderFormModel {
  name: string;
  address: string;
  phone: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  readonly products: Product[] = [
    {
      name: 'Мясная Делюкс',
      description: 'Пепперони, бекон, ветчина, шампиньоны, сладкий перец и фирменный соус.',
      image: 'assets/pizza-cheff/card-1.jpg'
    },
    {
      name: 'Морская Премиум',
      description: 'Креветки, сыр моцарелла, томаты, зелень и нежный сливочный соус.',
      image: 'assets/pizza-cheff/card-2.jpg'
    },
    {
      name: 'Бекон и Сосиски',
      description: 'Бекон, сосиски, сырный соус, томаты и ароматные специи.',
      image: 'assets/pizza-cheff/card-3.jpg'
    },
    {
      name: 'Куриная Делюкс',
      description: 'Курица, ананасы, сыр моцарелла, кукуруза и насыщенный соус.',
      image: 'assets/pizza-cheff/card-4.jpg'
    },
    {
      name: 'Барбекю Премиум',
      description: 'Шашлычки, бекон, острый перец, томаты и соус барбекю.',
      image: 'assets/pizza-cheff/card-5.jpg'
    },
    {
      name: 'Пепперони Дабл',
      description: 'Двойная порция пепперони, сыр моцарелла и фирменный томатный соус.',
      image: 'assets/pizza-cheff/card-6.jpg'
    },
    {
      name: 'Курица Терияки',
      description: 'Курица, шампиньоны, сладкий перец, лук и соус терияки.',
      image: 'assets/pizza-cheff/card-7.jpg'
    },
    {
      name: 'Сырная',
      description: 'Сыр моцарелла, чеддер, пармезан, сливочный соус и тонкое тесто.',
      image: 'assets/pizza-cheff/card-8.jpg'
    }
  ];

  readonly heroImage = 'assets/pizza-cheff/hero-pizza.png';
  readonly orderImage = 'assets/pizza-cheff/order-slice.jpg';

  formData: OrderFormModel = {
    name: '',
    address: '',
    phone: ''
  };

  selectedProduct = '';
  fullscreenImage: Product | null = null;
  isSubmitting = false;
  isSuccessPopupOpen = false;

  chooseProduct(product: Product): void {
    this.selectedProduct = product.name;
    this.formData.address = `Хочу заказать: ${product.name}`;
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    console.log(this.selectedProduct);
    console.log(this.formData.address);
  }

  openImage(product: Product): void {
    this.fullscreenImage = product;
  }

  closeImage(): void {
    this.fullscreenImage = null;
  }

  closeSuccessPopup(): void {
    this.isSuccessPopupOpen = false;
  }

  preventDotInput(event: KeyboardEvent): void {
    if (event.key === '.') {
      event.preventDefault();
    }
  }

  sanitizeName(): void {
    this.formData.name = this.formData.name.replace(/\./g, '');
  }

  submitOrder(form: NgForm): void {
    if (form.invalid) {
      form.control.markAllAsTouched();
      const formElement = document.querySelector('.order-form') as HTMLFormElement | null;
      formElement?.reportValidity();
      return;
    }

    this.isSubmitting = true;

    const payload = {
      ...this.formData,
      product: this.selectedProduct || 'Без выбранной пиццы'
    };

    // Фейковый запрос вместо реального бэкенда.
    of(payload)
      .pipe(
        delay(900),
        finalize(() => {
          this.isSubmitting = false;
        })
      )
      .subscribe(() => {
        form.resetForm();
        this.formData = { name: '', address: '', phone: '' };
        this.selectedProduct = '';
        this.isSuccessPopupOpen = true;
      });
  }
}
