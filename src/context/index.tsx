'use client';
import { useContext, useReducer, createContext, ReactNode } from 'react';
import type { State, ReducerType, stateAction } from '../types';

const initState: State = {
	loggedIn: false,
	menu: 'close',
	user: {
		_id: '11',
		username: 'Guest User',
		password: '',
		createdAt: new Date(),
	},
	classrooms: [],
	filteredClassrooms: [],
	totalfilteredClassrooms: 10,
};

const MyContext = createContext({
	state: initState,
	dispatch(_val: stateAction) {},
});

const reducer: ReducerType = (state, action) => {
	switch (action.type) {
		case 'user':
			return { ...state, user: action.payload.user };
		case 'logIn':
			return { ...state, loggedIn: action.payload.isloggedIn, user: action.payload.user };
		case 'logOut':
			return { ...state, loggedIn: action.payload.isloggedIn };
		case 'menu_open':
			return { ...state, menu: 'open' };
		case 'menu_close':
			return { ...state, menu: 'close' };
		case 'classrooms':
			return { ...state, classrooms: action.payload.classrooms };
		case 'filteredClassrooms':
			return { ...state, filteredClassrooms: action.payload.filteredClassrooms, totalfilteredClassrooms: action.payload.totalfilteredClassrooms };
		default:
			return state;
	}
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initState);

	return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>;
};

export const useGlobals = () => useContext(MyContext);
