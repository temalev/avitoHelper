import { createApp, h } from 'vue';
import Loading from './Loading.vue';

const appendEl = (el) => {
  const append = () => {
    if (!el.contains(el.instance.$el)) {
      el.style.position = 'relative';
      el.appendChild(el.instance.$el);
    }
  };

  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    append();
  } else {
    document.addEventListener('DOMContentLoaded', () => {
      append();
    });
  }
};

const removeEl = (el) => {
  if (el && el.instance && el.instance.$el && el.contains(el.instance.$el)) {
    el.removeChild(el.instance.$el);
  }
};

export const vLoading = {
  mounted(el, binding) {
    const app = createApp({
      data() {
        return {
          visible: binding.value
        };
      },
      render() {
        return h(Loading, { visible: this.visible });
      }
    });
    const instance = app.mount(document.createElement('div'));
    el.instance = instance;

    if (binding.value) {
      appendEl(el);
    }
  },
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.instance.visible = binding.value;
      if (binding.value) {
        appendEl(el);
      } else {
        removeEl(el);
      }
    }
  },
  unmounted(el) {
    if (el.instance) {
      removeEl(el);
      el.instance.$el.remove();
      el.instance = null;
    }
  }
};
