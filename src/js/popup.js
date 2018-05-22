export class Popup {
	constructor(container, content, template) {
		this.container = container;
		this.content = content;
		this.template = template;

		container = getElement(container);
	
		const modalDialogTitle = document.createElement('div');
		modalDialogTitle.className = 'modal-dialog__title';
		return modalDialogTitle;//?
		
		const modalDialogIcon = document.createElement('button');
		modalDialogIcon.className = 'modal-dialog__icon';
		modalDialogIcon.innerHTML = '×';
		
		const modalDialogHeader = document.createElement('div');
		modalDialogHeader.className = 'modal-dialog__header';
		modalDialogHeader.appendChild(modalDialogTitle);
		modalDialogHeader.appendChild(modalDialogIcon);
		
		const modalDialogBody = document.createElement('div');
		modalDialogBody.className = 'modal-dialog__body';

		const modalDialogContent = document.createElement('div');
		modalDialogContent.className = 'modal-dialog__content';
		modalDialogContent.appendChild(modalDialogHeader);
		modalDialogContent.appendChild(modalDialogBody);
		
		const modalDialogSubstrate = document.createElement('div');
		modalDialogSubstrate.className = 'modal-dialog__substrate';
		
		const modalDialog = document.createElement('div');
		modalDialog.className = 'modal-dialog modal-dialog--hidden';
		modalDialog.appendChild(modalDialogSubstrate);
		modalDialog.appendChild(modalDialogContent);
		
		container.appendChild(modalDialog);
		
		function getElement(el) {
			if (typeof el === 'string') {
				return document.querySelector(el);
			} else {
				return el;
			}
		}
	}

	open(content, template) {
		modalDialogTitle.innerHTML = '';
		modalDialogBody.innerHTML = '';
		modalDialog.classList.remove('modal-dialog--hidden');
		modalDialogSubstrate.addEventListener('click', close, false);
		modalDialogIcon.addEventListener('click', close, false);
		modalDialogTitle.innerHTML = content;
		modalDialogBody.appendChild(template);
		return modalDialog;
	}
	
	close() {
		modalDialog.classList.add('modal-dialog--hidden');
	}
}

function createModalDialog(container, content, template) {
	
	container = getElement(container);
	
	const modalDialogTitle = document.createElement('div');
	modalDialogTitle.className = 'modal-dialog__title';
	
	const modalDialogIcon = document.createElement('button');
	modalDialogIcon.className = 'modal-dialog__icon';
	modalDialogIcon.innerHTML = '×';
	
	const modalDialogHeader = document.createElement('div');
	modalDialogHeader.className = 'modal-dialog__header';
	modalDialogHeader.appendChild(modalDialogTitle);
	modalDialogHeader.appendChild(modalDialogIcon);
	
	const modalDialogBody = document.createElement('div');
	modalDialogBody.className = 'modal-dialog__body';

	const modalDialogContent = document.createElement('div');
	modalDialogContent.className = 'modal-dialog__content';
	modalDialogContent.appendChild(modalDialogHeader);
	modalDialogContent.appendChild(modalDialogBody);
	
	const modalDialogSubstrate = document.createElement('div');
	modalDialogSubstrate.className = 'modal-dialog__substrate';
	
	const modalDialog = document.createElement('div');
	modalDialog.className = 'modal-dialog modal-dialog--hidden';
	modalDialog.appendChild(modalDialogSubstrate);
	modalDialog.appendChild(modalDialogContent);
	
	container.appendChild(modalDialog);
	
	function getElement(el) {
		if (typeof el === 'string') {
			return document.querySelector(el);
		} else {
			return el;
		}
	}
	
	function open(content, template) {
		modalDialogTitle.innerHTML = '';
		modalDialogBody.innerHTML = '';
		modalDialog.classList.remove('modal-dialog--hidden');
		modalDialogSubstrate.addEventListener('click', close, false);
		modalDialogIcon.addEventListener('click', close, false);
		modalDialogTitle.innerHTML = content;
		modalDialogBody.appendChild(template);
		return modalDialog;
	}
	
	function close() {
		modalDialog.classList.add('modal-dialog--hidden');
	}
	
	return {
		open: open,
		close: close
	}

}

export default createModalDialog;
