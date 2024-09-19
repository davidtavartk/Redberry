import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    selectedFilters: {
        regions: [],
        price: {min: "", max: ""},
        size: {min: "", max: ""},
        bedrooms: ""
    }
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState, 
    reducers:{
        addFilter: (state, action) => {
            const {type, value} = action.payload;

            if (type === 'region') {
                if(!state.selectedFilters.regions.includes(value)) {
                    state.selectedFilters.regions = value;
                }
            }

            if (type === 'price' || type === 'size') {
                state.selectedFilters[type] = value;
              }

            if (type === 'bedrooms') {
                state.selectedFilters.bedrooms = value;
            }
              
        },
        
        removeFilter: (state, action) => {
            console.log("In Redux")
            const { type, value } = action.payload;
            
            switch (type) {
                case 'region':
                    state.selectedFilters.regions = state.selectedFilters.regions.filter(region => region !== value);
                    break;
                case 'price':
                    state.selectedFilters.price = { min: "", max: "" };
                    break;
                case 'size':
                    state.selectedFilters.size = { min: "", max: "" };
                    break;
                case 'bedrooms':
                    state.selectedFilters.bedrooms = "";
                    break;
                default:
                    break;
            }
        },

        clearFilters: (state) => {
            state.selectedFilters = initialState.selectedFilters;

          },
    }
});

export const { addFilter, removeFilter, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;