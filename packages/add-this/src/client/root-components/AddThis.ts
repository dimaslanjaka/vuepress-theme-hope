import { defineComponent, h, onMounted } from "vue";
import { pubID } from "../define";

export default defineComponent({
  name: "AddThis",

  setup() {
    onMounted(() => {
      if (pubID) {
        const link = `//s7.addthis.com/js/300/addthis_widget.js#pubid=${pubID}`;
        const script = document.createElement("script");

        script.src = link;
        document.getElementsByTagName("body")[0].appendChild(script);
      } else
        console.error("[AddThis]: Please provide a pubid to let plugin work");
    });
  },

  render() {
    return h("div", { class: "add-this" });
  },
});
