export interface SignatureVariables {
	clickX: number[];
	clickY: number[];
	clickDrag: boolean[];
	paint: boolean;
	context: CanvasRenderingContext2D;
	canvasWidth: number;
	canvasHeight: number;
}

export interface SignatureElements {
	canvas: HTMLCanvasElement;
}
