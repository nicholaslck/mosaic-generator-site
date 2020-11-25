import type { Image } from "image-js"
import { Size, Tile } from "./tile"

export class Mosaic {
	
	private _inputImages: Image[]
	get inputImages() {
		return this._inputImages
	}
	set inputImages(images: Image[]) {
		this._inputImages = images ?? []
	}

	private _patternImage: Image
	get patternImage() {
		return this._patternImage
	}
	set patternImage(images: Image) {
		this._patternImage = images
	}

	generateCanvas() {
		if (!this._patternImage) {
			return null
		}
		if (this._inputImages.length == 0) {
			return null
		}
		if (this.cols <= 0) {
			this.cols = 1
		}
		if (this.rows <= 0) {
			this.rows = 1
		}

		const tileMaxWidth = this._patternImage.width / Math.floor(this.cols)
		const tileMaxHeight = this._patternImage.height / Math.floor(this.rows)

		// TODO:
	
		return null;
	}

	public cols: number = 1
	public rows: number = 1
}

export default Mosaic