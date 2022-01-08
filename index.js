const readlineSync = require('readline-sync');

function playBullsAndCaws() {
	greetings();
	do {
		playGame();
	}
	while(wantToPlay());
	console.log("Спасибо за игру. До свидания!")
}

function playGame() {
	const length = getLength(); //Игрок вводит число цифр
	let efforts = getEfforts();	//Игрок вводит число попыток

	const targetNumber = randomNumber(length); //Компьютер загадал число
	console.log(`Я загадал число из ${length} цифр. У Вас есть ${efforts} попыток, чтобы угадать его`);
	do {
		console.log(`У Вас осталось ${efforts} попыток.`)
		let newNumber = getNumber(length); //Пользователь вводит число-попытку
		if (checkForWin(newNumber, targetNumber)) {
			console.log("Поздравляем! Вы победили!");
			return;
		} else {			
			efforts--;
		}
	} 
	while (efforts > 0);
	console.log("Вы проиграли");
}


function greetings() {
	console.log("Приветствую Вас! \nЭто игра 'Быки и коровы'. \nЯ загадаю число от 3-х до 6-ти цифр, а Вам предвстоит угадать его \nс заданного количества попыток");
}

function wantToPlay() {
	do {
			console.log("\nХотите сыграть ещё? (y/n)");
			let answer = readlineSync.question(''); //читаем число, при пустом вводе - по умолчанию 5
			//валидируем ввод. если ввод состоит из одной цифры и она от 3 до 6 возвращаем результат. Иначе ошибка.
			if (answer === 'y') {
				return true;
			} else if (answer === 'n') {
				return false;
			}
			else {console.log("Неправильный ввод.")}
	}
	while (true);
}

function getLength() {
	do {
			console.log("Сколько цифр в загадываемом числе, от трех до шести? (5)");
			let length = readlineSync.question('') || 5; //читаем число, при пустом вводе - по умолчанию 5
			//валидируем ввод. если ввод состоит из одной цифры и она от 3 до 6 возвращаем результат. Иначе ошибка.
			if (/^\d$/.test(length) && length >= 3 && length <= 6) {
				return length;
			} else {console.log("Неправильный ввод.")}
	}
	while (true);
}

function getEfforts() {
	do {
			console.log("Сколько попыток? (5)");
			let efforts = readlineSync.question('') || 5; //читаем число, при пустом вводе - по умолчанию 5
			//валидируем ввод. если ввод состоит из цифр, возвращаем его.
			if (/^\d+$/.test(efforts)) {
				return efforts;
			} else {console.log("Неправильный ввод. Нужно ввести число")}
	}
	while (true);
}

function randomNumber(length) {
	let templateString = "0123456789";
	let result = '';
	for (let i = 0; i < length; i++) {
		let randomIndex = Math.floor(Math.random() * templateString.length);
		result += templateString[randomIndex];
		templateString = templateString.slice(0, randomIndex) + templateString.slice(randomIndex+1);
	}
	console.log("Загаданное число - ", result);
	return result;
}

function getNumber(length) {
	do {
			console.log(`Введите число из ${length} цифр`);
			let number = readlineSync.question('');
			if (/^\d+$/.test(number) && number.length == length) {
				return number;
			} else {console.log(`Неправильный ввод. Нужно ввести число ${length} цифр.`)}
	}
	while (true);
}

function checkForWin(number, targetNumber) {
	if (number === targetNumber) {
		return true;
	} else {
		let bulls = 0, cows = 0;
		for (let i = 0; i < number.length; i++) {
			if (number[i] === targetNumber[i]) {
				bulls++;
			} else if (targetNumber.includes(number[i])) {
				cows++;
			}
		}
		console.log(`Быки - ${bulls} (совпала и цифра и место), Коровы - ${cows} (совпала только цифра)`);
	}
}

playBullsAndCaws();