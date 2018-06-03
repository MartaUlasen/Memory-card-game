export class Popup {
	constructor(container, content, template) {
		this.container = container;
		this.content = content;
		this.template = template;

		container = getElement(container);
	
		this.modalDialogTitle = document.createElement('div');
		this.modalDialogTitle.className = 'modal-dialog__title';
		
		this.modalDialogIcon = document.createElement('button');
		this.modalDialogIcon.className = 'modal-dialog__icon';
		this.modalDialogIcon.innerHTML = '×';
		
		this.modalDialogHeader = document.createElement('div');
		this.modalDialogHeader.className = 'modal-dialog__header';
		this.modalDialogHeader.appendChild(this.modalDialogTitle);
		this.modalDialogHeader.appendChild(this.modalDialogIcon);
		
		this.modalDialogBody = document.createElement('div');
		this.modalDialogBody.className = 'modal-dialog__body';

		this.modalDialogContent = document.createElement('div');
		this.modalDialogContent.className = 'modal-dialog__content';
		this.modalDialogContent.appendChild(this.modalDialogHeader);
		this.modalDialogContent.appendChild(this.modalDialogBody);
		
		this.modalDialogSubstrate = document.createElement('div');
		this.modalDialogSubstrate.className = 'modal-dialog__substrate';
		
		this.modalDialog = document.createElement('div');
		this.modalDialog.className = 'modal-dialog modal-dialog--hidden';
		this.modalDialog.appendChild(this.modalDialogSubstrate);
		this.modalDialog.appendChild(this.modalDialogContent);
		

		container.appendChild(this.modalDialog);
		
		function getElement(el) {
			if (typeof el === 'string') {
				return document.querySelector(el);
			} else {
				return el;
			}
		}
		
		// bind methods
		this.open = this.open.bind(this);
		this.close = this.close.bind(this);
	}

	open(content, template) {
		this.modalDialogTitle.innerHTML = '';
		this.modalDialogBody.innerHTML = '';
		this.modalDialog.classList.remove('modal-dialog--hidden');
		//this.modalDialogSubstrate.addEventListener('click', this.close, false);
		this.modalDialogIcon.addEventListener('click', this.close, false);
		this.modalDialogTitle.innerHTML = content;
		this.modalDialogBody.appendChild(template);
		return this.modalDialog;
		
	}
	
	close() {
		this.modalDialog.classList.add('modal-dialog--hidden');
	}
}
