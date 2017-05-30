

export class Thing {
	public name: string;

	constructor({name}: {name: string}) {
		this.name = name;
	}

	public act(): void {
		console.log(`My name is ${this.name}`);
	}
}