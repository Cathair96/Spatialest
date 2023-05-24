import "bootstrap";

declare global {
	interface Window {
		adobeFormSubmissionSucceeded: Function;
		triggerSpecificAdobeErrorMessagePresented: Function;
	}
}

if (document.querySelector(".js-input")) {
	import("./Components/Inputs/index").then((e) => e.Input.init(".js-input"));
}

if (document.querySelector(".js-radio")) {
	import("./Components/RadioButtons/index").then((e) => e.RadioButtons.init(".js-radio"));
}

if (document.querySelector(".js-signature")) {
	import("./Components/Signature/index").then((e) => e.SignatureCapture.init());
}
