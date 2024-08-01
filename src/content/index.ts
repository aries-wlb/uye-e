import { Modal } from "./Modal";

const modal = new Modal()

const stopPropagationHostList = ['log.shopee.io']

document.addEventListener('DOMContentLoaded', function() {
  if(stopPropagationHostList.includes(location.host)){
    document.body.addEventListener('contextmenu', (e) => {
      e.stopPropagation();
    }, true)
  }
});

chrome.runtime.onMessage.addListener((request) => {
  if (request.action === "transformJSON") {
    const info = request.text.split('|')[4]
    let data: Record<string, unknown> = {}
    try {
      data = JSON.parse(info);
      data.resp = JSON.parse(data.resp as string)
    } catch (error: unknown) {
      data = {
        error: (error as Error).message
      }
    }
    modal.show("Transformed JSON", JSON.stringify(data, null, 2))
    return true
  }
});