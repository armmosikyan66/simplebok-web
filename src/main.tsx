import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'
import "./index.css"
import {store} from "@/store/store.ts";
import {Toaster} from "@/components/ui/toaster.tsx";
import App from "@/app.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <App/>
        <Toaster/>
    </Provider>
)
