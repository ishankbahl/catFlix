import { Platform } from "react-native";
import head from "lodash/head";
import slice from "lodash/slice";

const PREFETCH_IMAGES = 5;

const API = Platform.OS === "android" ? "http://10.0.3.2:3000" : "http://localhost:3000";

export const initialState = {
    image:null,
    next:[]
};

export const reducer = ( state = initialState , action ) => {
    switch (action.type) {
        case "IMAGE_LOADED":
            return {
                ...state,
                image:state.image||action.data,
                next:[
                    action.data,
                    ...state.next
                ]
            };
        case "CHANGE_IMAGE":
            if(!state.next.length) {
                return state;
            }
            return {
                ...state,
                image:head(state.next),
                next:[
                    ...slice(state.next,1)
                ]
            };
        case "ERROR":
            return state;
        default:
            return state;
    }
}

export const fetchImage = () => async ( dispatch , getState ) => {
    try{
        const response = await fetch(`${API}/gif`);
        dispatch({
            type:"IMAGE_LOADED",
            data:await response.json()
        });
        if (getState().next.length<PREFETCH_IMAGES){
            dispatch(fetchImage());
        }
    }catch(error){
        dispatch({
            type:"ERROR",
            error
        });
    }
};

export const changeImage = () => ( dispatch , getState ) => {
    dispatch({type:"CHANGE_IMAGE"});
    if (getState().next.length < PREFETCH_IMAGES){
        dispatch(fetchImage());
    }
};