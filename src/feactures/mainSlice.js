import { createSlice } from "@reduxjs/toolkit";
import { fetchData } from "./mainThunks";

const initialState = {
  isLoading: false,
  status: "pending",
  data: [],
  error: null,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    ADD_DATA: (state, action) => {
      state.data.listOfProjects.push(action.payload);
    },
    ADD_DEVELOPER: (state, action) => {
      const { proj_Id, developer } = action.payload;
      const project = state.data.listOfProjects.find(
        (p) => p.id === proj_Id.id
      );
      console.log("after project", project);
      if (project) {
        project.listOfDevelopers.push(developer);
      }
    },
    ADD_TASK: (state, action) => {
      const { id, devId, task, status, changeTaskId } = action.payload;
      const project = state.data.listOfProjects.find((p) => p.id === id);

      if (project) {
        const developer = project.listOfDevelopers.find(
          (d) => d.devId === devId
        );
        if (developer && task) {
          developer.listOfTasks.push(task);
        } else if (developer && status && changeTaskId) {
          developer.listOfTasks = developer.listOfTasks.map((task) =>
            task.taskId === changeTaskId ? { ...task, status } : task
          );
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.isLoading = true;
        state.status = "pending";
        state.data = [];
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "success";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { ADD_DATA, ADD_DEVELOPER, ADD_TASK } = mainSlice.actions;
export default mainSlice.reducer;
