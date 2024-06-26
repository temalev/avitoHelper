import { createApp, h } from 'vue';
import Loading from './Loading.vue';

const appendEl = (el) => {
  if (!el.instance || !el.instance.$el) {
    console.error('appendEl: el.instance or el.instance.$el is null');
    return;
  }

  if (!el.contains(el.instance.$el)) {
    el.style.position = 'relative';
    el.appendChild(el.instance.$el);
    console.log('appendEl: Element appended');
  }
};

// const removeEl = (el) => {
//   if (!el || !el.instance || !el.instance.$el) {
//     console.error('removeEl: el or el.instance or el.instance.$el is null');
//     return;
//   }

//   if (el.contains(el.instance.$el)) {
//     el.removeChild(el.instance.$el);
//   }
// };

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
    if (!instance.$el) {
      console.error('mounted: instance.$el is null');
    }

    el.instance = instance;

    if (binding.value) {
      appendEl(el);
    }

  },

  updated(el, binding) {
    if (!el.instance) {
      console.error('updated: el.instance is null');
      return;
    }

    if (binding.value !== binding.oldValue) {
      el.instance.visible = binding.value;
      if (binding.value) {
        appendEl(el);
      } else {
        // removeEl(el);
      }
    }

  },

  unmounted(el) {
    if (el.instance) {
      // removeEl(el);

      if (el.instance.$el) {
        el.instance.$el.remove();
      }

      el.instance = null;
    } else {
      console.error('unmounted: el.instance is null');
    }
  }
};
