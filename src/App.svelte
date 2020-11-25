<script lang="ts">
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
</script>

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
					<li>{inputImage}
						<img src={inputImage} alt="">
					</li>
				{/each}
			</ol>
		</div>
		<div class="debug-image-sources-list">
			<h3>Pattern Image:</h3>
			<p>{patternImage}</p>
			<img class="pattern-img" src={patternImage} alt="">
		</div>
	</div>
</main>

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