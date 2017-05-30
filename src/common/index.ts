

export class Thing {
	public name: string;

	constructor({name}: {name: string}) {
		this.name = name;
	}

	public act(): string {
		return `My name is ${this.name}`;
	}
}