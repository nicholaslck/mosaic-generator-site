import type { Image } from 'image-js'

export interface Size {
	width: number
	height: number
}

export interface Position {
	x: number
	y: number
}

export interface Tile {
	image: Image
	size: Size
	position: Position
}