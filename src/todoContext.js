import React, {useReducer, createContext, useContext, useRef} from 'react';

const initialTodos = [
    {
        id: 1,
        text: '계획표 짜기',
        done: false
    },
    {
        id: 2,
        text: '프로젝트 만들기',
        done: true
    },
    {
        id: 3,
        text: '개발자 공부하기',
        done: true
    },
    {
        id: 4,
        text: '구스 산책시키기',
        done: false
    }
];

function todoReducer(state, action){
    switch(action.type){
        case 'CREATE':
            return state.concat(action.todo);
        
        case 'TOGGLE':
            return state.map(todo =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo );

        case 'REMOVE':
            return state.filter(todo => todo.id !== action.id);
        
        default:
            throw new Error(`${action.type}이 잘못 전달됨`);
    }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({children}){
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);

    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}

export function useTodoState(){
    const context = useContext(TodoStateContext);
    if(!context){
        throw new Error('TodoProvider를 찾을 수 없음');
    }
    return context;
}

export function useTodoDispatch(){
    const context = useContext(TodoDispatchContext);
    if(!context){
        throw new Error('TodoProvider를 찾을 수 없음');
    }
    return context;
}

export function useTodoNextId(){
    const context = useContext(TodoNextIdContext);
    if(!context){
        throw new Error('TodoProvider를 찾을 수 없음');
    }
    return context;
}