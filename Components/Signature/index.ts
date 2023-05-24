import { SignatureElements, SignatureVariables } from "../../Interfaces/signature-interfaces";

export class SignatureCapture {
	static vars: SignatureVariables = {
		clickX: [],
		clickY: [],
		clickDrag: [],
		paint: false,
		context: null,
		canvasWidth: null,
		canvasHeight: null,
	};

	static elements: SignatureElements = {
		canvas: null,
	};

	static init() {
		this.setElements();
		this.initialiseCanvas();
		this.setEvents();
		window.addEventListener("resize", this.initialiseCanvas);
	}

	static setElements() {
		this.elements.canvas = document.querySelector("#signature");
	}

	static initialiseCanvas() {
		this.vars.context = this.elements.canvas.getContext("2d");
		this.elements.canvas.width = this.elements.canvas.offsetWidth;
		this.elements.canvas.height = this.elements.canvas.offsetHeight;
		this.vars.canvasWidth = this.elements.canvas.width;
		this.vars.canvasHeight = this.elements.canvas.height;

		this.redrawCanvas();
	}

	static redrawCanvas() {
		const radius = 4;
		this.vars.context = this.elements.canvas.getContext("2d");
		this.vars.context.clearRect(0, 0, this.vars.canvasWidth, this.vars.canvasHeight);

		this.vars.context.beginPath();
		this.vars.context.strokeStyle = "black";
		this.vars.context.lineJoin = "round";
		this.vars.context.lineWidth = radius;

		for (let i = 0; i < this.vars.clickX.length; i += 1) {
			if (this.vars.clickDrag[i] && i) {
				this.vars.context.moveTo(this.vars.clickX[i - 1], this.vars.clickY[i - 1]);
			} else {
				this.vars.context.moveTo(this.vars.clickX[i] - 1, this.vars.clickY[i]);
			}

			this.vars.context.lineTo(this.vars.clickX[i], this.vars.clickY[i]);
		}

		this.vars.context.closePath();
		this.vars.context.stroke();
	}

	static clearCanvas() {
		this.vars.context.clearRect(0, 0, this.vars.canvasWidth, this.vars.canvasHeight);
		this.vars.clickX = [];
		this.vars.clickY = [];
		this.vars.clickDrag = [];

		const btn = document.querySelector("#HasSignature");
		(btn as HTMLButtonElement).value = "False";
	}

	static addClick(x: number, y: number, dragging: boolean) {
		this.vars.clickX.push(x);
		this.vars.clickY.push(y);
		this.vars.clickDrag.push(dragging);
	}

	static setEvents() {
		$(this.elements.canvas)
			.off("mousedown")
			.on("mousedown", (e) => {
				const rect = this.elements.canvas.getBoundingClientRect();
				const x = e.clientX - rect.left;
				const y = e.clientY - rect.top;

				this.vars.paint = true;
				this.addClick(x, y, false);
				this.redrawCanvas();
			});

		$(this.elements.canvas)
			.off("mousemove")
			.on("mousemove", (e) => {
				if (this.vars.paint) {
					const rect = this.elements.canvas.getBoundingClientRect();
					this.addClick(e.clientX - rect.left, e.clientY - rect.top, true);
					this.redrawCanvas();

					const btn = document.querySelector("#HasSignature");
					(btn as HTMLButtonElement).value = "True";
				}
			});

		$(this.elements.canvas)
			.off("mouseup")
			.on("mouseup", () => {
				this.vars.paint = false;
				this.redrawCanvas();
			});

		$(this.elements.canvas)
			.off("mouseleave")
			.on("mouseleave", () => {
				this.vars.paint = false;
			});

		$("#clearSignature")
			.off("mousedown")
			.on("mousedown", () => {
				this.clearCanvas();
			});

		this.elements.canvas.addEventListener("touchstart", (e) => {
			// Mouse down location
			const rect = this.elements.canvas.getBoundingClientRect();
			const x = e.touches[0].clientX - rect.left;
			const y = e.touches[0].clientY - rect.top;

			this.vars.paint = true;
			this.addClick(x, y, false);
			this.redrawCanvas();
		});
		this.elements.canvas.addEventListener("touchmove", (e) => {
			if (this.vars.paint) {
				const rect = this.elements.canvas.getBoundingClientRect();
				this.addClick(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top, true);
				this.redrawCanvas();

				const btn = document.querySelector("#HasSignature");
				(btn as HTMLButtonElement).value = "True";
			}
		});
	}
}
