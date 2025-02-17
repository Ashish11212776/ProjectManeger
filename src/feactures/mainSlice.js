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
      if (!state.data.listOfProjects) {
        console.error("No projects available in state");
        return;
      }
      const project = state.data.listOfProjects.find(
        (p) => String(p.id) === String(proj_Id.id)
      );
      if (project) {
        project.listOfDevelopers.push(developer);
        console.log("Developer added successfully:", developer);
      } else {
        console.error("Project not found for ID:", proj_Id.id);
      }
    },

    EDIT_PROJ: (state, action) => {
      const index = state.data.listOfProjects.findIndex(
        (item) => item.id === action.payload.id
      );
      index
        ? (state.data.listOfProjects[index] = action.payload)
        : window.alert("Data does't Exit");
    },
    DELETE_PROJ: (state, action) => {
      const index = state.data.listOfProjects.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        state.data.listOfProjects.splice(index, 1);
      } else {
        window.alert("Data doesn't exist");
      }
    },

    ADD_TASK: (state, action) => {
      const { id, devId, task, status, changeTaskId } = action.payload;
      console.log(action.payload)
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

export const {
  ADD_DATA,
  ADD_DEVELOPER,
  ADD_TASK,
  EDIT_PROJ,
  DELETE_PROJ,
} = mainSlice.actions;
export default mainSlice.reducer;
