import type { Image } from "image-js"

export class Mosaic {

	private _inputImages: Image[]
	get inputImages() {
		return this._inputImages
	}
	set inputImages(images: Image[]) {
		this._inputImages = images ?? []
		this._candidateImage = []
	}

	private _patternImage: Image
	get patternImage() {
		return this._patternImage
	}
	set patternImage(images: Image) {
		this._patternImage = images
		this._resizedPatternImage = null;
	}

	private _candidateImage: Image[] = []
	private _resizedPatternImage: Image;

	public cols: number = 1
	public rows: number = 1
	public setSize(cols: number, rows: number) {
		this.cols = Math.max(cols, 1)
		this.rows = Math.max(rows, 1)
	}

	public drawOnCanvas(canvas: HTMLCanvasElement) {
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

		console.debug(`canvas size: (${canvas.width}, ${canvas.height}`)
		this._resizedPatternImage = this._patternImage.resize({
			width: canvas.width,
			height: canvas.height
		})

		const tileWidth = this._resizedPatternImage.width / Math.floor(this.cols)
		const tileHeight = this._resizedPatternImage.height / Math.floor(this.rows)
		console.debug(`max tile size: (${tileWidth}, ${tileHeight})`)

		this._candidateImage = this._inputImages.map(image => image.resize({
			width: tileWidth,
			height: tileHeight
		}))

		const ctx = canvas.getContext("2d")
		// ctx.drawImage(this._resizedPatternImage.getCanvas(), 0, 0)

		for (let row = 0; row < this.rows; row++) {
			// console.debug(`%cloop: processing row: ${row}`, "color: pink")
			for (let col = 0; col < this.cols; col++) {
				// console.log(`%cloop: processing col: ${col}`, "color: red;")

				const x = tileWidth * col
				const y = tileHeight * row
				const patternSample = this._resizedPatternImage.crop({
					x: x,
					y: y,
					width: tileWidth,
					height: tileWidth
				})

				const meansOfSample = this.getMeansFromImage(patternSample)
				
				let selectedCandidateImage: Image;
				let closestDistance = Number.MAX_SAFE_INTEGER;
				this._candidateImage.forEach(cImage => {
					const meansOfCandidate = this.getMeansFromImage(cImage)
					const distance = this.compareDistanceOfMeans(meansOfCandidate, meansOfSample)
					if (distance < closestDistance) {
						selectedCandidateImage = cImage
						closestDistance = distance
					}
				})
				ctx.drawImage(selectedCandidateImage.getCanvas(), x, y)
			}
		}


		return null;
	}

	private getMeansFromImage(image: Image): Array<number> {
		return (image as any).mean as Array<number>
	}

	private compareDistanceOfMeans(meansA: Array<number>, meansB: Array<number>) {
		if (meansA.length !== meansB.length) {
			throw new Error('number of channels is different')
		}
		const distanceInChannel = []
		for (let i=0; i < meansA.length; i++) {
			distanceInChannel.push(Math.abs(meansA[i] - meansB[i]))
		}

		const distance = Math.sqrt(distanceInChannel.reduce((a,c) => (a + c*c)))
		return distance
	}

}

export default Mosaic