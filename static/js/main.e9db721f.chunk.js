(this["webpackJsonpreact-checkers"]=this["webpackJsonpreact-checkers"]||[]).push([[0],{14:function(e,n,t){},15:function(e,n,t){},16:function(e,n,t){"use strict";t.r(n);var r=t(0),o=t.n(r),a=t(8),c=t.n(a),i=(t(14),t(1)),l=t(2),s=t(4),u=t(3),p=t(5),h=(t(15),t(6)),y=function(e){function n(){return Object(i.a)(this,n),Object(s.a)(this,Object(u.a)(n).apply(this,arguments))}return Object(p.a)(n,e),Object(l.a)(n,[{key:"componentDidUpdate",value:function(e){this.props.owner!==e.owner&&this.props.checkForMoves()}},{key:"render",value:function(){var e=this.props,n=e.spaceColor,t=e.player1Color,r=e.player2Color,a=e.activeIndex,c=e.selectPiece,i=e.isKing,l=e.playerTurn,s=e.unselectPiece,u=e.movePiece,p=e.owner,h=e.row,y=e.col,f="player1"===p?t:r,v=a[0]===h&&a[1]===y,d=p===l;return o.a.createElement("div",{style:{backgroundColor:n},onClick:function(){return function(){if(v)return s();if(d)c();else{if(a.length>1)return u();if(!v)return c()}}()}},this.props.owner&&o.a.createElement("div",{style:{width:"100%",height:"100%",fontSize:"40px",display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"50%",backgroundColor:f,opacity:v?.3:1}},i&&"\ud83d\udc51"))}}]),n}(r.Component),f=function(e){function n(){var e,t;Object(i.a)(this,n);for(var r=arguments.length,o=new Array(r),a=0;a<r;a++)o[a]=arguments[a];return(t=Object(s.a)(this,(e=Object(u.a)(n)).call.apply(e,[this].concat(o)))).state={spaces:[[],[],[],[],[],[],[],[]],pieceSize:100,activeIndex:[],lastRow:null,lastCol:null,turnMoves:[],player1Color:"green",player2Color:"purple",square1Color:"black",square2Color:"white",playerTurn:"player1",skipOptions:0,gameWinner:null},t.initializeBoard=function(){t.setState((function(e){var n=Object(h.a)(e.spaces),t=e.square1Color,r=e.square2Color;return n.forEach((function(e,n){for(var o=0;o<8;){var a=void 0,c=o%2===0,i=n%2===0,l=c&&i||!c&&!i?t:r;a=c&&i?null:c||i?n<2?"player1":n>=6?"player2":null:null,e.push({owner:a,spaceColor:l,isKing:!1,selected:!1}),o++}})),n}))},t.selectPiece=function(e,n,r){t.state.playerTurn===r&&t.setState({activeIndex:[e,n]})},t.unselectPiece=function(){t.setState({activeIndex:[]})},t.movePiece=function(e,n){t.setState((function(r){var o=Object(h.a)(r.spaces),a=Object(h.a)(r.activeIndex),c=r.skipOptions,i=r.turnMoves,l=r.playerTurn,s=r.activeIndex[0],u=r.activeIndex[1],p=o[s][u].owner,y=o[s][u],f=null===o[e][n].owner,v=function(r){var h="player1"===p?o.length-1:0,y="player1"===l?"player2":"player1";if(o[e][n].owner=p,o[e][n].isKing=o[s][u].isKing,o[s][u].owner=null,o[s][u].isKing=!1,e===h&&(o[e][n].isKing=!0),i.push([e,n]),a=[],console.log(t.validateSkips(o,e,n)),c)if(r&&!t.validateSkips(o,e,n))console.log("keep going"),l=y;else{if(r)return;l=y}else l=y},d=function(e,n){o[e][n].owner=null},g="player1"===r.playerTurn?1:-1,m="player1"===r.playerTurn?2:-2,w=null,b=(e+s)/2,k=(n+u)/2,C=e-s,O=n-u;2!==C&&-2!==C||2!==O&&-2!==O||(w=o[b][k].owner);var x=null!==w&&w!==p;return C===g&&1===Math.abs(O)&&f&&!c?(console.log(a,i),v()):y.isKing&&1===Math.abs(C)&&Math.abs(O)&&f&&!c?v():(C===m&&2===Math.abs(O)&&f&&x||y.isKing&&2===Math.abs(C)&&2===Math.abs(O)&&f&&x)&&(d(b,k),v(!0)),{spaces:o,activeIndex:a,turnMoves:i,playerTurn:l}}))},t.validateSkips=function(e,n,r){for(var o=t.state.spaces[n][r],a=!1,c="player1"===o.owner?[[1,1],[1,-1]]:[[-1,1],[-1,-1]],i="player1"===o.owner?[[2,2],[2,-2]]:[[-2,2],[-2,-2]],l=o.isKing?[[2,2],[2,-2],[-2,-2],[-2,2]]:i,s=o.isKing?[[1,1],[1,-1],[-1,-1],[-1,1]]:c,u=0;u<l.length;u++)try{var p=e[n+l[u][0]][r+l[u][1]].owner,h=e[n+s[u][0]][r+s[u][1]].owner;null===p&&h!==o.owner&&null!==h&&(a=!0)}catch(y){}return a},t.checkForMoves=function(){var e=t.state.spaces,n=0;e.forEach((function(r,o){r.forEach((function(r,a){if(r.owner===t.state.playerTurn)for(var c="player1"===r.owner?[[1,1],[1,-1]]:[[-1,1],[-1,-1]],i="player1"===r.owner?[[2,2],[2,-2]]:[[-2,2],[-2,-2]],l=r.isKing?[[2,2],[2,-2],[-2,-2],[-2,2]]:i,s=r.isKing?[[1,1],[1,-1],[-1,-1],[-1,1]]:c,u=0;u<l.length;u++)try{var p=e[o+l[u][0]][a+l[u][1]].owner,h=e[o+s[u][0]][a+s[u][1]].owner;null===p&&h!==r.owner&&null!==h&&n++}catch(y){}}))})),t.setState({skipOptions:n})},t.checkForWin=function(){var e=t.state.spaces,n=null;e.forEach((function(e){n=e.some((function(e){return"player1"!==e.owner}))?"player1 lost":e.some((function(e){return"player2"!==e.owner}))?"player2 lost":null})),t.setState({gameWinner:n})},t.changeSides=function(){t.setState((function(e){return{playerTurn:"player1"===e.playerTurn?"player2":"player1"}}))},t.triggerHover=function(e){t.setState({mouseX:e.pageX,mouseY:e.pageY})},t}return Object(p.a)(n,e),Object(l.a)(n,[{key:"componentDidUpdate",value:function(e,n){this.state.playerTurn!==n.playerTurn&&(this.checkForMoves(),this.checkForWin())}},{key:"componentDidMount",value:function(){this.initializeBoard()}},{key:"render",value:function(){var e=this,n=this.state,t=n.spaces,r=n.activeIndex,a=n.playerTurn,c=n.pieceSize,i=n.mouseX,l=n.mouseY,s=n.player1Color,u=n.player2Color,p=t.map((function(n,t){return n.map((function(n,c){return o.a.createElement(y,Object.assign({key:"".concat(t," ").concat(c)},n,{playerTurn:a,selectPiece:function(){return e.selectPiece(t,c,n.owner)},unselectPiece:function(){return e.unselectPiece()},movePiece:function(){return e.movePiece(t,c)},checkForMoves:e.checkForMoves,player1Color:s,player2Color:u,row:t,col:c,activeIndex:r}))}))}));return o.a.createElement(o.a.Fragment,null,0!==r.length&&o.a.createElement("div",{style:{width:"".concat(c,"px"),height:"".concat(c,"px"),borderRadius:"50%",backgroundColor:"player1"===a?s:u,position:"absolute",pointerEvents:"none",left:"calc(".concat(i,"px - (").concat(c,"px / 2)"),top:"calc(".concat(l,"px - (").concat(c,"px / 2)")}}),o.a.createElement("div",{onMouseMove:function(n){return e.triggerHover(n)},style:{display:"grid",gridTemplateRows:"repeat(8, 100px)",cursor:0!==r.length&&"grabbing",gridTemplateColumns:"repeat(8, 100px)"}},p))}}]),n}(r.Component),v=function(e){function n(){return Object(i.a)(this,n),Object(s.a)(this,Object(u.a)(n).apply(this,arguments))}return Object(p.a)(n,e),Object(l.a)(n,[{key:"render",value:function(){return o.a.createElement("div",null,o.a.createElement(f,null))}}]),n}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,n,t){e.exports=t(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.e9db721f.chunk.js.map