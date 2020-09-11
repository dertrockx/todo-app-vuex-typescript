<template lang="html">
	<div class="todo-input">
		<input 
			v-model="newItem"
			type="text" 
			placeholder="Type new input here" 
		/>
		<button 
			:disabled="isDisabled"
			@click.prevent="addNewItem(newItem)"
			>
			+
		</button>
	</div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { vxm } from "@/store";
import ItemInterface from "@/interfaces/ItemInterface";
const { todos } = vxm;

@Component
export default class ItemInput extends Vue {
	private newItem = "";

	get isDisabled(): boolean {
		return !this.newItem;
	}

	public addNewItem( _newItem: string ): void {
		console.log(`New item: ${_newItem}`);
		const item: ItemInterface = {
			id: todos.nextID,
			text: _newItem,
			done: false
		}
		todos.addItem( item );
		this.newItem = ""
	}


	// public addItem(): void {
	// 	console.log(todos)
	// 	// this.addNewItem(this.newItem);
	// }

	// private addItem(): void {
	// 	console.log("Add new item");
 //    // const _newItem: ItemInterface = {
 //    //   id: this.items.length + 1,
 //    //   text: this.newItem,
 //    //   done: false
 //    // }
 //    // this.items.push( _newItem );
 //    // this.newItem = "";
 //  }
}

</script>
<style lang="scss">

.todo-input {

  margin: 0;
  display: flex;

  
  button {
    border: 0;
    border-radius: .3rem;
    font-size: 1.6rem;
    color: #fff;
    background: green;
    width: 2rem;
    cursor: pointer;
    transition: .2s all;
    &:hover {
      background: darken(green, 10%);
    }
    &:disabled {
      background: grayscale(darken(green, 10%));
      cursor: not-allowed;
    }
  }
}
	
</style>