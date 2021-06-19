import {configureStore} from '@reduxjs/toolkit'
import datasetSelectReducer from "./reducers/datasetSelectSlice";
import rightPaperReducer from "./reducers/rightPaperSlice";
import notificationReducer from "./reducers/notificationSlice";
import warningIconReducer from "./reducers/warningIconSlice";
import alertReducer from "./reducers/alertSlice";
import progressReducer from "./reducers/progressSlice";
import eventDataGridReducer from "./reducers/eventDataGridSlice";
import uqlReducer from "./reducers/uqlSlice";

export default configureStore({
        reducer: {
            datasetSelectReducer,
            rightPaperReducer,
            notificationReducer,
            progressReducer,
            warningIconReducer,
            alertReducer,
            eventDataGridReducer,
            uqlReducer
        }
    }
);
