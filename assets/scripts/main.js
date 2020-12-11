/*
	включение / отключение графиков
*/
const toggleGraph  = document.querySelectorAll('.toggle-graph');

toggleGraph.forEach(toggle => toggle.addEventListener('click', () => switchOnOffGraph(toggle)));

function switchOnOffGraph (toggle) {
	const toggleParent = toggle.closest('.aside-graph');
	toggleParent.classList.toggle('aside-graph-off');
}

/*
	выпадающее меню
*/
const menuItemDropdown = document.querySelectorAll('.menu-item-dropdown');

menuItemDropdown.forEach(item => item.addEventListener('click', ()=> switchDropDownMenu(item)));

function switchDropDownMenu (menuItem) {
	const dropMenu = menuItem.nextElementSibling;

	menuItemDropdown.forEach( item => {
		item.classList.remove('active');
		item.removeAttribute('style');
	});

	if (!menuItem.getAttribute('style')) {
		menuItem.classList.toggle('active');
	}

	menuItem.style.background = "url('./assets/images/arrow-up.svg') no-repeat 100% 60%";
	menuItem.style.backgroundSize = "15px";

	dropMenu.addEventListener('mouseleave', () => {
		menuItem.classList.remove('active');
		menuItem.removeAttribute('style');
	});
}

/*
	переключание диапазона
*/
const wrapIntervalSwitch = document.querySelectorAll('.switch-interval-wrapper');

wrapIntervalSwitch.forEach(elem => elem.addEventListener('click', (e) => changeInterval(e)));

function changeInterval (e) {
	const el = e.target;

	if (el.classList.contains('switch-interval')) {
		const elParent = el.parentNode;
		const switchers = elParent.querySelectorAll('.switch-interval');

		switchers.forEach( switcher => switcher.classList.remove('active'));
		el.classList.toggle('active');
	}
}

/*
	мадальное окно карты
*/
const btnModal = document.querySelectorAll('[data-modal]');

btnModal.forEach(btn => btn.addEventListener('click', () => openModal(btn.dataset.modal)));

function openModal (el) {
	const modal = document.querySelector(`.modal-${el}`);
	const modalClose = modal.querySelector('.modal-close');

	modal.classList.add('modal-active');
	document.querySelector('body').style.overflow = 'hidden';

	modalClose.onclick = () => {
		modal.classList.remove('modal-active');
		document.querySelector('body').style.overflow = 'auto';
	}

}


