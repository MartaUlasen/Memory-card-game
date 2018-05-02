(function() {
	'use strict';	
	
	function createModalDialog(container, content) {
		var modalDialog;
		var modalDialogContent;
		var modalDialogSubstrate;
		var modalDialogBody;
		var modalDialogHeader;
		var modalDialogIcon;
		var modalDialogTitle;
		
		container = getElement(container);
		
		
		modalDialogTitle = document.createElement('div');
		modalDialogTitle.className = 'modal-dialog__title';
		
		modalDialogIcon = document.createElement('button');
		modalDialogIcon.className = 'modal-dialog__icon';
		modalDialogIcon.innerHTML = '×';
		
		modalDialogHeader = document.createElement('div');
		modalDialogHeader.className = 'modal-dialog__header';
		modalDialogHeader.appendChild(modalDialogTitle);
		modalDialogHeader.appendChild(modalDialogIcon);
		
		modalDialogBody = document.createElement('div');
		modalDialogBody.className = 'modal-dialog__body';
		//modalDialogBody.innerHTML = content;
				
		modalDialogContent = document.createElement('div');
		modalDialogContent.className = 'modal-dialog__content';
		modalDialogContent.appendChild(modalDialogHeader);
		modalDialogContent.appendChild(modalDialogBody);
		
		modalDialogSubstrate = document.createElement('div');
		modalDialogSubstrate.className = 'modal-dialog__substrate';
		
				
		modalDialog = document.createElement('div');
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
		
		function open(content) {
			modalDialog.classList.remove('modal-dialog--hidden');
			modalDialogSubstrate.addEventListener('click', close, false);
			modalDialogIcon.addEventListener('click', close, false);
			modalDialogBody.innerHTML = content;
		}
		
		function close() {
			modalDialog.classList.add('modal-dialog--hidden');
			modalDialogSubstrate.removeEventListener('click', substrateCloseModalDialog, false);
			modalDialogIcon.removeEventListener('click', buttonCloseModalDialog, false);
		}
		
		return {
			open: open,
			close: close			
		}
	
	}
	
	window.createModalDialog = createModalDialog;
	//createModalDialog(document.body, 'привет');
	
	
})();
