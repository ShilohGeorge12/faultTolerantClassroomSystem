'use client';
import { useContext, useReducer, createContext, ReactNode } from 'react';
import type { State, ReducerType, stateAction } from '../types';
// import { toast } from 'sonner';

const initState: State = {
	loggedIn: false,
	menu: 'close',
	user: {
		_id: '11',
		username: 'Guest User',
		password: '',
		role: 'guest',
		createdAt: new Date(),
	},
	classrooms: [
		{
			_id: '100',
			name: 'Mass Com 1st floor Right Classroom',
			tag: 'MS-1F-RC',
			location: 'Mass Com',
			status: 'FREE',
		},
		{
			_id: '110',
			name: 'Mass Com 2nd floor Left Classroom',
			tag: 'MS-2F-LC',
			location: 'Mass Com',
			status: 'FREE',
		},
		{
			_id: '112',
			name: 'Mass Com 2nd floor Right Classroom',
			tag: 'MS-2F-RC',
			location: 'Mass Com',
			status: 'IN USE',
		},
		{
			_id: '122',
			name: 'Mass Com 1nd floor Left Classroom',
			tag: 'MS-1F-LC',
			location: 'Mass Com',
			status: 'IN USE',
		},
		{
			_id: '132',
			name: 'Mass Com 3nd floor Right Classroom',
			tag: 'MS-3F-RC',
			location: 'Mass Com',
			status: 'IN USE',
		},
	],
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
		default:
			return state;
	}
};

export const ContextProvider = ({ children }: { children: ReactNode }) => {
	const [state, dispatch] = useReducer(reducer, initState);

	return <MyContext.Provider value={{ state, dispatch }}>{children}</MyContext.Provider>;
};

export const useGlobals = () => useContext(MyContext);
