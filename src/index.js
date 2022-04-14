import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import {BrowserRouter} from "react-router-dom";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store'

// import * as ReactDOMClient from 'react-dom/client';
// const container = document.getElementById('root');
// const root = ReactDOMClient.createRoot(container);


// store.subscribe(() => console.log(store.getState().ecommerce));

// root.render(
//     <React.StrictMode>
//         <Provider store={store}>
//             <BrowserRouter>
//                 <App/>
//             </BrowserRouter>
//         </Provider>
//     </React.StrictMode>
// );

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

reportWebVitals();
// reportWebVitals(console.log);
