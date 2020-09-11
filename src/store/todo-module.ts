import { createModule, mutation, action } from "vuex-class-component";
import ItemInterface from "@/interfaces/ItemInterface";

const pause = (delay: number) => {
  return new Promise( resolve => {
    const time = delay  * 1000;
    setTimeout( () => {
      console.log(`Pausing for ${delay} seconds`);
    }, time);
    resolve( delay );
  })
}

const VuexModule = createModule({
	namespaced: "user",
	strict: false
});

export class TodoStore extends VuexModule {
	public items: Array<ItemInterface>;

	constructor(){
		super();
		this.items = [
			{
				id: 1,
				text: "Todo item 1",
				done: false
			},
			{
				id: 2,
				text: "Todo item 2",
				done: false
			},
			{
				id: 3,
				text: "Todo item 3",
				done: false
			},
		]
	}

	get getItems(): Array<ItemInterface> {
		return this.items;
	}

	get nextID(): number {
		const ref = [...this.items];
		const last = ref.pop()
		if(last) return last.id + 1
		else return 0
	}

	@mutation addNewItem(payload: ItemInterface): void {
		this.items.push( payload );
	}

	@mutation toggleTask(payload: number): void {
		const origItem: ItemInterface = this.items.filter( item => item.id === payload)[0]
		const newItem: ItemInterface = { ...origItem, done: !origItem.done };
		this.items.splice( this.items.indexOf( origItem ), 1, newItem );
		// this.items = this.items.map( (item: ItemInterface) => {
		// 	if(item.id) 
		// 		item.done = item.id === payload ? !item.done : item.done;
		// 	return item;
		// });
	}

	@mutation updateTask(payload: ItemInterface): void {
		const { id } = payload;
		const origItem: ItemInterface = this.items.filter( item => item.id === id)[0]
		this.items.splice( this.items.indexOf( origItem ), 1, payload );
		// this.items = this.items.map( (item: ItemInterface) => {
		// 	if(item.id)
		// 		item.text = item.id === id ? payload.text : item.text;
		// 	return item;
		// })
	}

	@mutation deleteTask(payload: number): void {
		const item: ItemInterface = this.items.filter( item => item.id === payload)[0];
		this.items.splice( this.items.indexOf(item), 1);
	}

	@action async addItem(payload: ItemInterface) {
		await pause(5);
		this.addNewItem( payload )
	}

	@action toggleTaskStatus(payload: number) {
		return new Promise( resolve => {
			setTimeout( () => {
				this.toggleTask( payload );
			}, 100);
			resolve();
		})
	}

	@action async updateTaskText(payload: ItemInterface) {
		await pause(2)
		this.updateTask(payload);
	}

	@action async removeTask(payload: number){
		await pause(2)
		this.deleteTask(payload)
	}

}