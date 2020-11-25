<script lang="ts">
	import { Image } from "image-js";
	import { Mosaic } from "./mosaic";
	let inputImages: string[] = [];
	let patternImage: string = "";

	function onSelectImageFromDiskClick() {
		inputImages = [
			"/test/img/blue.png",
			"/test/img/green.png",
			"/test/img/red.png",
		];
	}
	function onSelectPatternFromDiskClick() {
		patternImage = "/test/img/rgb-1.png";
	}

	async function mosaic() {
		let ijsInputImages = await Promise.all(
			inputImages.map((img) => Image.load(img))
		);
		let ijsPatternImage = await Image.load(patternImage)

		console.debug(ijsInputImages)
		console.debug(ijsPatternImage)

		const mosaic = new Mosaic()
		mosaic.inputImages= ijsInputImages
		mosaic.patternImage = ijsPatternImage

		mosaic.cols = 6
		mosaic.rows = 9
	}

	$: if (inputImages.length > 0 && patternImage) {
		mosaic().then(() => {});
	}
</script>

<style>
	#main-canvas {
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
		<button on:click={onSelectImageFromDiskClick}>Select Images from disk</button>
		<button on:click={onSelectPatternFromDiskClick}>Select Pattern from disk</button>
	</div>
	<canvas id="main-canvas" />
	<h2>Debug Corner</h2>
	<div class="debug-info">
		<div class="debug-image-sources-list">
			<h3>Input Images:</h3>
			<ol>
				{#each inputImages as inputImage}
					<li>{inputImage} <img src={inputImage} alt="" /></li>
				{/each}
			</ol>
		</div>
		<div class="debug-image-sources-list">
			<h3>Pattern Image:</h3>
			<p>{patternImage}</p>
			<img class="pattern-img" src={patternImage} alt="" />
		</div>
	</div>
</main>
