class Global {
	constructor() {
		if (Global.instance) {
			return Global.instance;
		}
		Global.instance = this;
		//init either mocks or real thing if present
		if (window.external.GameInterface) {
			this.gameInterface = window.external.GameInterface;
			this.leagueServer = this.gameInterface.LeagueServerInterface
			this.leagueServer.LoadLeagueInternal(0, "")
			this.leagueFace = this.gameInterface.LeagueServerInterface.LeagueDispatch
			this.managerFace = this.leagueFace.ManagerInterface
			this.gameData = this.leagueFace.ProviderInterface.GameDataInterface
			//var oGameFace = window.external.GameInterface;
			//var oLeagueServer = oGameFace.LeagueServerInterface;
			//var oExecutorServer = oGameFace.ExecutorServerInterface;

			//oLeagueServer.LoadLeagueInternal(0,"")
		} else {
			this.gameInterface = {
				MainLoaded: function() { },
				TitleComplete: function() { },
				Quit: function() { }
			}
			this.leagueFace = {

			}
			this.leagueServer = {

			}
			this.managerFace = {
				GetTeamInfo: function() { }
			}
			this.gameData = {
				GetLeagueList: function() {
					return "M_League1,M_League2"
				},
				GetLeagueTeamList: function() {
					return "M_Team1,M_Team2"
				},
				GetTeamInfo: function(cb) {
					cb.OwnerID = 0;
					cb.Name = "Latvia";
					cb.FullName = "Latvia";
					cb.sLogoFile = "logo45.gif";
					cb.AbbrName = "LVA";
					cb.Overall = 50;
					cb.Scoring = 50;
					cb.Defense = 50;
					cb.Checking = 50;
					cb.Powerplay = 0;
					cb.Goaltending = 0;
					cb.ArtID = -1;
					return cb;
				}
			}
		}
	}
	static getInstance() {
		return Global.instance;
	}
	log(n) {
		document.getElementById("LogArea").value += n;
	}
}

export default new Global();