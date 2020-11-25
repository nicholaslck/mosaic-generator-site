import type { Image } from 'image-js'

export interface Size {
	width: number
	height: number
}

export interface Position {
	x: number
	y: number
}

export class Tile {
	image: Image
	size: Size
	position: Position

	static createFromImage(image: Image): Tile {
		image.width
		return {
			image,
			size: {
				width: image.width,
				height: image.height
			},
			position: {
				x: 0,
				y: 0
			}
		}
	}
}