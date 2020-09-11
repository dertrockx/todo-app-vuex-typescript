<template>
	<li
		class="item"
		:class="getStatus"
		
	>

		<input 
			type="checkbox" 
			name=""
			v-model="done"
			@click.prevent="changeStatus"
		/>
		<div class="item-text">
			<input 
				v-model="textContent"
				type="text" 
				@keyup.enter="save"
				/>
		</div>
		<button @click.prevent="deleteMe">
			<span class="material-icons">
				delete_forever
			</span>
		</button>
	</li>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ItemInterface from "@/interfaces/ItemInterface.ts";

import { vxm } from "@/store";
const { todos } = vxm;

@Component
export default class ItemInd extends Vue implements ItemInterface {
	@Prop() public id!: number;
	@Prop() public text!: string;
	@Prop() public done!: boolean;
	private textContent: string;
	constructor() {
		super();
		this.textContent = this.text;
	}
	
	get getStatus() {
		let val = '';
		if(this.done) val = 'done';
		return val;
	}
	private async save(e) {
		// removes the html focus
		const item: ItemInterface = {
			id: this.id,
			text: this.textContent,
			done: this.done
		}
		console.log(this.textContent);
		await todos.updateTaskText(item)
		e.target.blur();
		console.log("Save!");
	}
	private async changeStatus() {
		await todos.toggleTaskStatus( this.id );
		// this.items = this.items.map( item => {
		// 	if(item.id === _item.id) item.done = !item.done;
		// 	return item;
		// })
	}

	private deleteMe() {
		// blank
		todos.deleteTask(this.id);
	}
	mounted() {
		console.log( this.text );
	}
}

</script>
<style lang="scss">

.item {
  text-align: left;
  border-radius: .5rem;
  color: white;
  background: darken(red, 10%);
  font-family: serif;
  font-size: 1.6rem;
  margin-bottom: 1rem;
  padding: .5rem;
  transition: 0.2s all;
  display: grid;
  grid-column-gap: 1rem;
  grid-template-areas:
  "checkbox content delete";
  input[type="checkbox"] {

		border: 0;
		border-radius: .2rem;
		grid-area: checkbox;
		width: 2rem;
  }

  button {
		grid-area: delete;
		border: 0;
		border-radius: .2rem;
		background: none;
		color: white;
		transition: .2s;
		span {
			margin: auto;
		}
		&:hover {
			background: grayscale(white);
			color: #111;
		}
  }

  input[type=text]{
		margin: 0;
		width: 100%;
		background: inherit;
		color: inherit;
		border: 0;
		grid-area: text-content;
		&:focus {
			border-bottom: 1px solid #111;
			background: #f5f5f5;
			color: #111;
			transition: .3s;
		}
  }
  // &:hover {
  //   background: lighten(green, 10%);

  // }

  &.done {
    background: green;
     input[type=text] {
			text-decoration: line-through;
    }
    // &:hover {
    //   background: red;
    // }
    
  }
}
	
</style>