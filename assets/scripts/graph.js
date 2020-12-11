const today = new Date();
const fullDate = today.toLocaleString("ru", {weekday: "long", month: "numeric", day: "numeric", year: "numeric"});
const countDayOfMonth = new Date(2020, 12, 0).getDate();

/*
* Возвращает объект с рандомным значением числа и цвета
* Если значение меньше 120 то цвет зеленый
* Если значение выше 120 то цвет красный
* */
const getRandomData = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const random = Math.floor(Math.random() * (max - min + 1)) + min;
	let out = {
		num: random,
		color: '',
	};

	random > 120 ? out.color = 'rgba(219, 0, 7, 1)' : out.color = 'rgba(169, 194, 63, 1)';

	return out;
}

/*
* Возвращает добъект с данными число и цвет
* */
const getBarsInfo = (count, min, max) => {
	let out = [];

	for (let i = 1; i <= count; i++) {
		out.push(getRandomData(min, max));
	}

	return out;
}
const fakeData = getBarsInfo(countDayOfMonth, 0, 150);


/*
* Возвращает массив от 1 до переданного числа
* */
const count = (end) => {
	let c = [];
	for (let i = 1; i <= end; i++) c.push(i)
	return c;
}

/*
* Возвращает массив с цветами
* */
const colors = (end, fakeData) => {
	let c = [];

	for (let i = 0; i < end; i++) c.push(fakeData[i].color);

	return c;
}

/*
 * Возвращает массив с данными за день
 * */
const dataOfDay = (end, fakeData) => {
	let c = [];

	for (let i = 0; i < end; i++) c.push(fakeData[i].num);

	return c;
}

/*
* Отрисовка графика
* */
const optionsOfBar = {
	legend: {
		display: false
	},
	maintainAspectRatio: false,
	scales: {
		yAxes: [{
			stacked: true,
			gridLines: {
				display: true,
			}
		}],
		xAxes: [{
			gridLines: {
				display: false
			}
		}]
	}
};
const dataOfDays = {
	labels: count(countDayOfMonth),
	datasets: [{
		backgroundColor: colors(countDayOfMonth, fakeData),
		borderColor: "transparent",
		borderWidth: 2,
		data: dataOfDay(countDayOfMonth, fakeData),
	}]
};


const getChartDays = (elId, options, data) => {
	return Chart.Bar(elId, {
		options: options,
		data: data
	});
}

getChartDays('chart-top', optionsOfBar, dataOfDays);


/*
* Отрисовка скрытых баров с иконками погоды
* */
const mainChart = document.querySelector('.chart-container-main');
const hiddenBars = mainChart.querySelector('.hidden-bars');

const getHiddenBars = (end, el) => {

	const weatherIco = ['rain', 'cloud', 'sun', 'wind'];
	const bar = `<div class="hidden-bar weather-ico cloud "></div>`;
	const random = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	for (let i = 0; i < end; i++) {
		el.insertAdjacentHTML("beforeend", `
				<div 
					class="hidden-bar weather-ico ${weatherIco[random(0,3)]}" 
					data-number-day="${i+1}"
					data-full-date="${fullDate}"
					data-color="${fakeData[i].color}"
					data-num="${fakeData[i].num}"
					>
					<div class="tool-tip">
						<span>${fullDate}</span>
						<span>${fakeData[i].num}</span>
						<span>${fakeData[i].color}</span>
					</div>
				</div>
			`);
	}
}

getHiddenBars(countDayOfMonth, hiddenBars);

const hiddenBar = hiddenBars.querySelectorAll('.hidden-bar');
hiddenBar.forEach( bar => bar.addEventListener('mouseover', showToolTip));
hiddenBar.forEach( bar => bar.addEventListener('mouseout', hideToolTip));
hiddenBar.forEach( bar => bar.addEventListener('click', showGraphHours));

function showToolTip () {
	const toolTip = this.querySelector('.tool-tip');
	toolTip.classList.add('active');
}

function hideToolTip () {
	const toolTip = this.querySelector('.tool-tip');
	toolTip.classList.remove('active');
}

function showGraphHours () {
	const chartBottom = document.querySelector('.main-chart-bottom');
	const chartBottomContainer = chartBottom.querySelector('.chart-container');
	const fakeData = getBarsInfo(24, 0, 150);
	const dataOfHours = {
		labels: count(24),
		datasets: [{
			backgroundColor: colors(24, fakeData),
			borderColor: "transparent",
			borderWidth: 2,
			data: dataOfDay(24, fakeData),
		}]
	};

	chartBottom.classList.remove('no-active');
	chartBottomContainer.innerHTML = '<canvas id="chart-bottom" width="300" height="200"></canvas>';

	getChartDays('chart-bottom', optionsOfBar, dataOfHours);
}