export class Modal {
  el: HTMLDivElement;
  static instance: Modal;
  isShow: boolean = false;

  constructor() {
    if (Modal.instance) {
      this.el = Modal.instance.el
      return Modal.instance;
    }
    this.el = document.createElement('div');
    Modal.instance = this;
  }

  setEl(title: string, content: string) {
    this.el.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      width: 300px;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 10px;
      z-index: 9999;
      font-family: Arial, sans-serif;
      max-height: 400px;
      overflow-y: auto;
    `;

    this.el.innerHTML = `
      <h2 style="margin-top: 0;">${title}</h2>
      <pre>${content}</pre>
      <div style="display: flex; justify-content: space-between; margin-top: 15px;">
        <button id="copyBtn">复制</button>
        <button id="closeBtn">关闭</button>
      </div>
    `;
    this.bind('click', '#closeBtn', () => {this.close()})
    this.bind('click', '#copyBtn', () => {this.copy(content)})
  }

  show(title: string, content: string) {
    this.setEl(title, content);
    if (!this.isShow) {
      this.isShow = true;
      document.body.appendChild(this.el);
    }
  }

  close() {
    this.isShow = false;
    document.body.removeChild(this.el)
  }
  async copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  bind(eventType: string, selector: string, callback: CallableFunction) {
    if (!this.el) return;

    const element = this.el.querySelector(selector);
    if (element) {
      element.addEventListener(eventType, callback as unknown as EventListener);
    }
  }

  static getInstance() {
    if (!Modal.instance) {
      Modal.instance = new Modal();
    }
    return Modal.instance;
  }
}