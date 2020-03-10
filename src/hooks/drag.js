import { useReducer, useCallback } from 'react';
import * as appConstants from '../constants/appContants';

const initialState = {};

const addRemoveReducer = (currentState, action)=>{
    switch (action.type) {
        case appConstants.SET_DATA:
            return [...action.data];
        case appConstants.SET_TEXT:
            return [...action.data];
        case appConstants.SET_HINDI_TEXT:
            return [...action.data];
        case appConstants.SET_NAME:
            return [...action.data];
        case appConstants.SET_HINDI_NAME:
            return [...action.data];
        case appConstants.SET_LINK:
            return [...action.data];
        case appConstants.SET_PHONE:
            return [...action.data];
        case appConstants.ADD:
            return [...action.data];
        case appConstants.SET_IMAGE:
            return [...action.data];
        case appConstants.REMOVE:
            return [...action.data];
        default:
            throw Error('Should not reach here');
    }
}

const useAddRemove = ()=>{
    const [currentAddRemoveState, dispatchAddRemove] = useReducer(addRemoveReducer, initialState);

    const setData=useCallback((data)=>{
        dispatchAddRemove({type: appConstants.SET_DATA, data});
    },[]);

    const setText=(id, value)=>{
        let index = currentAddRemoveState.findIndex(item=>item.id===id);
        let newData = [...currentAddRemoveState];
        newData[index].title=value;
        dispatchAddRemove({type: appConstants.SET_TEXT, data: newData});
    };

    const setHindiText=(id, value)=>{
        let index = currentAddRemoveState.findIndex(item=>item.id===id);
        let newData = [...currentAddRemoveState];
        newData[index].titleHindi=value;
        dispatchAddRemove({type: appConstants.SET_HINDI_TEXT, data: newData});
    };

    const setLink=(id, value)=>{
        let index = currentAddRemoveState.findIndex(item=>item.id===id);
        let newData = [...currentAddRemoveState];
        newData[index].link=value;
        dispatchAddRemove({type: appConstants.SET_LINK, data: newData});
    };

    const setPhone=(id, value)=>{
        let index = currentAddRemoveState.findIndex(item=>item.id===id);
        let newData = [...currentAddRemoveState];
        newData[index].phone= value?Number(value):'';
        dispatchAddRemove({type: appConstants.SET_PHONE, data: newData});
    };

    const setImage = (id, file)=>{
        let index = currentAddRemoveState.findIndex(item=>item.id===id);
        let newData = [...currentAddRemoveState];
        newData[index].image=file;
        dispatchAddRemove({type: appConstants.SET_IMAGE, data: newData })
    }

    const add=()=>{
        let index = currentAddRemoveState.length;
        const newData = [...currentAddRemoveState];
        newData.unshift({id: Math.random().toString() ,title:'', titleHindi:'', phone:'', order: index,  link: '', image: '', imageUrl: ''});
        dispatchAddRemove({type: appConstants.ADD, data: newData});
    };

    const remove=(id)=>{
        let removeIndex = currentAddRemoveState.findIndex(item=>item.id===id);
        let newData = [...currentAddRemoveState];
        newData.splice(removeIndex, 1);
        dispatchAddRemove({type: appConstants.REMOVE, data: newData});        
    };

    const setName=(id, value)=>{
        let index = currentAddRemoveState.findIndex(item=>item.id===id);
        let newData = [...currentAddRemoveState];
        newData[index].name=value;
        dispatchAddRemove({type: appConstants.SET_NAME, data: newData});
    };

    const setHindiName=(id, value)=>{
        let index = currentAddRemoveState.findIndex(item=>item.id===id);
        let newData = [...currentAddRemoveState];
        newData[index].nameHindi=value;
        dispatchAddRemove({type: appConstants.SET_HINDI_NAME, data: newData});
    };

    return{
        currentAddRemoveState,
        dispatchAddRemove,
        setData,
        setText,
        setHindiText,
        setLink,
        setPhone,
        setImage,
        add,
        remove,
        setName,
        setHindiName,
    }
}

export default useAddRemove;