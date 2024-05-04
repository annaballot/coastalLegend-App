<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";


	let widget: { open: () => void; };

	const cloudinary = typeof window !== 'undefined' ? (window as any).cloudinary : null;

	const dispatch = createEventDispatcher();

	onMount(() => {
		if (cloudinary) {
        widget = cloudinary.createUploadWidget({
            cloudName: "dloycvswk",
            uploadPreset: "qdb8juxk"
        }, (error: any, result: any) => {
            if (!error && result && result.event === "success") {
								dispatch("imageUploaded", { imageUrl: result.info.secure_url });
            }
        });
    }
	});

	async function handleWidget() {
  if (widget) {
    widget.open();
  }
}
</script>

<!-- svelte-ignore a11y-invalid-attribute -->
<!-- svelte-ignore a11y-missing-content -->

	
  
<a href="#" title="Upload Image" class="card-footer-item" on:click={handleWidget} >
	<button class="button is-success is-fullwidth">Upload Image
<br>
		<span class="icon has-text-success">
			<i class="fas fa-camera" style="color: #01060e;"></i>
		</span>
	</button>
	
	
</a>
