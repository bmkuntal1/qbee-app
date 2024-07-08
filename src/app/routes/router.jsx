import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import routes from "./routes";
import { PrivateRoute } from "./PrivateRoute";

//recursive function to create routes from an array of objects
const createRoutes = (routes) => {
    return routes.map((route, index) => {
        return <Route key={index} path={route.path} element={route.private ? <PrivateRoute>{route.element}</PrivateRoute> : route.element}>
            {route.children ? createRoutes(route.children) : undefined}
        </Route>
    })
}

const router = createBrowserRouter(createRoutesFromElements(createRoutes(routes)));

export default router;