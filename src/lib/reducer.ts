import React, { useReducer } from 'react'
import { Coordinates } from 'lib/universeTypes'

type State = {
	universeSize: number
	moveSet: string[]
	formError: boolean
	score: number
	zombieCoordinates: Coordinates[]
}

export const initialState: State = {
	universeSize: 0,
	moveSet: [],
	formError: false,
	score: 0,
	zombieCoordinates: [],
}

export const SET_FORM_ERROR = Symbol('setFormError')
export const SET_SCORE = Symbol('setScore')
export const SET_ZOMBIE_MOVESET = Symbol('setZombieMoveSet')
export const SET_ZOMBIES_COORDINATES = Symbol('setZombieCoordinates')
export const RESET_UNIVERSE = Symbol('reset')
export const SET_UNIVERSE_SIZE = Symbol('setUniverseSize')

const reducer = (state: State, { type, value }): State => {
	switch (type) {
		case SET_ZOMBIES_COORDINATES:
			return { ...state, zombieCoordinates: value }
		case SET_SCORE:
			return { ...state, score: value }
		case SET_ZOMBIE_MOVESET:
			return { ...state, moveSet: [...state.moveSet, ...value] }
		case SET_UNIVERSE_SIZE:
			return { ...state, universeSize: value }
		case SET_FORM_ERROR:
			return { ...state, formError: value }
		case RESET_UNIVERSE:
			return initialState
		default:
			return state
	}
}

export default reducer
