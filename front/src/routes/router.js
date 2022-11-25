import {
    createBrowserRouter,
    Route,
    createRoutesFromElements,
  } from "react-router-dom";
import PageNotFound from "../components/pages/404/PageNotFound";
import Auth from "../components/pages/Auth/Auth";
import Home from "../components/pages/Home/Home";
import NewExercise from "../components/pages/NewExercise/NewExercise";
import NewWorkout from "../components/pages/NewWorkout/NewWorkout";
import Profile from "../components/pages/Profile/Profile";
import SingleWorkout from "../components/pages/SingleWorkout/SingleWorkout";
import Workouts from "../components/pages/Workouts/Workouts";
import RequiredAuth from "../hoc/RequiredAuth";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<Home/>}/>
            <Route path="new-workout" element={
                <RequiredAuth>
                    <NewWorkout/>
                </RequiredAuth>
            }/>
            <Route path="new-exercise" element={
                <RequiredAuth>
                    <NewExercise/>
                </RequiredAuth>
            }/>
            <Route path="profile" element={<RequiredAuth>
                <Profile/>
            </RequiredAuth>}/>
            <Route path="workouts" >
                <Route index element={<RequiredAuth>
                        <Workouts/>
                    </RequiredAuth>}/>
                <Route path=":id" element={<RequiredAuth>
                        <SingleWorkout/>
                    </RequiredAuth>}/>
            </Route>
            <Route path="auth" element={<Auth/>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Route>
    )
);

export default router