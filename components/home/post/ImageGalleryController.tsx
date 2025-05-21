export class ImageGalleryController {
	private images: string[];
	private captions: string[];
	private likes: number[];
	private views: number[];
	private currentIndex: number;

	constructor(
		images: string[],
		captions: string[] = [],
		likes: number[] = [],
		views: number[] = []
	) {
		this.images = images;
		this.captions = captions;
		this.likes = likes;
		this.views = views;
		this.currentIndex = 0;
	}

	getCurrentIndex() {
		return this.currentIndex;
	}

	getCurrentImage() {
		return this.images[this.currentIndex];
	}

	getCurrentCaption() {
		return this.captions[this.currentIndex] || "";
	}

	getCurrentLikes() {
		return this.likes[this.currentIndex] || 0;
	}

	getCurrentViews() {
		return this.views[this.currentIndex] || 0;
	}

	next() {
		this.currentIndex = (this.currentIndex + 1) % this.images.length;
	}

	prev() {
		this.currentIndex =
			(this.currentIndex - 1 + this.images.length) % this.images.length;
	}

	setCurrentIndex(index: number) {
		if (index >= 0 && index < this.images.length) {
			this.currentIndex = index;
		}
	}
}
