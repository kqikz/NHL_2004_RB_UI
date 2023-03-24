<style lang="scss">
@import './style/style.scss';
</style>
<template>
	<div id="app">
		<div class="top_ctr" style="height: 10vh">
			<div style="height:50%">&nbsp;</div>
			<div>
				<div class="dropdown" style="z-index:20">
					<button class="dropbtn">GAME MODE</button>
					<div class="dropdown-content">
						<router-link to="playnow">Play Now</router-link>
						<router-link to="shootout">Shootout</router-link>
					</div>
				</div>
				<div class="dropdown" style="z-index:20">
					<button class="dropbtn">SETTINGS</button>
					<div class="dropdown-content">
						<router-link to="controller_settings">Controller
						settings</router-link>
					</div>
				</div>
			</div>
			<button @click="
				quitGame" class="mainmenubutton"
				style="position: absolute; top: 0px; right: 0px;">Quit</button>
		</div>

		<router-view class="main_ctr" style="height:80vh" />
		<div class="bottom_ctr" style="height: 10vh">
			<textarea id="LogArea" rows=4 columns=100 style="width:100%">
				LOG COMES HERE
			</textarea>
		</div>

	</div>
</template>

<script>
import Global from './js/global.js' 
export default {
  methods:{
    quitGame : function(){
    	Global.gameInterface.Quit();
    }
  }
}
</script>