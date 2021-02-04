import { defineComponent, h, onMounted } from "vue";

export default defineComponent({
  name: "AddThis",

  setup() {
    onMounted(() => {
      if (PUB_ID) {
        const link = `//s7.addthis.com/js/300/addthis_widget.js#pubid=${PUB_ID}`;
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
