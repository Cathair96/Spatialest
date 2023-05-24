export class RadioButtons {
    static radioButtons: HTMLInputElement[];

    static init(radioClassName: string) {
        this.radioButtons = document.querySelectorAll(radioClassName) as unknown as HTMLInputElement[];

        this.radioButtons.forEach((radioButton: HTMLInputElement) => {
            radioButton.addEventListener('change', (e: InputEvent) => {
                const thisRadioGroup = (e.currentTarget as HTMLInputElement).closest('.m__form-radios');
                const labels = thisRadioGroup.querySelectorAll('label');
                labels.forEach((radioLabel: HTMLLabelElement) => {
                    radioLabel.classList.remove('selected');
                    radioLabel.classList.add('inactive');
                });
                const label = radioButton.closest('label');
                if (radioButton.checked) {
                    label.classList.remove('inactive');
                    label.classList.add('selected');
                } else {
                    label.classList.remove('selected');
                }

                this.showHideMoreOptions(radioButton);
            });
        });
    }

    static showHideMoreOptions(radioButton: HTMLInputElement) {
        if (radioButton.dataset.show) {
            const showOptionElement = document.getElementById(radioButton.dataset.show);
            showOptionElement.classList.remove('hide');
        }

        if (radioButton.dataset.hide) {
            const hideOptionElement = document.getElementById(radioButton.dataset.hide);
            hideOptionElement.classList.add('hide');
        }
    }
}
