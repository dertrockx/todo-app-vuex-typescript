<template lang="html">
	<ul class="items">
		<itemInd
			v-for="(item) in items"
			:key="item.id"
			:id="item.id" 
			:text="item.text" 
			:done="item.done" 
		/>
	</ul>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ItemInterface from "@/interfaces/ItemInterface.ts";
import ItemInd from "./ItemInd.vue";
import { vxm } from "@/store";
const { todos } = vxm;

@Component({
	components: {
		itemInd: ItemInd
	}
})
export default class ItemList extends Vue {
	public items = todos.items;

	private getStatus(item: ItemInterface): string {
		let val = '';
		if(item.done) val = 'done';
		return val;
	}
	private async changeStatus(_item: ItemInterface) {
		await todos.toggleTaskStatus( _item.id );
		// this.items = this.items.map( item => {
		// 	if(item.id === _item.id) item.done = !item.done;
		// 	return item;
		// })
	}


	
}

</script>
<style lang="scss">

.items {
  width: 80%;
  list-style-type: none;
  grid-area: items; 
}
	
</style>