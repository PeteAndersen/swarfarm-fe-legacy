import React from "react";
import { Link, Route } from "react-router-dom";
import routes from "ui/routes";

const App = ( ) => (
    <div>
        <header>
            <Link to="/">Home</Link>
            <Link to="/news">News</Link>
            <Link to="/bestiary">Bestiary</Link>
        </header>

        { routes.map( route => <Route key={ route.path } { ...route } /> ) }

        <footer>
            Da footer.
        </footer>
    </div>
);

export default App;
