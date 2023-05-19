
<template>
  <div>
    <h3></h3>
    <div class="my-class">
      <a href="SupermarketView">
        <img :src="image1" class="logoup" alt="lll logo"/>
      </a>
      <a href="ClassroomView">
        <img :src="image2" class="logoup" alt="lll logo"/>
      </a>
    </div>
    <div>
      <p></p>
      <p></p>
      <a href="MRT" target="_blank">
        <img :src="image3" class="logo" alt="lll logo" />
      </a>
      <a href="RestaurantView" target="_blank">
        <img :src="image4" class="logo" alt="lll logo" />
      </a>
    </div>
   
    <h1>選擇想要練習的情境</h1>
  </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  components: {
    HelloWorld,
  },
  data() {
    return {
      isDrawing: false,
      canvas: null,
      ctx: null,
      image1: "src/assets/1682754889817.jpg",

      image2: "src/assets/1682754210712.jpg",
      image3: "src/assets/MRT.jpg",
      image4: "src/assets/REST.jpg",
      
    };
  },
  methods: {
    init() {
      this.canvas = document.createElement("canvas");
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
      this.canvas.style.position = "absolute";
      this.canvas.style.top = "0";
      this.canvas.style.left = "0";
      this.canvas.style.pointerEvents = "none";
      document.body.appendChild(this.canvas);

      this.ctx = this.canvas.getContext("2d");
      this.ctx.strokeStyle = "white";
      this.ctx.lineWidth = 2;
    },
    startDrawing(event) {
      this.isDrawing = true;
      this.ctx.beginPath();
      this.ctx.moveTo(event.clientX, event.clientY);
    },
    draw(event) {
      if (!this.isDrawing) return;
      this.ctx.lineTo(event.clientX, event.clientY);
      this.ctx.stroke();
    },
    endDrawing() {
      this.isDrawing = false;
    },
  },
  mounted() {
    this.init();
    window.addEventListener("mousedown", this.startDrawing);
    window.addEventListener("mousemove", this.draw);
    window.addEventListener("mouseup", this.endDrawing);
  },
};
</script>
<style scoped>
h1 {
    color: white;
  }
.logoup {
  height: 10em;
  padding: 3em;
  will-change: filter;
  transition: filter 300ms;
  transform: translateY(45px);
}
.logo {
  height: 10em;
  padding: 3em;
  will-change: filter;
  transition: filter 300ms;
  transform: translateY(40px);
}
.logo:hover {
  filter: drop-shadow(0 0 2em #BE9164);
}
.logoup:hover {
  filter: drop-shadow(0 0 2em #BE9164);
}
body {
  background-color: black;
}
</style>