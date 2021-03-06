var e = require("modeConsts.js"), t = module.exports;

t.fight = {
    roundMax: 5,
    countDown: 10
}, t.publicKey = "-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDRdooqeewteL6k+oOZSBgiy6Ce\nKmslXQrgHd67QriX6MQoIWLOv62IpkijGwTml6/1QxVFMpt14a06L0XRJ4qSJBcd\nR2xFCqGGrprD6tsjIV+hK4/e3fmUx/QsRoXMsXlXt0UDH5/Z0h9m4lVOdeMcJsTK\nVYqdx6ctoP48rlS9YQIDAQAB\n-----END PUBLIC KEY-----", 
t.MaxFormId = 7, t.BaseStorageKey = {
    BaseRole: "BaseRole",
    ServerVer: "ServerVer"
}, t.StorageKey = {
    BaseRole: t.BaseStorageKey.BaseRole,
    ServerVer: t.BaseStorageKey.ServerVer,
    QRCodeFile: "QRCodeFile",
    AvatarFile: "AvatarFile",
    AvatarUrl: "AvatarUrl",
    BaseQRCodeFile: "BaseQRCodeFile",
    FileSystemInitEnd: "FileSystemInitEnd2",
    FormTimes: "FormTimes",
    ClientVer: "ClientVer",
    ResVer: "ResVer",
    RunMode: "RunMode"
}, t.MessageHead = {
    Query: "/question/entry/query",
    Entry: "/question/entry/hortor",
    Login: "/question/player/login",
    FriendList: "/question/friend/list",
    FriendDel: "/question/friend/delFriend",
    findFriend: "/question/friend/findFriend",
    friendDetail: "/question/friend/friendDetail",
    FindRoomID: "/question/friend/findRoomID",
    GroupInvite: "/question/group/groupInvite",
    JoinGroup: "/question/group/joinGroup",
    GroupRank: "/question/group/groupRank",
    MemberRank: "/question/group/memberRank",
    SelfGroupRank: "/question/group/selfGroupRank",
    ModifyName: "/question/group/modifyName",
    QuitGroup: "/question/group/quitGroup",
    MatchInfo: "/question/group/matchInfo",
    FightMatch: "/question/bat/fightMatch",
    MatchConfirm: "/question/bat/matchConfirm",
    CancelMatch: "/question/bat/cancelMatch",
    FightFindQuiz: "/question/bat/findQuiz",
    FightChoose: "/question/bat/choose",
    FightResult: "/question/bat/fightResult",
    SendEmot: "/question/bat/sendEmot",
    OutFight: "/question/bat/outFight",
    GetAnswer: "/question/bat/getAnswer",
    ShareResult: "/question/bat/shareResult",
    MatchShare: "/question/bat/matchShare",
    GetSharedRoom: "/question/bat/getSharedRoom",
    ShareRoomInfo: "/question/bat/shareRoomInfo",
    RoomSetting: "/question/bat/roomSetting",
    IntoRoom: "/question/bat/intoRoom",
    LeaveRoom: "/question/bat/leaveRoom",
    BeginFight: "/question/bat/beginFight",
    ChangeRole: "/question/bat/changeRole",
    AgainFight: "/question/bat/againFight",
    IsExpiredRoom: "/question/bat/isExpiredRoom",
    MatchTest: "/question/bat/matchTest",
    PlayerReport: "/question/bat/playerReport",
    Review: "/question/bat/review",
    SubjectMatch: "/question/bat/subjectMatch",
    ShopList: "/question/shop/items",
    CreateOrder: "/question/shop/createOrder",
    PlatformOrder: "/question/shop/platform-order",
    GainOrder: "/question/shop/gain-order",
    ExList: "/question/shop/exList",
    Exchange: "/question/shop/exchange",
    GainBank: "/question/reward/gainBank",
    GainShare: "/question/reward/gainShare",
    GainSignIn: "/question/reward/gainSignIn",
    GainBc: "/question/reward/gainBc",
    GainSubscribed: "/question/reward/gainSubscribed",
    GainXcxReward: "/question/reward/gainXcxReward",
    GetSubscribed: "/question/role/getSubscribed",
    SetUserInfo: "/question/role/setUserInfo",
    ShowLogin: "/question/role/showLogin",
    ListSeasonReward: "/question/role/listSeasonReward",
    GetSeasonReward: "/question/role/getSeasonReward",
    LoginPivilege: "/question/role/loginPivilege",
    ShareStats: "/question/role/shareStats",
    GetQRPath: "/question/role/getQRPath",
    UpdateMocha: "/question/role/updateMocha",
    GetSeasonMoney: "/question/role/getSeasonMoney",
    HeadList: "/question/role/headList",
    UseHead: "/question/role/useHead",
    GetWallInfo: "/question/role/getWallInfo",
    GainWallAward: "/question/role/gainWallAward",
    WorldMatch: "/question/rank/worldMatch",
    LastWorldMatch: "/question/rank/lastWorldMatch",
    SeasonWorldMatch: "/question/rank/seasonWorldMatch",
    ChallengeRank: "/question/rank/challengeRank",
    HistroyRank: "/question/challenge/challengeHistory",
    Use: "/question/item/use",
    UpgradeKnow: "/question/item/upgradeKnow",
    Exec: "/question/gm/exec",
    RecordForm: "/question/message/recordForm",
    MarkStats: "/question/message/markStats",
    MatchStats: "/question/message/matchStats",
    MatchKings: "/question/message/matchKings",
    CheckWord: "/question/message/checkWord",
    ListQuiz: "/question/quiz/listQuiz",
    MakeQuiz: "/question/quiz/makeQuiz",
    GetCheckQuiz: "/question/quiz/getCheckQuiz",
    CheckOneQuiz: "/question/quiz/checkOneQuiz",
    QuizStats: "/question/quiz/quizStats",
    Setting: "/question/setting/setting",
    GetAppInfo: "/question/cash/getAppInfo",
    ChallengeList: "/question/challenge/challengeList",
    ChallengeLeave: "/question/challenge/challengeLeave",
    ChallengeJoin: "/question/challenge/challengeJoin",
    ChallengeCreate: "/question/challenge/challengeCreate",
    Challenge: "/question/challenge/challenge",
    FlushChallenge: "/question/challenge/flushChallenge",
    RollerList: "/question/roller/list",
    RollerRoll: "/question/roller/roll",
    getContestStatus: "/currentStatus",
    dailyChallengeList: "/question/dailyChallenge/list",
    dailyChallengeBeginFight: "/question/dailyChallenge/beginFight",
    dailyChallengeFindQuiz: "/question/dailyChallenge/findQuiz",
    dailyChallengeChoose: "/question/dailyChallenge/choose",
    dailyChallengeFindResult: "/question/dailyChallenge/findResult",
    dailyChallengeRevival: "/question/dailyChallenge/revival",
    CashRecordForm: "/question/cash/recordForm",
    CommentListBase: "/question/comment/listBase",
    CommentComment: "/question/comment/comment",
    CommentPrais: "/question/comment/praise",
    CommentListMore: "/question/comment/listMore",
    CommentBlack: "/question/comment/black",
    ActivityInfo: "/question/activity/info",
    EnterActivity: "/question/activity/enter",
    ActivityRankList: "/question/activity/ranklist",
    TakeActivityReward: "/question/activity/takeaward",
    GiveTicket: "/question/activity/giveTicket",
    TicketFriends: "/question/activity/ticketFriends",
    SpecialMatch: "/question/activity/specialMatch",
    DailyTaskList: "/question/dailyTask/list",
    DailyTaskReward: "/question/dailyTask/reward",
    shareTest: "/question/shareTest/test"
}, t.UserNameWidth = 6, t.StemMinWidth = 1, t.StemMaxWidth = 36, t.AnswerMaxWidth = 8, 
t.MaxKnowLevel_test = 2, t.MaxKnowLevel = e.RunMode == e.RunModeType.Prod ? 10 : t.MaxKnowLevel_test, 
t.AskPepoleSpacing = 3e4, t.ExitCode = {
    EdgeOut: 2001,
    Maintaining: 10001,
    NewVersion: 20001,
    SessionExpire: 20015,
    AppHide: 101,
    TimeOut: 102,
    CmdErr: 103,
    CodeErr: 104,
    UserErr: 105,
    SocketClose: 106,
    RequestErr: 107,
    UidErr: 108,
    LoginErr1: 201,
    LoginErr2: 202,
    LoginErr3: 203,
    LoginErr4: 204,
    LoginErr5: 205,
    LoginErr6: 206,
    Unauthorized: 401,
    findQuizErr: 501
}, t.ItemType = {
    gold: 0,
    luckyBag: 1,
    exchange: 2,
    buff: 3,
    book: 4,
    headframe: 5,
    cup: 6
}, t.Grid9_O = {
    src: "http://question-resource-zh.hortor.net/image/ugc/grid9_O",
    imgWidth: 22,
    imgHeight: 22,
    cutting_x: 10,
    cutting_y: 10,
    cutting_width: 2,
    cutting_height: 2
}, t.Grid9_X = {
    src: "http://question-resource-zh.hortor.net/image/ugc/grid9_X",
    imgWidth: 22,
    imgHeight: 22,
    cutting_x: 10,
    cutting_y: 10,
    cutting_width: 2,
    cutting_height: 2
}, t.Grid9_panel = {
    src: "http://question-resource-zh.hortor.net/image/ui/grid9_panel",
    imgWidth: 556,
    imgHeight: 112,
    cutting_x: 274,
    cutting_y: 98,
    cutting_width: 4,
    cutting_height: 4
}, t.event_point = {
    click_new_guide: "click_new_guide",
    click_test: "click_test",
    click_to_cover: "click_to_cover",
    uplevel1: "uplevel1",
    show_test_result: "show_test_result",
    click_new_to_pve: "click_new_to_pve",
    click_pvr: "click_pvr",
    click_dailyReward: "click_dailyReward",
    click_Subscribe: "click_Subscribe",
    enter_Share: "enter_Share",
    enter_Channel: "enter_Channel",
    click_link: "click_link",
    show_link: "show_link"
}, t.book_color = [ "#53B5F7", "#4990E3", "#7ACF2D", "#F3B33C", "#FE7263", "#8080C7" ], 
t.SuperMode = e.RunMode != e.RunModeType.Prod, t.Route = {
    login: "auth.login",
    joinChatRoom: "player.joinChatRoom",
    join: "player.join",
    chatSend: "chat.send",
    chat: "chat.chat",
    otherJoinChat: "chat.playerJoin",
    otherExitChat: "chat.playerExit",
    updatePlayerCount: "contest.updatePlayerCount",
    nextQuestion: "contest.nextQuestion",
    submitAnswer: "contest.submitAnswer",
    questionResult: "contest.questionResult",
    finalResult: "contest.finalResult",
    quit: "contest.quit",
    commentFriend: "contest.commentFriend",
    commentedByFriend: "contest.commentedByFriend",
    getReady: "contest.getReady",
    reLoad: "contest.reload",
    friendContest: "contest.friendContest",
    getRank: "rank.getRank",
    getListWithdrawOrders: "player.listWithdrawOrders",
    doWithdraw: "player.doWithdraw",
    getRevive: "player.getRevive",
    enterInvitationCode: "player.enterInvitationCode",
    subscribe: "contest.subscribe",
    friendAnswer: "contest.friendAnswer",
    sendComment: "contest.sendComment",
    comment: "contest.comment",
    friendJoin: "contest.friendJoin",
    friendResult: "contest.friendResult"
}, t.cashTimeFrame = {
    countDown: 33,
    readyNomal: 5,
    ready12: 11,
    fighting: 12,
    calculate: 5,
    publish: 12,
    preReward: 9,
    winnerList: 20,
    history: 20
}, t.contestStatus = {
    ContestStatusWaiting: 0,
    ContestStatusReady: 1,
    ContestStatusQuestion: 2,
    ContestStatusAnswer: 3
}, t.withdrawOrderStatus = {
    WithdrawOrderStatusInit: 0,
    WithdrawOrderStatusPending: 1,
    WithdrawOrderStatusFinish: 2,
    WithdrawOrderStatusFailed: 3
}, t.PlayerStatus = {
    PlayerStatusAlive: 1,
    PlayerStatusDead: 2,
    PlayerStatusLate: 3
}, t.QuestionResult = {
    QuestionResultCorrect: 0,
    QuestionResultWrong: 1,
    QuestionResultTimeout: 2,
    QuestionResultAlreadyDead: 3
}, t.ReviveResult = {
    ReviveResultNoNeedToRevive: 0,
    ReviveResultNoHeart: 1,
    ReviveResultHeartAlreadyUsed: 2,
    ReviveResultHeartNotAllowed: 3,
    ReviveResultHeartAutoUsed: 4
}, t.gameConf = {
    encryptedQuiz: "encryptedQuiz",
    knowMaxLevel: "knowMaxLevel",
    pay: "pay",
    iosPay: "iosPay",
    cash: "cash",
    groupChallenge: "groupChallenge",
    ugc: "ugc",
    subscribed: "subscribed",
    linkConf: "linkConf",
    linkConfs: "linkConfs",
    comment: "comment",
    iosQz: "iosQz"
}, t.funcType = {
    goods: "goods",
    bank: "bank",
    live: "live",
    shop: "shop",
    friends_ranking: "friends_ranking",
    knowledge: "knowledge",
    groupChallenge: "groupChallenge",
    daliyChallenge: "daliyChallenge",
    challenge: "challenge",
    cash: "cash",
    iosQz: "iosQz"
}, t.unlockLevel = {
    bank: 2,
    goods: 2,
    shop: 3,
    knowledge: 3,
    daliyChallenge: 4,
    friends_ranking: 5,
    live: 6,
    groupChallenge: 7,
    challenge: 0,
    cash: 0,
    iosQz: 0
}, t.coverBannerType = {
    million: "million",
    special: "specialMatch"
}, t.TemplatePages = {
    DailyTask: "dailyTask"
}, t.subTypeOfSpeical = {
    commission: "commission",
    xindongfang: "xindongfang"
};