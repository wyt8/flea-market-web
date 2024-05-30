<script setup>

</script>

<template>
    <div class="wrapper">
        <input type="checkbox" id="toogle" class="hidden-trigger">
        <label for="toogle" class="circle">
            <svg class="svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="48"
                height="48" xml:space="preserve" version="1.1" viewBox="0 0 48 48">
                <image width="48" height="48"
                    xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAbElEQVR4Ae3XwQnFQAiE4eVVsGAP1mkPFjwvQvYSWCQYCYGZv4Dv5MGB5ghcIiDQI+kCftCzNsAR8y5gYu2rwCBAgMBTgEC3rek2yQEtAZoDjso8AyaKexmIDJUZD40AAQIE0gwx449GgMC9/t0b7GTsa7J+AAAAAElFTkSuQmCC">
                </image>
            </svg>
        </label>

        <div class="subs">
            <button class="sub-circle">
                <input value="1" name="sub-circle" type="radio" id="sub1" class="hidden-sub-trigger">
                <label for="sub1"></label>
            </button>
            <button class="sub-circle">
                <input value="1" name="sub-circle" type="radio" id="sub2" class="hidden-sub-trigger">
                <label for="sub2"></label>
            </button>
            <button class="sub-circle">
                <input value="1" name="sub-circle" type="radio" id="sub3" class="hidden-sub-trigger">
                <label for="sub3"></label>
            </button>
            <button class="sub-circle">
                <input value="1" name="sub-circle" type="radio" id="sub4" class="hidden-sub-trigger">
                <label for="sub4"></label>
            </button>
            <button class="sub-circle">
                <input value="1" name="sub-circle" type="radio" id="sub5" class="hidden-sub-trigger">
                <label for="sub5"></label>
            </button>
            <button class="sub-circle">
                <input value="1" name="sub-circle" type="radio" id="sub6" class="hidden-sub-trigger">
                <label for="sub6"></label>
            </button>
            <button class="sub-circle">
                <input value="1" name="sub-circle" type="radio" id="sub7" class="hidden-sub-trigger">
                <label for="sub7"></label>
            </button>
            <button class="sub-circle">
                <input value="1" name="sub-circle" type="radio" id="sub8" class="hidden-sub-trigger">
                <label for="sub8"></label>
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
.wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    --black: #000000;
    --ch-black: #141414;
    --eer-black: #1b1b1b;
    --night-rider: #2e2e2e;
    --white: #ffffff;
    --af-white: #f3f3f3;
    --ch-white: #e1e1e1;
}

footer .demo {
    position: absolute;
    bottom: 10px;
    width: 500px;
    margin: 0 auto;
}

footer .demo a {
    text-align: center;
    color: #000;
    text-decoration: none;
    font-weight: 100;
    border-bottom: 1px solid #000;
}

.circle {
    display: block;
    position: relative;
    padding: 0;
    z-index: 98;
    margin: 0 auto;
    -webkit-box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.3);
    border-radius: 50%;
    height: 60px;
    width: 60px;
    background-color: var(--white);
    transition: 0.2s;
    text-align: center;
}

.circle:active {
    transform: scale(0.9);
    box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.3);
}

.circle:hover {
    cursor: pointer;
    background-color: var(--af-white);
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.3);
}

.circle .svg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -15px;
    margin-top: -15px;
    width: 30px;
    height: 30px;
    transition: 0.5s;
    transform: rotate(180deg);
}

.circle svg image {
    filter: brightness(50%);
}

.sub-circle {
    z-index: 0;
    position: absolute;
    height: 40px;
    width: 40px;
    overflow: hidden;
    border-radius: 50%;
    transition: 0.3s;
    transform: scale(0.5);
    opacity: 0;
    padding: 0;
    margin: 0;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    border: none;
}

.sub-circle label {
    background-color: var(--af-white);
    display: block;
    color: white;
    width: 100%;
    height: 100%;
    line-height: 40px;
    transition: .5s;
}

.sub-circle label:hover {
    cursor: pointer;
    background-color: var(--ch-white);
}

.subs {
    left: -20px;
    top: -50px;
    width: 40px;
    height: 40px;
    text-align: center;
    z-index: 0;
    margin: 0 auto;
    position: relative;
}

.hidden-sub-trigger {
    display: none;
}

.hidden-sub-trigger:checked~label {
    background-color: var(--white);
}

.hidden-trigger {
    display: none;
}

.hidden-trigger:checked~.circle {
    transform: scale(0.9);
    cursor: pointer;
    background-color: var(--white);
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.1);
}

.hidden-trigger:checked~.circle .svg {
    transform: rotate(45deg);
}

.hidden-trigger:checked~.subs button:nth-of-type(1) {
    transform: translate(0px, -100px) scale(1);
    opacity: 1;
    transition: 0.1s;
}

.hidden-trigger:checked~.subs button:nth-of-type(2) {
    transform: translate(75px, -75px) scale(1);
    opacity: 1;
    transition: 0.2s;
}

.hidden-trigger:checked~.subs button:nth-of-type(3) {
    transform: translate(100px, 0px) scale(1);
    opacity: 1;
    transition: 0.3s;
}

.hidden-trigger:checked~.subs button:nth-of-type(4) {
    transform: translate(75px, 75px) scale(1);
    opacity: 1;
    transition: 0.4s;
}

.hidden-trigger:checked~.subs button:nth-of-type(5) {
    transform: translate(0px, 100px) scale(1);
    opacity: 1;
    transition: 0.5s;
}

.hidden-trigger:checked~.subs button:nth-of-type(6) {
    transform: translate(-75px, 75px) scale(1);
    opacity: 1;
    transition: 0.6s;
}

.hidden-trigger:checked~.subs button:nth-of-type(7) {
    transform: translate(-100px, 0px) scale(1);
    opacity: 1;
    transition: 0.7s;
}

.hidden-trigger:checked~.subs button:nth-of-type(8) {
    transform: translate(-75px, -75px) scale(1);
    opacity: 1;
    transition: 0.8s;
}
</style>