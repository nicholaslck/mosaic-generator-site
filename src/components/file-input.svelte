<script lang="ts">
	export let files: FileList;
	export let id: string;
	export let multiple: boolean = false;
	const acceptTypes: string[] = [
		"image/png",
		"image/jpeg",
		"image/jpg",
		"image/tiff"
	]
</script>

<input type="file" bind:files multiple={multiple} id={id} accept={acceptTypes.join(",")}>