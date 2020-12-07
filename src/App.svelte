<script lang="ts">
	import { Image } from "image-js";
	import { Mosaic } from "./mosaic";
	import FileInput from "./components/file-input.svelte";
	let inputImages: string[] = [];
	let patternImage: string = "";
	let cols: number = 30;
	let rows: number = 20;
	let width: number = 480;
	let height: number = 360;

	let canvas: HTMLCanvasElement;

	let tileImageFiles: FileList;
	let patternImageFile: FileList;

	function onQuickTest() {
		inputImages = [
			"/test/img/blue.png",
			"/test/img/green.png",
			"/test/img/red.png",
		];
		patternImage = "/test/img/rgb-2.png";
	}

	async function mosaic() {
		let ijsInputImages = await Promise.all(
			inputImages.map((img) => Image.load(img))
		);
		let ijsPatternImage = await Image.load(patternImage);

		console.debug(ijsInputImages);
		console.debug(ijsPatternImage);

		const mosaic = new Mosaic();
		mosaic.inputImages = ijsInputImages;
		mosaic.patternImage = ijsPatternImage;

		mosaic.setSize(cols, rows);
		mosaic.drawOnCanvas(canvas);
	}

	function getObjectURLFromFileList(fileList: FileList) {
		const urls: string[] = [];
		for (let i = 0; i < fileList.length; i++) {
			urls.push(URL.createObjectURL(fileList[i]));
		}
		return urls;
	}

	$: if (tileImageFiles && tileImageFiles.length > 0) {
		inputImages = getObjectURLFromFileList(tileImageFiles);
	}
	$: if (patternImageFile && patternImageFile.length > 0) {
		patternImage = getObjectURLFromFileList(patternImageFile)[0];
	}
</script>

<style>
	.size-range {
		display: flex;
	}
	.canvas {
		border: 1px solid #000;
	}
	.debug-info {
		display: flex;
	}
	.debug-image-sources-list {
		width: 50vw;
	}
	.debug-image-sources-list img {
		max-width: 100px;
	}
	.debug-image-sources-list .pattern-img {
		width: 100%;
		max-width: none;
	}
</style>

<main>
	<div>
		<button on:click={onQuickTest}>Quick Test</button>
		<label for="tileImagesUpload">Tile Image Files</label>
		<FileInput
			bind:files={tileImageFiles}
			id="tileImagesUpload"
			multiple={true} />
		<label for="patternImageUpload">Pattern Image File</label>
		<FileInput
			bind:files={patternImageFile}
			id="patternImageUpload"
			multiple={false} />
		<div class="size-range">
			<div>
				<label for="cols">Columns</label>
				<input
					id="cols"
					type="number"
					bind:value={cols}
					min="0"
					max="80" />
				<input type="range" bind:value={cols} min="0" max="80" />
			</div>
			<div>
				<label for="rows"> Rows</label>
				<input
					id="rows"
					type="number"
					bind:value={rows}
					min="0"
					max="80" />
				<input type="range" bind:value={rows} min="0" max="80" />
			</div>
		</div>
		<div class="size-range">
			<div>
				<label for="width">Width</label>
				<input
					id="width"
					type="number"
					bind:value={width}
					min="100"
					max="1920" />
				<input type="range" bind:value={width} min="100" max="1920" />
			</div>
			<div>
				<label for="height"> Height</label>
				<input
					id="height"
					type="number"
					bind:value={height}
					min="100"
					max="1920" />
				<input type="range" bind:value={height} min="100" max="1920" />
			</div>
		</div>
		<div><button on:click={mosaic}>Go</button></div>
	</div>
	<canvas bind:this={canvas} class="canvas" {width} {height} />
	<div>
		<h2>Debug Corner</h2>
		<div class="debug-info">
			<div class="debug-image-sources-list">
				<h3>Input Images:</h3>
				<ol>
					{#each inputImages as inputImage}
						<li>
							<p>{inputImage}</p>
							<img src={inputImage} alt="" />
						</li>
					{/each}
				</ol>
			</div>
			<div class="debug-image-sources-list">
				<h3>Pattern Image:</h3>
				<p>{patternImage}</p>
				<img class="pattern-img" src={patternImage} alt="" />
			</div>
		</div>
	</div>
</main>
