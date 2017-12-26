<template>
  <div class="outer">
    <div class="group" ref="cube" @click="randomCube">
      <div class="page page1">
        <div class="first_face">
          <span class="pip"></span>
        </div>
      </div>
      <div class="page page2">
        <div class="second_face">
          <span class="pip flex_start"></span>
          <span class="pip flex_end"></span>
        </div>
      </div>
      <div class="page page3">
        <div class="third_face">
          <span class="pip flex_start"></span>
          <span class="pip"></span>
          <span class="pip flex_end"></span>
        </div>
      </div>
      <div class="page page4">
        <div class="forth_face">
          <div class="column">
            <span class="pip"></span>
            <span class="pip"></span>
          </div>
          <div class="column">
            <span class="pip"></span>
            <span class="pip"></span>
          </div>
        </div>
      </div>
      <div class="page page5">
        <div class="fifth_face">
          <div class="column">
            <span class="pip flex_end"></span>
            <span class="pip flex_end"></span>
          </div>
          <div class="column">
            <span class="pip center"></span>
          </div>
          <div class="column">
            <span class="pip flex_start"></span>
            <span class="pip flex_start"></span>
          </div>
        </div>
      </div>
      <div class="page page6">
        <div class="sixth_face">
          <div class="column">
            <span class="pip"></span>
            <span class="pip"></span>
            <span class="pip"></span>
          </div>
          <div class="column">
            <span class="pip"></span>
            <span class="pip"></span>
            <span class="pip"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'dice',
    data () {
      return {}
    },
    methods: {
      randomCube () {
        let cube = this.$refs.cube
        cube.style.transition = '2s all ease-in-out'
        cube.style.transform = 'rotatex(' + this.getRandom(7000, 14000) + 'deg) rotatey(' + this.getRandom(7000, 14000) +
          'deg) rotatez(' + this.getRandom(7000, 14000) + 'deg)scale3d(1,1,1)'
        setTimeout(() => {
          cube.style.transition = 'none'
        }, 2000)
      },
      getRandom (min, max) {
        let num = Math.floor(Math.random() * (max - min) + min)
        return num - num % 90 + 5
      }
    }
  }
</script>
<style>
  .outer {
    perspective: 1000px;
    perspective-origin: 50% 50%;
    overflow: visible;
  }

  .group {
    width: 100px;
    height: 100px;
    position: relative;
    transform-style: preserve-3d;
    transform-origin: 50px 50px 0;
    margin: 100px auto;
    animation: all 2s linear 0s infinite;
  }

  .page {
    width: 100px;
    height: 100px;
    position: absolute;
    text-align: center;
    font-weight: bold;
    opacity: 1;
    overflow: hidden;
    filter: alpha(opacity=50);
    font-size: 120px;
    word-break: break-all;
    word-wrap: break-word;
    margin-top: 0;
  }

  .page1 {
    line-height: 100px;
    transform: translateZ(50px);
  }

  .page2 {
    transform-origin: left;
    transform: rotateY(-90deg) translateX(-50px);
    line-height: 100px;
  }

  .page3 {
    transform-origin: right;
    transform: rotateY(90deg) translateX(50px);
    line-height: 100px;
  }

  .page4 {
    transform-origin: top;
    transform: rotateX(90deg) translateY(-50px);
    line-height: 50px;
  }

  .page5 {
    transform-origin: bottom;
    transform: rotateX(-90deg) translateY(50px);
    line-height: 33px;
  }

  .page6 {
    transform: translateZ(-50px);
    line-height: 50px;
  }

  [class$="face"] {
    box-sizing: content-box;
    width: 84px;
    height: 84px;
    background: #e7e7e7;
    border-radius: 10%;
    box-shadow: inset 0 5px #f2f2f2,
    inset 0 -5px #bbb,
    inset -5px 0 #d7d7d7,
    inset 5px 0 #d7d7d7;
    display: flex;
    padding: 8px;
  }
  .flex_start{
    align-self: flex-start;
  }
  .flex_end{
    align-self: flex-end;
  }
  .center{
    align-self: center;
  }
  .column{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-grow: 1;
    align-items: center;
  }
  .pip{
    display: box;
    width: 22px;
    height: 22px;
    background: #222;
    border-radius: 50%;
    box-shadow: inset 0 5px #000,inset 0 -5px #444;
  }
  .first_face{
    align-items: center;
    justify-content: center;
  }

  .second_face{
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
  }
  .third_face{
    align-items: center;
    justify-content: center;
  }
  .forth_face{
    flex-direction: row;
  }
</style>
