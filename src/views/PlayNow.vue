<template>
	<div>
		<div class="caption">PLAY NOW</div>
		<!-- HOME TEAM -->
		<div>
			<div style="width: 45%; float: left" class="team-background">
				<div class="team-caption">AWAY</div>
				<div class="team-card-away">
					<img id="awayTeamImg" style="width: 123px; height: 97px" /><br>
					<select class="team-select" v-model="awaySelectedLeague"
						@change="awayLeagueChanged($event)">
						<option v-for="(item,index) in leagues" :value="index" :key="item">{{item}}</option>
					</select><br> <select v-model="awaySelectedTeam" class="team-select"
						@change="awayTeamChanged($event)">
						<option v-for="item in awayTeams" :value="item.id" :key="item.id">{{item.name}}</option>
					</select>
					<div class="team-stats">
						Overall: {{ awayTeamInfo.Overall }}<br /> Scoring: {{
						awayTeamInfo.Scoring }}<br /> Defense: {{ awayTeamInfo.Defense }}<br />
						Checking: {{ awayTeamInfo.Checking }}<br /> Powerplay: {{
						awayTeamInfo.Powerplay }}<br /> Goaltending: {{
						awayTeamInfo.Goaltending }}<br />
					</div>
				</div>
			</div>
			<div style="width: 10%; float: left; height: 60vh"
				class="controller-select">&nbsp;</div>
			<div style="width: 45%; float: right" class="team-background">
				<div class="team-caption">HOME</div>
				<div class="team-card-home">
					<img id="homeTeamImg" style="width: 123px; height: 97px" /><br>
					<select class="team-select" v-model="homeSelectedLeague"
						@change="homeLeagueChanged($event)">
						<option v-for="(item,index) in leagues" :value="index" :key="item">{{item}}</option>
					</select><br> <select v-model="homeSelectedTeam" class="team-select"
						@change="homeTeamChanged($event)">
						<option v-for="item in homeTeams" :value="item.id" :key="item.id">{{item.name}}</option>
					</select>
					<div class="team-stats">
						Overall: {{ homeTeamInfo.Overall }}<br /> Scoring: {{
						homeTeamInfo.Scoring }}<br /> Defense: {{ homeTeamInfo.Defense }}<br />
						Checking: {{ homeTeamInfo.Checking }}<br /> Powerplay: {{
						homeTeamInfo.Powerplay }}<br /> Goaltending: {{
						homeTeamInfo.Goaltending }}<br />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import Global from '../js/global.js'
import TeamInfoObject from '../js/teamInfoObject.js'
export default {
  data(){
	  return {
		  homeSelectedLeague : "",
		  homeSelectedTeam : "",
		  awaySelectedLeague : "",
		  awaySelectedTeam : "",		  
	  	  teams : [
	  		  {"id":"0","name":"Anaheim"},
	  		  {"id":"1","name":"Deroit"}
	  	  ],
	  	  homeTeams:[],
	  	  awayTeams:[],
	  	  leagues: [],
	  	  logoImgPath: "../../NHL/images2/logos/",
	  	  homeTeamInfo: {},
	  	  awayTeamInfo: {}
	  }
  },	
  methods:{
	  homeLeagueChanged(event){
		  var selectedLeague = event.target.value;
		  var leagueTeams = Global.gameData.GetLeagueTeamList(selectedLeague).split(',')
		  //returned values are 0,Ahaheim,1,Buffalo etc..
		  var teams = [];
		  for (var i=0;i < leagueTeams.length; i = i + 2){
			  var team = {"id":leagueTeams[i],"name":leagueTeams[i+1]}
			  teams.push(team)
		  }
		  this.homeTeams = teams;	
		  Global.gameData.HomeLeague = selectedLeague;
	  },
	  awayLeagueChanged(event){
		  var selectedLeague = event.target.value;
		  var leagueTeams = Global.gameData.GetLeagueTeamList(selectedLeague).split(',')
		  //returned values are 0,Ahaheim,1,Buffalo etc..
		  var teams = [];
		  for (var i=0;i < leagueTeams.length; i = i + 2){
			  var team = {"id":leagueTeams[i],"name":leagueTeams[i+1]}
			  teams.push(team)
		  }
		  this.awayTeams = teams;
		  Global.gameData.AwayLeague = selectedLeague;
	  },	  
	  homeTeamChanged(event){
		var teamId = event.target.value;  
		var tio = new TeamInfoObject()
		Global.managerFace.GetTeamInfo(teamId, tio);
		this.homeTeamInfo = tio
		window.$("#homeTeamImg").attr('src',this.logoImgPath+this.homeTeamInfo.sLogoFile)
		Global.gameData.HomeTeam = parseInt(teamId);
		Global.gameData.GetTeamInfo(0, tio);
		this.homeTeamInfo = tio;
		
	  },
	  awayTeamChanged(event){		  
			var teamId = event.target.value;  
			var tio = new TeamInfoObject()
			Global.managerFace.GetTeamInfo(teamId, tio);
			this.awayTeamInfo = tio
			window.$("#awayTeamImg").attr('src',this.logoImgPath+this.awayTeamInfo.sLogoFile)
			Global.gameData.AwayTeam = parseInt(teamId);			
			Global.gameData.GetTeamInfo(1, tio);
			this.awayTeamInfo = tio;
	  }
  },
  mounted: function(){
	Global.log('PLAYNOW MOUNTED')
    if (!Global.leagueFace.ProviderInterface.IsInSetup())
    {
    	Global.leagueFace.ProviderInterface.EnterSetup();
	}	
	var leagueArray = Global.gameData.GetLeagueList().split(',');	
    for (var i=0; i<leagueArray.length; i++)
    {
    	Global.log('LOADED LEAGUE ' + leagueArray[i]) 
    	this.leagues.push(leagueArray[i])
    	//drpAwayLeagues.AddString(leagueArray[i]);
    }
    //oGameData.GetLeagueTeamList( drpLeague.Selected ).split(',');
  }
}
</script>