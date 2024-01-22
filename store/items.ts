import { defineStore } from "pinia";

export interface Item {
    id: number
}

export interface State {
    items: Item[]
    dynamicItem?: Item
}

export const useItemsStore = defineStore('itemsStore', () => {
    function getInitialState(): State {
        return {
            items: [],
            dynamicItem: undefined
        }
    }

    const state = reactive<State>(getInitialState())

    function init(count: number) {
        $reset()
        state.items = new Array(count).fill({} as Item).map((_, index) => ({ id: index }))
    }

    function $reset() {
        Object.assign(state, getInitialState())
    }

    return {
        ...toRefs(state),
        init,
        $reset
    }
})
