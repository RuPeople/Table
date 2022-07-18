import {createContext, StrictMode} from "react";
import { createRoot } from "react-dom/client";
import 'bootstrap/dist/css/bootstrap.min.css';
import App from "./App";
import DataStore from "./Store/DataStore";
export const Context = createContext(null)

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
    //контекст со строками таблицы
    <Context.Provider value={{
        rows: new DataStore()
    }}
    >
        <App />
    </Context.Provider>
);