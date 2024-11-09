// redux/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

const nodesSlice = createSlice({
  name: 'nodes',
  initialState: [],
  reducers: {
    setNodes: (state, action) => action.payload,
    updateNodes: (state, action) => action.payload,
  },
});

const edgesSlice = createSlice({
  name: 'edges',
  initialState: [],
  reducers: {
    setEdges: (state, action) => action.payload,
    updateEdges: (state, action) => action.payload,
  },
});

export const { setNodes, updateNodes } = nodesSlice.actions;
export const { setEdges, updateEdges } = edgesSlice.actions;

const store = configureStore({
  reducer: {
    nodes: nodesSlice.reducer,
    edges: edgesSlice.reducer,
  },
});

export default store;
