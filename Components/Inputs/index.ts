export class Input {
    static inputElements: HTMLInputElement[] = [];

    static init(inputClassName: string) {
        this.inputElements = document.querySelectorAll(inputClassName) as unknown as HTMLInputElement[];

        this.inputElements.forEach((inputElement: HTMLInputElement) => {
            inputElement.addEventListener('change', () => {
                this.handleInputChange(inputElement);
            });
        });
    }

    static handleInputChange(inputElement: HTMLInputElement) {
        if (inputElement.classList.contains('js-intuitiveErrors')) {
            const intuitiveErrorElement = document.querySelector('#intuitiveErrors');
            intuitiveErrorElement.classList.add('hide');

            const continueButton = document.querySelector(`#${inputElement.dataset.continue}`);
            continueButton.classList.remove('hide');
        }
    }
}
