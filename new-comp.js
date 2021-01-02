const fs = require('fs');
const path = require('path');
const readline = require('readline');

const COMPONENTS_DIR = 'src/components';

let componentName = process.argv[2];

if (componentName) {
	return main(componentName);
}

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

new Promise(((resolve, reject) => {
	rl.question('Укажите название компонента: ', (name) => {
		rl.close();

		name ? resolve(name) : reject()
	})
}))
	.then(main)
	.catch((err) => console.log('Некорректное имя компонента', err));

function main(componentName) {
	fs.mkdirSync(path.resolve(COMPONENTS_DIR, componentName));
	fs.writeFileSync(path.resolve(COMPONENTS_DIR, componentName, `${componentName}.tsx`), tsx(componentName));
	fs.writeFileSync(path.resolve(COMPONENTS_DIR, componentName, `${componentName}.module.css`), css(componentName));
	fs.writeFileSync(path.resolve(COMPONENTS_DIR, componentName, `index.ts`), index(componentName));

	console.log(`Компонент <${componentName}/> создан!`);
}

function tsx(name) {
return `
import React from 'react';
import styles from './${name}.module.css';

interface Props {}

export const ${name}: React.FC<Props> = (props: Props) => {
	return (
		<div className={styles.root}></div>
	);
};
`.trim();
}

function css(name) {
return `
.root {}
`.trim();
}

function index(name) {
return `
import {${name}} from './${name}';
export default ${name};`
.trim();
}

