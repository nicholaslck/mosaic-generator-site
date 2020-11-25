import type { Image } from "image-js"
import type { Tile } from "./tile"

interface IMosaic {
	
	inputImages: Image[]
	patternImage: string

	generateCanvas(): HTMLCanvasElement
}

export class Mosaic implements IMosaic {
	
	private _inputImages: Image[]
	get inputImages() {
		return this._inputImages
	}
	set inputImages(images) {
		this._inputImages = images
		this.tiles = images.map(img => ({
			image: img
		} as Tile))
		console.table(this.tiles)
		// TODO:
	}

	private _patternImage: string
	get patternImage() {
		return this._patternImage
	}
	set patternImage(images) {
		this._patternImage = images
	}

	generateCanvas() {
		// TODO:
		return null;
	}

	private tiles: Tile[] = []

}

export default Mosaic