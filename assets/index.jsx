import * as React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";


const App = React.lazy(()=>
    import('./js/App').then( (module)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>resolve(module),2000);
        });
    })
);
    //React.lazy(()=> import('./js/App'));
const RouteExample = React.lazy(()=>
    import('./js/Routes/RouteExample').then( (module)=>{
        return new Promise((resolve)=>{
            setTimeout(()=>resolve(module),1500);
        });
    })
);
//React.lazy(()=> import('./js/Routes/RouteExample'));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>404 error</div>,
        children: [
            {
                path: 'route1',
                element: <RouteExample routeID={1} />
            },
            {
                path: 'route2',
                element: <RouteExample routeID={2} />
            }
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <React.Suspense fallback={<div>Loading...</div>}>
            <RouterProvider router={router} />
        </React.Suspense>
    </React.StrictMode>
);