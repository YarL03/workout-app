import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
  } from "react-router-dom";
import Home from "../components/pages/Home/Home";
import NewWorkout from "../components/pages/NewWorkout/NewWorkout";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Home/>}/>
            <Route path="new-workout" element={<NewWorkout/>}/>
        </Route>
    )
);

export default router